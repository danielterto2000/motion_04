
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Star, 
  Download, 
  Play, 
  Heart,
  ShoppingCart,
  Eye,
  Clock,
  Tag,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ModernCard } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const categories = [
  { id: 'all', name: 'Todos', count: 1247 },
  { id: 'lower-thirds', name: 'Lower Thirds', count: 324 },
  { id: 'transitions', name: 'Transições', count: 198 },
  { id: 'titles', name: 'Títulos', count: 156 },
  { id: 'overlays', name: 'Overlays', count: 142 },
  { id: 'logos', name: 'Logo Reveals', count: 98 },
  { id: 'backgrounds', name: 'Backgrounds', count: 87 },
  { id: 'elements', name: 'Elementos', count: 242 }
]

const software = [
  { id: 'all', name: 'Todos' },
  { id: 'after-effects', name: 'After Effects' },
  { id: 'premiere-pro', name: 'Premiere Pro' },
  { id: 'davinci-resolve', name: 'DaVinci Resolve' },
  { id: 'final-cut', name: 'Final Cut Pro' }
]

const templates = [
  {
    id: 1,
    title: 'Broadcast News Lower Thirds',
    description: 'Pacote completo de lower thirds para telejornais e programas de notícias.',
    image: 'https://i.pinimg.com/736x/cd/5c/5e/cd5c5e572769a5976445c3460995fc71.jpg',
    price: 89,
    originalPrice: 129,
    rating: 4.9,
    downloads: 2847,
    category: 'Lower Thirds',
    software: ['After Effects', 'Premiere Pro'],
    tags: ['Broadcast', 'News', 'Professional'],
    author: 'Motion Studio Pro',
    authorAvatar: 'https://i.pinimg.com/originals/67/27/34/672734fae19ea3fc3aaf30f828967b46.jpg',
    featured: true,
    new: false,
    trending: true,
    preview: '/preview1.mp4'
  },
  {
    id: 2,
    title: 'Cinematic Title Sequences',
    description: 'Títulos cinematográficos com efeitos de partículas e tipografia elegante.',
    image: 'https://i.ytimg.com/vi/D58KIfFMJ9Y/maxresdefault.jpg',
    price: 119,
    originalPrice: 159,
    rating: 5.0,
    downloads: 1923,
    category: 'Títulos',
    software: ['After Effects'],
    tags: ['Cinema', 'Titles', 'Premium'],
    author: 'Creative Films',
    authorAvatar: 'https://i.pinimg.com/originals/7e/fb/6b/7efb6bda8129cd7ed5e364226e6e250c.jpg',
    featured: true,
    new: true,
    trending: false,
    preview: '/preview2.mp4'
  },
  {
    id: 3,
    title: 'Modern Transitions Pack',
    description: 'Coleção de transições modernas e fluidas para edição profissional.',
    image: 'https://i.ytimg.com/vi/S8CVMR6Wr1U/maxresdefault.jpg',
    price: 69,
    originalPrice: 99,
    rating: 4.8,
    downloads: 3421,
    category: 'Transições',
    software: ['Premiere Pro', 'DaVinci Resolve'],
    tags: ['Modern', 'Smooth', 'Versatile'],
    author: 'Transition Masters',
    authorAvatar: 'https://i.pinimg.com/originals/9c/67/e8/9c67e8681d64b197ffcf4781813ef4be.jpg',
    featured: false,
    new: false,
    trending: true,
    preview: '/preview3.mp4'
  },
  {
    id: 4,
    title: 'Corporate Logo Reveals',
    description: 'Revelações de logo elegantes para apresentações corporativas.',
    image: 'https://i.ytimg.com/vi/ysXzhubt12o/maxresdefault.jpg',
    price: 79,
    originalPrice: 109,
    rating: 4.7,
    downloads: 1654,
    category: 'Logo Reveals',
    software: ['After Effects'],
    tags: ['Corporate', 'Professional', 'Clean'],
    author: 'Brand Motion',
    authorAvatar: 'https://i.pinimg.com/originals/de/76/93/de7693997143cd63f514183afebe0e0f.jpg',
    featured: false,
    new: true,
    trending: false,
    preview: '/preview4.mp4'
  },
  {
    id: 5,
    title: 'Social Media Pack',
    description: 'Templates otimizados para redes sociais com formatos variados.',
    image: 'https://i.pinimg.com/originals/21/12/f4/2112f4599601fa72e09a15e7ea53f438.png',
    price: 49,
    originalPrice: 79,
    rating: 4.6,
    downloads: 5234,
    category: 'Elementos',
    software: ['After Effects', 'Premiere Pro'],
    tags: ['Social', 'Instagram', 'Stories'],
    author: 'Social Creative',
    authorAvatar: 'https://lh3.googleusercontent.com/X8LuYsGddUvyGns8yNt3lsqXU-etopUi9saFCQ-VMIImDW0plr-ZvBRjhnKh4V2r6UEMaBMXUBkJSD_RrHbWdmIp2RUnVJgcbiJ_S3l_kOAseWWI6JiLccLcL0cRFpnba-n4bjlOW3FvHbHdMs_ToZE',
    featured: false,
    new: false,
    trending: true,
    preview: '/preview5.mp4'
  },
  {
    id: 6,
    title: 'Particle Backgrounds',
    description: 'Fundos animados com partículas para projetos premium.',
    image: 'https://i.ytimg.com/vi/-EiGjcEC2ro/maxresdefault.jpg',
    price: 59,
    originalPrice: 89,
    rating: 4.9,
    downloads: 2156,
    category: 'Backgrounds',
    software: ['After Effects'],
    tags: ['Particles', 'Abstract', 'Premium'],
    author: 'Abstract Motion',
    authorAvatar: 'https://cdn.dribbble.com/users/143861/screenshots/4315114/abstract.png',
    featured: false,
    new: false,
    trending: false,
    preview: '/preview6.mp4'
  }
]

