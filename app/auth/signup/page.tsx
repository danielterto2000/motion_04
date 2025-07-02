
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Play, 
  ArrowRight,
  CheckCircle,
  Star,
  Award,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ModernCard } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'

const benefits = [
  'Acesso gratuito a templates básicos',
  'Marketplace de profissionais',
  'Suporte da comunidade',
  'Atualizações regulares'
]

const features = [
  {
    icon: Award,
    title: 'Templates Premium',
    description: 'Acesso a milhares de templates profissionais'
  },
  {
    icon: Zap,
    title: 'Download Instantâneo',
    description: 'Baixe seus templates imediatamente'
  },
  {
    icon: CheckCircle,
    title: 'Licença Comercial',
    description: 'Use em projetos comerciais sem restrições'
  }
]

export default function SignUpPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro na confirmação",
        description: "As senhas não coincidem. Tente novamente.",
        variant: "destructive",
      })
      return
    }

    if (!acceptTerms) {
      toast({
        title: "Termos de uso",
        description: "Você deve aceitar os termos de uso para continuar.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      if (response.ok) {
        toast({
          title: "Conta criada com sucesso!",
          description: "Fazendo login automaticamente...",
        })

        // Auto sign in after successful registration
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        })

        if (result?.ok) {
          router.push('/dashboard')
        }
      } else {
        const data = await response.json()
        toast({
          title: "Erro ao criar conta",
          description: data.message || "Tente novamente em alguns instantes.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = () => {
    signIn('google', { callbackUrl: '/dashboard' })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex">
      {/* Left Side - Benefits & Features */}
      <div className="hidden lg:flex flex-1 bg-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/95 via-primary-800/90 to-primary-700/95"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative flex flex-col justify-center p-12 text-white">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Header */}
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-6">
                Comece sua jornada no
                <span className="text-gradient-accent block">mundo do motion graphics</span>
              </h2>
              <p className="text-xl text-primary-200">
                Junte-se a milhares de criadores e empresas que já descobriram 
                o poder da nossa plataforma.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + (0.1 * index) }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-secondary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-primary-200 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <h3 className="font-semibold text-white mb-4">O que você ganha ao se cadastrar:</h3>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={benefit} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-primary-200 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-3 gap-6 mt-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">1000+</div>
                <div className="text-xs text-primary-300">Templates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">2.8K+</div>
                <div className="text-xs text-primary-300">Usuários</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">4.9★</div>
                <div className="text-xs text-primary-300">Avaliação</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-3">
              <div className="w-12 h-12 bg-button-gradient rounded-xl flex items-center justify-center shadow-medium">
                <Play className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-primary-900">
                  Broadcast<span className="text-gradient">Motion</span>
                </h1>
                <p className="text-sm text-primary-500">Graphics Studio</p>
              </div>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary-900 mb-2">
              Crie sua conta gratuita
            </h2>
            <p className="text-primary-600">
              Comece a explorar templates premium e conecte-se com profissionais.
            </p>
          </div>

          {/* Form */}
          <ModernCard className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Seu nome completo"
                  icon={<User className="w-5 h-5" />}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="seu@email.com"
                  icon={<Mail className="w-5 h-5" />}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    icon={<Lock className="w-5 h-5" />}
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400 hover:text-primary-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirme sua senha"
                    icon={<Lock className="w-5 h-5" />}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-400 hover:text-primary-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start space-x-3">
                <input 
                  type="checkbox" 
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mt-1 rounded border-primary-300 text-secondary-600 focus:ring-secondary-500" 
                />
                <label htmlFor="terms" className="text-sm text-primary-600">
                  Eu aceito os{' '}
                  <Link href="/termos" className="text-secondary-600 hover:text-secondary-700">
                    Termos de Uso
                  </Link>{' '}
                  e{' '}
                  <Link href="/privacidade" className="text-secondary-600 hover:text-secondary-700">
                    Política de Privacidade
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full btn-primary text-lg py-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Criando conta...
                  </>
                ) : (
                  <>
                    Criar Conta Gratuita
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-primary-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-primary-500">ou cadastre-se com</span>
                </div>
              </div>

              {/* Google Sign Up */}
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignUp}
                className="w-full text-lg py-4"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Cadastrar com Google
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="mt-8 text-center">
              <p className="text-primary-600">
                Já tem uma conta?{' '}
                <Link href="/auth/signin" className="text-secondary-600 hover:text-secondary-700 font-medium">
                  Faça login
                </Link>
              </p>
            </div>
          </ModernCard>
        </motion.div>
      </div>
    </div>
  )
}
