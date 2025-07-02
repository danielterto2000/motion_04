
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Star, Download, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  buttonText?: string;
  buttonUrl?: string;
  category?: string;
  price?: string;
  rating?: number;
  downloads?: string;
  tags: string[];
  gradient: string;
  isActive: boolean;
  sortOrder: number;
}

// Slides padrão como fallback
const defaultSlides = [
  {
    id: 'default-1',
    title: 'Lower Thirds Profissionais',
    subtitle: 'Templates Premium para Broadcast',
    description: 'Coleção completa de lower thirds animados para programas de TV, noticiários e transmissões ao vivo. Compatível com After Effects e Premiere Pro.',
    imageUrl: 'https://i.pinimg.com/736x/cd/5c/5e/cd5c5e572769a5976445c3460995fc71.jpg',
    category: 'Lower Thirds',
    price: 'R$ 89',
    rating: 4.9,
    downloads: '2.3k',
    buttonText: 'Ver Template',
    buttonUrl: '/templates',
    tags: ['After Effects', 'Premiere Pro', 'Broadcast'],
    gradient: 'from-blue-600 to-purple-700',
    isActive: true,
    sortOrder: 0
  },
  {
    id: 'default-2',
    title: 'Pacote Motion Graphics TV',
    subtitle: 'Elementos Animados Completos',
    description: 'Mais de 100 elementos animados para televisão: transições, overlays, frames e efeitos especiais. Perfeito para produtoras e emissoras.',
    imageUrl: 'https://i.pinimg.com/originals/66/0c/c9/660cc99085787bcfa03a356d3f1a2c8e.jpg',
    category: 'Pacote Completo',
    price: 'R$ 149',
    rating: 5.0,
    downloads: '1.8k',
    buttonText: 'Ver Template',
    buttonUrl: '/templates',
    tags: ['Motion Graphics', 'TV Package', 'Elementos'],
    gradient: 'from-emerald-600 to-teal-700',
    isActive: true,
    sortOrder: 1
  },
  {
    id: 'default-3',
    title: 'Títulos Cinematográficos',
    subtitle: 'Abertura de Filmes e Séries',
    description: 'Templates de títulos com qualidade cinematográfica. Tipografia elegante, efeitos de partículas e animações suaves para projetos premium.',
    imageUrl: 'https://i.ytimg.com/vi/WOXTlkA4118/maxresdefault.jpg',
    category: 'Títulos',
    price: 'R$ 119',
    rating: 4.8,
    downloads: '3.1k',
    buttonText: 'Ver Template',
    buttonUrl: '/templates',
    tags: ['Cinema', 'Títulos', 'Premium'],
    gradient: 'from-orange-600 to-red-700',
    isActive: true,
    sortOrder: 2
  }
]

export default function HeroSlider() {
  const [slides, setSlides] = useState<HeroSlide[]>(defaultSlides)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSlides()
  }, [])

  const fetchSlides = async () => {
    try {
      const response = await fetch('/api/content?section=homepage')
      if (response.ok) {
        const data = await response.json()
        if (data.heroSlides && data.heroSlides.length > 0) {
          setSlides(data.heroSlides)
        }
      }
    } catch (error) {
      console.error('Erro ao carregar slides:', error)
      // Usar slides padrão em caso de erro
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  return (
    <div className="relative h-screen min-h-[600px] overflow-hidden bg-primary-900">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700"></div>
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='https://i.pinimg.com/originals/d9/b4/b3/d9b4b395e6f255b6a0db2ae2cdd08cf9.png fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`,
          animation: 'float 20s ease-in-out infinite'
        }}></div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <div className="container-modern h-full flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white z-10"
              >
                {/* Category Badge */}
                {slides[currentSlide]?.category && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mb-6"
                  >
                    <Badge className={`bg-gradient-to-r ${slides[currentSlide].gradient} text-white px-4 py-2 text-sm font-medium`}>
                      {slides[currentSlide].category}
                    </Badge>
                  </motion.div>
                )}

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="heading-xl text-white mb-4"
                >
                  {slides[currentSlide]?.title}
                </motion.h1>

                {/* Subtitle */}
                {slides[currentSlide]?.subtitle && (
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="heading-sm text-secondary-300 mb-6"
                  >
                    {slides[currentSlide].subtitle}
                  </motion.h2>
                )}

                {/* Description */}
                {slides[currentSlide]?.description && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="body-lg text-primary-200 mb-8 max-w-lg"
                  >
                    {slides[currentSlide].description}
                  </motion.p>
                )}

                {/* Stats */}
                {(slides[currentSlide]?.rating || slides[currentSlide]?.downloads || slides[currentSlide]?.price) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="flex items-center space-x-6 mb-8"
                  >
                    {slides[currentSlide]?.rating && (
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-white font-semibold">{slides[currentSlide].rating}</span>
                      </div>
                    )}
                    {slides[currentSlide]?.downloads && (
                      <div className="flex items-center space-x-2">
                        <Download className="w-5 h-5 text-accent-400" />
                        <span className="text-primary-200">{slides[currentSlide].downloads} downloads</span>
                      </div>
                    )}
                    {slides[currentSlide]?.price && (
                      <div className="text-2xl font-bold text-secondary-400">
                        {slides[currentSlide].price}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Tags */}
                {slides[currentSlide]?.tags && slides[currentSlide].tags.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-wrap gap-2 mb-8"
                  >
                    {slides[currentSlide].tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-primary-200 border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                )}

                {/* Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link href={slides[currentSlide]?.buttonUrl || '/templates'}>
                    <Button className="btn-primary text-lg px-8 py-4 h-auto">
                      <Play className="w-5 h-5 mr-2" />
                      {slides[currentSlide]?.buttonText || 'Ver Template'}
                    </Button>
                  </Link>
                  <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 text-lg px-8 py-4 h-auto">
                    <Eye className="w-5 h-5 mr-2" />
                    Preview
                  </Button>
                </motion.div>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-large hover-lift">
                  <Image
                    src={slides[currentSlide]?.imageUrl || ''}
                    alt={slides[currentSlide]?.title || 'Slide'}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300"
                    >
                      <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                    </motion.button>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-secondary-500 to-purple-600 rounded-2xl opacity-80 blur-xl"
                ></motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-accent-500 to-secondary-500 rounded-full opacity-60 blur-2xl"
                ></motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4">
          {/* Prev Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Dots */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white scale-125'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Auto-play Indicator */}
      {isAutoPlaying && (
        <div className="absolute top-8 right-8 z-20">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
            <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></div>
            <span className="text-white text-sm">Auto</span>
          </div>
        </div>
      )}
    </div>
  )
}