export default function TemplatesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSoftware, setSelectedSoftware] = useState('all')
  const [sortBy, setSortBy] = useState('trending')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filteredTemplates, setFilteredTemplates] = useState(templates)

  useEffect(() => {
    let filtered = templates

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(template =>
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template => 
        template.category.toLowerCase().replace(' ', '-') === selectedCategory
      )
    }

    // Filter by software
    if (selectedSoftware !== 'all') {
      filtered = filtered.filter(template =>
        template.software.some(sw => 
          sw.toLowerCase().replace(' ', '-') === selectedSoftware
        )
      )
    }

    // Sort templates
    switch (sortBy) {
      case 'trending':
        filtered = filtered.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0))
        break
      case 'newest':
        filtered = filtered.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0))
        break
      case 'price-low':
        filtered = filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered = filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered = filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'downloads':
        filtered = filtered.sort((a, b) => b.downloads - a.downloads)
        break
    }

    setFilteredTemplates(filtered)
  }, [searchTerm, selectedCategory, selectedSoftware, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/95 via-primary-800/90 to-primary-700/95"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container-modern relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
              <Zap className="w-4 h-4 text-secondary-400" />
              <span>Templates Premium</span>
            </div>
            
            <h1 className="heading-xl mb-6">
              Templates Profissionais para
              <span className="text-gradient-accent block">Motion Graphics</span>
            </h1>
            
            <p className="body-lg text-primary-200 max-w-3xl mx-auto mb-8">
              Descubra nossa coleção de templates premium para After Effects, Premiere Pro e DaVinci Resolve. 
              Qualidade broadcast, licença comercial incluída.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <Input
                variant="search"
                placeholder="Buscar templates, categorias ou tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="w-5 h-5" />}
                className="bg-white/90 backdrop-blur-sm border-white/30 text-primary-900 placeholder:text-primary-500"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Content */}
      <section className="section-padding">
        <div className="container-modern">
          {/* Filters Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-soft border border-primary-100 p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Left Filters */}
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSoftware} onValueChange={setSelectedSoftware}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Software" />
                  </SelectTrigger>
                  <SelectContent>
                    {software.map((sw) => (
                      <SelectItem key={sw.id} value={sw.id}>
                        {sw.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trending">Trending</SelectItem>
                    <SelectItem value="newest">Mais Novos</SelectItem>
                    <SelectItem value="price-low">Menor Preço</SelectItem>
                    <SelectItem value="price-high">Maior Preço</SelectItem>
                    <SelectItem value="rating">Melhor Avaliação</SelectItem>
                    <SelectItem value="downloads">Mais Baixados</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Right Controls */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-primary-600">
                  {filteredTemplates.length} templates encontrados
                </span>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Templates Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}
          >
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <ModernCard variant="product" className="group">
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={template.image}
                      alt={template.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30">
                          <Play className="w-5 h-5 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {template.featured && (
                        <Badge variant="gradient" className="text-xs">
                          <Award className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      {template.new && (
                        <Badge variant="success" className="text-xs">
                          <Zap className="w-3 h-3 mr-1" />
                          Novo
                        </Badge>
                      )}
                      {template.trending && (
                        <Badge variant="warning" className="text-xs">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="sm" variant="ghost" className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-primary-900 mb-2 group-hover:text-secondary-600 transition-colors duration-300">
                          {template.title}
                        </h3>
                        <p className="text-primary-600 text-sm line-clamp-2">
                          {template.description}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-4 mb-4 text-sm text-primary-500">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{template.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span>{template.downloads.toLocaleString()}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-primary-100 text-primary-700 rounded-lg text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Software */}
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-xs text-primary-500">Compatível com:</span>
                      <div className="flex space-x-1">
                        {template.software.map((sw) => (
                          <Badge key={sw} variant="secondary" className="text-xs">
                            {sw}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Author */}
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-8 h-8 relative rounded-full overflow-hidden">
                        <Image
                          src={template.authorAvatar}
                          alt={template.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary-900">{template.author}</p>
                        <p className="text-xs text-primary-500">Criador Verificado</p>
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-primary-900">
                          R$ {template.price}
                        </span>
                        {template.originalPrice > template.price && (
                          <span className="text-sm text-primary-500 line-through">
                            R$ {template.originalPrice}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => router.push(`/checkout/${template.id}`)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Comprar
                        </Button>
                      </div>
                    </div>
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Button variant="outline" className="px-8 py-3">
              Carregar Mais Templates
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
