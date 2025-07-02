
'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { z } from 'zod'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Chrome,
  Facebook
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/components/ui/use-toast'

// Schema de validação com Zod
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('Formato de e-mail inválido')
    .refine((email) => {
      // Validação adicional de domínio
      const validDomains = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'uol.com.br', 'globo.com', 'terra.com.br']
      const domain = email.split('@')[1]
      return validDomains.includes(domain) || domain?.includes('.com') || domain?.includes('.br')
    }, 'Domínio de e-mail não reconhecido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
  rememberMe: z.boolean().default(false)
})

type LoginFormData = z.infer<typeof loginSchema>

interface LoginFormProps {
  onSuccess?: () => void
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<'google' | 'facebook' | null>(null)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const [blockTimeLeft, setBlockTimeLeft] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, touchedFields },
    setError,
    clearErrors
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  })

  const watchedEmail = watch('email')
  const watchedPassword = watch('password')

  // Rate limiting - proteção contra brute force
  useEffect(() => {
    if (loginAttempts >= 5) {
      setIsBlocked(true)
      setBlockTimeLeft(300) // 5 minutos
      
      const timer = setInterval(() => {
        setBlockTimeLeft((prev) => {
          if (prev <= 1) {
            setIsBlocked(false)
            setLoginAttempts(0)
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [loginAttempts])

  // Validação em tempo real do e-mail
  useEffect(() => {
    if (watchedEmail && touchedFields.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(watchedEmail)) {
        setError('email', { message: 'Formato de e-mail inválido' })
      } else {
        clearErrors('email')
      }
    }
  }, [watchedEmail, touchedFields.email, setError, clearErrors])

  const onSubmit = async (data: LoginFormData) => {
    if (isBlocked) {
      toast({
        title: "Muitas tentativas",
        description: `Aguarde ${Math.floor(blockTimeLeft / 60)}:${(blockTimeLeft % 60).toString().padStart(2, '0')} para tentar novamente.`,
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Verificar tentativas recentes antes do login
      const attemptsResponse = await fetch(`/api/auth/login-attempts?email=${encodeURIComponent(data.email)}`)
      const attemptsData = await attemptsResponse.json()
      
      if (attemptsData.isBlocked) {
        setIsBlocked(true)
        setBlockTimeLeft(300) // 5 minutos
        toast({
          title: "Conta temporariamente bloqueada",
          description: "Muitas tentativas de login falharam. Tente novamente em 5 minutos.",
          variant: "destructive",
        })
        return
      }

      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      // Registrar tentativa de login
      await fetch('/api/auth/login-attempts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          success: !result?.error
        })
      })

      if (result?.error) {
        setLoginAttempts(prev => prev + 1)
        
        let errorMessage = "E-mail ou senha incorretos."
        if (result.error === 'CredentialsSignin') {
          errorMessage = "Credenciais inválidas. Verifique seu e-mail e senha."
        }

        toast({
          title: "Erro ao fazer login",
          description: errorMessage,
          variant: "destructive",
        })
      } else {
        // Reset tentativas em caso de sucesso
        setLoginAttempts(0)
        
        toast({
          title: "Login realizado com sucesso!",
          description: "Redirecionando para o dashboard...",
        })
        
        // Aguardar um pouco para mostrar o toast
        setTimeout(async () => {
          const session = await getSession()
          if (session) {
            onSuccess?.()
            router.push('/dashboard')
          }
        }, 1000)
      }
    } catch (error) {
      console.error('Login error:', error)
      toast({
        title: "Erro inesperado",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setSocialLoading(provider)
    try {
      await signIn(provider, { 
        callbackUrl: '/dashboard',
        redirect: true 
      })
    } catch (error) {
      console.error(`${provider} login error:`, error)
      toast({
        title: "Erro no login social",
        description: `Não foi possível fazer login com ${provider === 'google' ? 'Google' : 'Facebook'}.`,
        variant: "destructive",
      })
    } finally {
      setSocialLoading(null)
    }
  }

  const getFieldStatus = (fieldName: keyof LoginFormData) => {
    const hasError = !!errors[fieldName]
    const isTouched = !!touchedFields[fieldName]
    const hasValue = fieldName === 'email' ? !!watchedEmail : !!watchedPassword
    
    if (hasError) return 'error'
    if (isTouched && hasValue && !hasError) return 'success'
    return 'default'
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Campo E-mail */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            E-mail *
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className={`h-5 w-5 ${
                getFieldStatus('email') === 'error' ? 'text-red-400' :
                getFieldStatus('email') === 'success' ? 'text-green-400' :
                'text-gray-400'
              }`} />
            </div>
            <Input
              {...register('email')}
              id="email"
              type="email"
              placeholder="seu@email.com"
              className={`pl-10 pr-10 ${
                getFieldStatus('email') === 'error' ? 'border-red-300 focus:border-red-500 focus:ring-red-500' :
                getFieldStatus('email') === 'success' ? 'border-green-300 focus:border-green-500 focus:ring-green-500' :
                'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
              disabled={isLoading || isBlocked}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <AnimatePresence>
                {getFieldStatus('email') === 'success' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  </motion.div>
                )}
                {getFieldStatus('email') === 'error' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-red-600 flex items-center gap-1"
              >
                <AlertCircle className="h-4 w-4" />
                {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Campo Senha */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            Senha *
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className={`h-5 w-5 ${
                getFieldStatus('password') === 'error' ? 'text-red-400' :
                getFieldStatus('password') === 'success' ? 'text-green-400' :
                'text-gray-400'
              }`} />
            </div>
            <Input
              {...register('password')}
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Sua senha"
              className={`pl-10 pr-10 ${
                getFieldStatus('password') === 'error' ? 'border-red-300 focus:border-red-500 focus:ring-red-500' :
                getFieldStatus('password') === 'success' ? 'border-green-300 focus:border-green-500 focus:ring-green-500' :
                'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
              disabled={isLoading || isBlocked}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isLoading || isBlocked}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <AnimatePresence>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-red-600 flex items-center gap-1"
              >
                <AlertCircle className="h-4 w-4" />
                {errors.password.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Lembrar-me e Esqueceu a senha */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              {...register('rememberMe')}
              id="rememberMe"
              disabled={isLoading || isBlocked}
            />
            <Label 
              htmlFor="rememberMe" 
              className="text-sm text-gray-600 cursor-pointer"
            >
              Lembrar de mim
            </Label>
          </div>
          <Link 
            href="/auth/forgot-password" 
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            Esqueceu a senha?
          </Link>
        </div>

        {/* Aviso de bloqueio */}
        <AnimatePresence>
          {isBlocked && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4"
            >
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle className="h-5 w-5" />
                <div>
                  <p className="font-medium">Muitas tentativas de login</p>
                  <p className="text-sm">
                    Aguarde {formatTime(blockTimeLeft)} para tentar novamente.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botão Entrar */}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          disabled={isLoading || !isValid || isBlocked}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Entrando...
            </>
          ) : (
            <>
              Entrar
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">ou continue com</span>
          </div>
        </div>

        {/* Botões de Login Social */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading || socialLoading !== null || isBlocked}
            className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {socialLoading === 'google' ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Chrome className="w-5 h-5 mr-2 text-red-500" />
                Google
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin('facebook')}
            disabled={isLoading || socialLoading !== null || isBlocked}
            className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {socialLoading === 'facebook' ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Facebook className="w-5 h-5 mr-2 text-blue-600" />
                Facebook
              </>
            )}
          </Button>
        </div>

        {/* Link para Cadastro */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link 
              href="/auth/signup" 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Cadastre-se gratuitamente
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  )
}
