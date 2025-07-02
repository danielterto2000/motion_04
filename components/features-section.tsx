
'use client'

import { motion } from 'framer-motion'
import { 
  Zap, 
  Users, 
  Shield, 
  Sparkles, 
  Download, 
  Headphones,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const features = [
  {
    icon: Zap,
    title: 'Templates Profissionais',
    description: 'Mais de 1000+ templates premium para After Effects, Premiere Pro e DaVinci Resolve.',
    benefits: ['Qualidade broadcast', 'Fácil customização', 'Atualizações gratuitas'],
    color: 'from-secondary-500 to-blue-600',
    delay: 0.1
  },
  {
    icon: Users,
    title: 'Marketplace de Talentos',
    description: 'Conecte-se com os melhores motion designers e encontre profissionais qualificados.',
    benefits: ['Perfis verificados', 'Portfólio completo', 'Avaliações reais'],
    color: 'from-accent-500 to-emerald-600',
    delay: 0.2
  },
  {
    icon: Shield,
    title: 'Licença Comercial',
    description: 'Use nossos templates em projetos comerciais sem se preocupar com direitos autorais.',
    benefits: ['Uso ilimitado', 'Projetos comerciais', 'Suporte legal'],
    color: 'from-purple-500 to-indigo-600',
    delay: 0.3
  },
  {
    icon: Sparkles,
    title: 'Qualidade Premium',
    description: 'Todos os templates passam por rigoroso controle de qualidade antes da publicação.',
    benefits: ['4K e 8K', 'Otimizado', 'Sem bugs'],
    color: 'from-warning-500 to-orange-600',
    delay: 0.4
  },
  {
    icon: Download,
    title: 'Download Instantâneo',
    description: 'Baixe seus templates imediatamente após a compra, sem complicações.',
    benefits: ['Acesso vitalício', 'Re-download grátis', 'Múltiplos formatos'],
    color: 'from-pink-500 to-rose-600',
    delay: 0.5
  },
  {
    icon: Headphones,
    title: 'Suporte Especializado',
    description: 'Nossa equipe de especialistas está sempre pronta para ajudar você.',
    benefits: ['Chat 24/7', 'Tutoriais exclusivos', 'Comunidade ativa'],
    color: 'from-cyan-500 to-teal-600',
    delay: 0.6
  }
]

const stats = [
  { number: '10K+', label: 'Templates Vendidos', icon: Download },
  { number: '500+', label: 'Criadores Ativos', icon: Users },
  { number: '98%', label: 'Satisfação', icon: CheckCircle },
  { number: '24/7', label: 'Suporte', icon: Headphones }
]

export default function FeaturesSection() {
  return (
    <section className="section-padding bg-section-alt relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container-modern relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-2 bg-secondary-100 text-secondary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Por que escolher a Broadcast Motion?</span>
          </div>
          
          <h2 className="heading-lg text-primary-900 mb-6">
            Tudo que você precisa para criar
            <span className="text-gradient block">motion graphics incríveis</span>
          </h2>
          
          <p className="body-lg text-primary-600 max-w-3xl mx-auto">
            Nossa plataforma oferece as melhores ferramentas, templates e profissionais 
            para transformar suas ideias em realidade visual.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              viewport={{ once: true }}
              className="card-feature group"
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="heading-sm text-primary-900 mb-4 group-hover:text-secondary-600 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="body-md text-primary-600 mb-6">
                {feature.description}
              </p>

              {/* Benefits */}
              <ul className="space-y-2">
                {feature.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center space-x-2 text-sm text-primary-700">
                    <CheckCircle className="w-4 h-4 text-accent-500 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-large p-8 md:p-12 border border-primary-100"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-primary-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="heading-md text-primary-900 mb-6">
            Pronto para começar?
          </h3>
          <p className="body-lg text-primary-600 mb-8 max-w-2xl mx-auto">
            Explore nossa coleção de templates premium ou encontre o profissional perfeito para seu projeto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/templates">
              <Button className="btn-primary text-lg px-8 py-4 h-auto">
                Explorar Templates
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button variant="outline" className="text-lg px-8 py-4 h-auto border-2 border-primary-200 hover:border-secondary-400">
                Encontrar Profissionais
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
