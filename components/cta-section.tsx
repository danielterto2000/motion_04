
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ArrowRight, 
  Sparkles, 
  Play, 
  Users, 
  Download,
  CheckCircle,
  Star,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const benefits = [
  'Acesso a 1000+ templates premium',
  'Licença comercial incluída',
  'Suporte técnico especializado',
  'Atualizações gratuitas vitalícias',
  'Comunidade exclusiva de criadores',
  'Downloads ilimitados'
]

const quickStats = [
  { icon: Download, value: '15K+', label: 'Downloads' },
  { icon: Users, value: '2.8K+', label: 'Criadores' },
  { icon: Star, value: '4.9', label: 'Avaliação' }
]

export default function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background with Gradient */}
      <div className="absolute inset-0 bg-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/95 via-primary-800/90 to-primary-700/95"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary-500 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 w-48 h-48 bg-accent-500 rounded-full blur-2xl"
        ></motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container-modern relative">
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-8 border border-white/20"
            >
              <Sparkles className="w-5 h-5 text-secondary-400" />
              <span>Transforme suas ideias em realidade</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="heading-xl text-white mb-8"
            >
              Pronto para criar motion graphics
              <span className="text-gradient-accent block">que impressionam?</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="body-lg text-primary-200 mb-12 max-w-3xl mx-auto"
            >
              Junte-se a milhares de profissionais que já descobriram o poder da nossa plataforma. 
              Templates premium, profissionais qualificados e uma comunidade vibrante te esperam.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-8 mb-12"
            >
              {quickStats.map((stat, index) => (
                <div key={stat.label} className="flex items-center space-x-3 text-white">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                    <stat.icon className="w-5 h-5 text-secondary-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-primary-300">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <Link href="/templates">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="btn-primary text-lg px-10 py-4 h-auto shadow-glow">
                    <Play className="w-5 h-5 mr-2" />
                    Explorar Templates
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </Link>
              
              <Link href="/marketplace">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline" 
                    className="text-white border-white/30 hover:bg-white/10 text-lg px-10 py-4 h-auto backdrop-blur-sm"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Encontrar Profissionais
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-medium">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Zap className="w-6 h-6 text-secondary-400" />
                <span className="text-secondary-400 font-semibold text-lg">Oferta Especial</span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                Comece hoje e ganhe 30% de desconto
              </h3>
              
              <p className="text-primary-200 mb-6 max-w-2xl mx-auto">
                Aproveite nossa oferta de lançamento e tenha acesso completo à plataforma 
                com desconto especial. Válido apenas para os primeiros 100 usuários.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/auth/signup">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="btn-primary text-lg px-8 py-4 h-auto">
                      Cadastrar Agora
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                </Link>
                
                <div className="text-primary-300 text-sm">
                  ⏰ Restam apenas <span className="text-warning-400 font-semibold">47 vagas</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
