
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import { 
  TrendingUp, 
  Users, 
  Download, 
  Star,
  Globe,
  Award,
  Clock,
  Zap
} from 'lucide-react'

const stats = [
  {
    icon: Download,
    number: 15420,
    label: 'Templates Baixados',
    suffix: '+',
    description: 'Downloads este mês',
    color: 'from-secondary-500 to-blue-600',
    delay: 0.1
  },
  {
    icon: Users,
    number: 2847,
    label: 'Criadores Ativos',
    suffix: '+',
    description: 'Profissionais verificados',
    color: 'from-accent-500 to-emerald-600',
    delay: 0.2
  },
  {
    icon: Star,
    number: 4.9,
    label: 'Avaliação Média',
    suffix: '/5',
    description: 'Baseado em 12k+ reviews',
    color: 'from-warning-500 to-orange-600',
    delay: 0.3
  },
  {
    icon: Globe,
    number: 89,
    label: 'Países Atendidos',
    suffix: '+',
    description: 'Presença global',
    color: 'from-purple-500 to-indigo-600',
    delay: 0.4
  },
  {
    icon: Award,
    number: 156,
    label: 'Prêmios Ganhos',
    suffix: '+',
    description: 'Reconhecimento da indústria',
    color: 'from-pink-500 to-rose-600',
    delay: 0.5
  },
  {
    icon: Clock,
    number: 24,
    label: 'Suporte Disponível',
    suffix: '/7',
    description: 'Atendimento contínuo',
    color: 'from-cyan-500 to-teal-600',
    delay: 0.6
  }
]

function AnimatedNumber({ 
  number, 
  suffix = '', 
  duration = 2000 
}: { 
  number: number
  suffix?: string
  duration?: number 
}) {
  const [displayNumber, setDisplayNumber] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  })

  useEffect(() => {
    if (inView) {
      let startTime: number
      let startNumber = 0

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentNumber = startNumber + (number - startNumber) * easeOutQuart
        
        setDisplayNumber(currentNumber)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }
  }, [inView, number, duration])

  return (
    <span ref={ref}>
      {number % 1 === 0 ? Math.floor(displayNumber) : displayNumber.toFixed(1)}
      {suffix}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section className="section-padding bg-primary-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='https://cdn.pixabay.com/photo/2021/03/19/16/45/square-6107932_1280.png fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30m-2 0a2 2 0 1 1 4 0a2 2 0 1 1 -4 0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'float 15s ease-in-out infinite'
          }}></div>
        </div>
      </div>

      <div className="container-modern relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
            <TrendingUp className="w-4 h-4" />
            <span>Números que impressionam</span>
          </div>
          
          <h2 className="heading-lg text-white mb-6">
            Confiança que se traduz em
            <span className="text-gradient-accent block">resultados excepcionais</span>
          </h2>
          
          <p className="body-lg text-primary-200 max-w-3xl mx-auto">
            Milhares de profissionais e empresas já confiam na nossa plataforma 
            para criar motion graphics de qualidade mundial.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: stat.delay }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>

                {/* Number */}
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-secondary-300 transition-colors duration-300">
                  <AnimatedNumber number={stat.number} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-secondary-300 transition-colors duration-300">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-primary-300 text-sm">
                  {stat.description}
                </p>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl pointer-events-none`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Zap className="w-6 h-6 text-secondary-400" />
              <span className="text-secondary-400 font-semibold">Junte-se à comunidade</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Faça parte desses números
            </h3>
            <p className="text-primary-200 mb-6 max-w-2xl mx-auto">
              Milhares de criadores e empresas já descobriram o poder da nossa plataforma. 
              Seja o próximo a transformar suas ideias em realidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
              >
                Começar Agora
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                Saber Mais
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
