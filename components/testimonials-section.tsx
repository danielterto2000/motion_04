
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, Play, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const testimonials = [
  {
    id: 1,
    name: 'Carlos Mendes',
    role: 'Motion Designer',
    company: 'Globo TV',
    image: 'https://i.pinimg.com/736x/36/ab/cd/36abcd0c08cb82d6873d118eee7e94b2--professional-headshots-pine.jpg',
    rating: 5,
    text: 'Os templates da Broadcast Motion revolucionaram nosso workflow. A qualidade é excepcional e o suporte técnico é incomparável. Conseguimos reduzir o tempo de produção em 60%.',
    project: 'Jornal Nacional - Vinhetas',
    category: 'Broadcast',
    verified: true
  },
  {
    id: 2,
    name: 'Ana Silva',
    role: 'Diretora Criativa',
    company: 'Produtora Criativa',
    image: 'https://i.pinimg.com/originals/31/42/0b/31420b9b2ea8a5d56829f10a6505340d.jpg',
    rating: 5,
    text: 'Encontrei profissionais incríveis através do marketplace. A plataforma conecta talentos reais com projetos desafiadores. Já fechamos mais de 20 projetos aqui.',
    project: 'Campanha Coca-Cola',
    category: 'Publicidade',
    verified: true
  },
  {
    id: 3,
    name: 'Roberto Santos',
    role: 'Freelancer',
    company: 'Studio Independente',
    image: 'https://i.pinimg.com/originals/ef/16/e4/ef16e4e68b0d3cb81e6bb8a8c3258d7e.gif',
    rating: 5,
    text: 'Como freelancer, a Broadcast Motion me deu visibilidade e credibilidade. Minha renda triplicou desde que comecei a vender templates aqui. A comunidade é fantástica!',
    project: 'Templates Lower Thirds',
    category: 'Templates',
    verified: true
  },
  {
    id: 4,
    name: 'Marina Costa',
    role: 'Produtora Executiva',
    company: 'Record TV',
    image: 'https://i.pinimg.com/originals/92/ea/93/92ea933c25041b30629b933293c6fe3f.jpg',
    rating: 5,
    text: 'A variedade e qualidade dos templates nos permite criar conteúdo de alto nível com agilidade. O ROI foi imediato - recomendo para qualquer produtora séria.',
    project: 'Programa Domingo Espetacular',
    category: 'TV Show',
    verified: true
  },
  {
    id: 5,
    name: 'Lucas Ferreira',
    role: 'Editor de Vídeo',
    company: 'YouTube Creator',
    image: 'https://i.ytimg.com/vi/Yja6xUWM-ZI/maxresdefault.jpg',
    rating: 5,
    text: 'Meus vídeos no YouTube nunca tiveram tanta qualidade visual. Os templates são fáceis de usar e o resultado é profissional. Meus inscritos adoraram a mudança!',
    project: 'Canal Tech Reviews',
    category: 'YouTube',
    verified: true
  }
]

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index)
  }

  return (
    <section className="section-padding bg-section-alt relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-secondary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
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
          <div className="inline-flex items-center space-x-2 bg-accent-100 text-accent-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Quote className="w-4 h-4" />
            <span>O que nossos clientes dizem</span>
          </div>
          
          <h2 className="heading-lg text-primary-900 mb-6">
            Histórias de sucesso que
            <span className="text-gradient block">inspiram e motivam</span>
          </h2>
          
          <p className="body-lg text-primary-600 max-w-3xl mx-auto">
            Descubra como profissionais e empresas transformaram seus projetos 
            com nossa plataforma e comunidade.
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-large p-8 md:p-12 border border-primary-100"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Testimonial Content */}
                <div className="lg:col-span-2">
                  {/* Quote Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <Quote className="w-8 h-8 text-white" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-xl md:text-2xl text-primary-800 leading-relaxed mb-8 font-medium">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>

                  {/* Project Info */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <Badge className="bg-secondary-100 text-secondary-700 px-3 py-1">
                      <Play className="w-3 h-3 mr-1" />
                      {testimonials[currentTestimonial].project}
                    </Badge>
                    <Badge className="bg-accent-100 text-accent-700 px-3 py-1">
                      {testimonials[currentTestimonial].category}
                    </Badge>
                    {testimonials[currentTestimonial].verified && (
                      <Badge className="bg-green-100 text-green-700 px-3 py-1">
                        <Award className="w-3 h-3 mr-1" />
                        Verificado
                      </Badge>
                    )}
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-primary-900">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-primary-600">
                        {testimonials[currentTestimonial].role}
                      </p>
                      <p className="text-sm text-secondary-600 font-medium">
                        {testimonials[currentTestimonial].company}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Author Image (Large) */}
                <div className="lg:col-span-1">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-large hover-lift">
                    <Image
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-12 space-x-6">
            {/* Previous Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border-2 border-primary-200 hover:border-secondary-400 hover:bg-secondary-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-secondary-500 scale-125'
                      : 'bg-primary-300 hover:bg-primary-400'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border-2 border-primary-200 hover:border-secondary-400 hover:bg-secondary-50"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary-600 mb-2">4.9/5</div>
            <div className="text-primary-600">Avaliação Média</div>
            <div className="flex justify-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-600 mb-2">12,000+</div>
            <div className="text-primary-600">Reviews Positivos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
            <div className="text-primary-600">Taxa de Satisfação</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
