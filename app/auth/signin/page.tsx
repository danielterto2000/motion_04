
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Play, 
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react'
import LoginForm from '@/components/auth/login-form'

const benefits = [
  {
    icon: <CheckCircle className="w-5 h-5" />,
    text: 'Acesso a 1000+ templates premium'
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    text: 'Downloads ilimitados'
  },
  {
    icon: <Award className="w-5 h-5" />,
    text: 'Suporte técnico especializado'
  },
  {
    icon: <Zap className="w-5 h-5" />,
    text: 'Licença comercial incluída'
  }
]

const testimonials = [
  {
    name: 'Carlos Mendes',
    role: 'Motion Designer',
    company: 'Globo TV',
    avatar: 'https://i.pinimg.com/originals/e3/7e/0e/e37e0e25686c2139b281a57a5b4906f2.jpg',
    rating: 5,
    text: 'A plataforma revolucionou meu workflow. Qualidade excepcional e suporte incomparável.'
  },
  {
    name: 'Ana Silva',
    role: 'Creative Director',
    company: 'SBT',
    avatar: 'https://i.pinimg.com/736x/2e/6c/c8/2e6cc87ec1cedb6fa6f7aada47b91bfb.jpg',
    rating: 5,
    text: 'Templates incríveis que economizam horas de trabalho. Recomendo para todos os profissionais.'
  }
]

const stats = [
  { value: '15K+', label: 'Templates Baixados' },
  { value: '2.8K+', label: 'Criadores Ativos' },
  { value: '98%', label: 'Satisfação' },
  { value: '24/7', label: 'Suporte' }
]

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <Link href="/" className="inline-flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <Play className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-gray-900">
                  Broadcast<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Motion</span>
                </h1>
                <p className="text-sm text-gray-500">Graphics Studio</p>
              </div>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Bem-vindo de volta!
            </h2>
            <p className="text-gray-600">
              Faça login para acessar sua conta e continuar criando conteúdo incrível.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <LoginForm />
          </motion.div>
        </div>
      </div>

      {/* Right Side - Benefits & Testimonials */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative flex flex-col justify-center p-12 text-white z-10">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                Junte-se a milhares de
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  criadores profissionais
                </span>
              </h2>
              <p className="text-xl text-blue-200 leading-relaxed">
                Acesse templates premium, conecte-se com profissionais e 
                transforme suas ideias em realidade.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + (0.1 * index) }}
                  className="flex items-center space-x-3 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    {benefit.icon}
                  </div>
                  <span className="text-blue-100 group-hover:text-white transition-colors">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Testimonials */}
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 + (0.2 * index) }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-blue-300">{testimonial.role} • {testimonial.company}</p>
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <blockquote className="text-blue-200 italic">
                    "{testimonial.text}"
                  </blockquote>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center group">
                  <div className="text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-sm text-blue-300">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex items-center justify-center space-x-8 pt-8 border-t border-white/20"
            >
              <div className="flex items-center space-x-2 text-blue-200">
                <Users className="w-5 h-5" />
                <span className="text-sm">Comunidade Ativa</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-200">
                <Award className="w-5 h-5" />
                <span className="text-sm">Qualidade Premium</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
