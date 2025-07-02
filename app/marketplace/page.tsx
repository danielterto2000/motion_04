
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Briefcase, 
  Clock,
  DollarSign,
  Users,
  Award,
  CheckCircle,
  MessageCircle,
  Heart,
  Eye,
  TrendingUp,
  Zap,
  Play,
  Calendar
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const specialties = [
  { id: 'all', name: 'Todas', count: 847 },
  { id: 'motion-graphics', name: 'Motion Graphics', count: 324 },
  { id: 'broadcast', name: 'Broadcast Design', count: 198 },
  { id: 'video-editing', name: 'Edição de Vídeo', count: 156 },
  { id: 'animation', name: 'Animação 2D/3D', count: 142 },
  { id: 'vfx', name: 'Efeitos Visuais', count: 98 },
  { id: 'color-grading', name: 'Color Grading', count: 87 }
]

const locations = [
  { id: 'all', name: 'Todas as Cidades' },
  { id: 'sao-paulo', name: 'São Paulo' },
  { id: 'rio-janeiro', name: 'Rio de Janeiro' },
  { id: 'belo-horizonte', name: 'Belo Horizonte' },
  { id: 'brasilia', name: 'Brasília' },
  { id: 'remote', name: 'Remoto' }
]

const professionals = [
  {
    id: 1,
    name: 'Carlos Mendes',
    title: 'Senior Motion Designer',
    location: 'São Paulo, SP',
    avatar: 'https://i.pinimg.com/736x/fd/6c/18/fd6c184d9919dffdf5aea643a0343baf.jpg',
    coverImage: 'https://i.ytimg.com/vi/5aCdZz_Zj4s/maxresdefault.jpg',
    rating: 4.9,
    reviews: 127,
    hourlyRate: 85,
    completedProjects: 234,
    responseTime: '2h',
    specialty: 'Motion Graphics',
    skills: ['After Effects', 'Cinema 4D', 'Premiere Pro', 'Illustrator'],
    description: 'Especialista em motion graphics para broadcast com mais de 8 anos de experiência. Trabalhou com Globo, SBT e Record.',
    portfolio: [
      'https://i.pinimg.com/736x/7c/36/87/7c3687486136a61dcea1d98bde078ead.jpg',
      'https://i.pinimg.com/736x/c8/40/b2/c840b22b9910e9342e3ec7259337e8fb--sports-motion-graphics-broadcast-design.jpg',
      'https://i.pinimg.com/736x/1a/6b/d6/1a6bd6f9195245142aa16926b9e0b3d2.jpg'
    ],
    verified: true,
    featured: true,
    available: true,
    languages: ['Português', 'Inglês'],
    experience: '8+ anos'
  },
  {
    id: 2,
    name: 'Ana Silva',
    title: 'Broadcast Designer',
    location: 'Rio de Janeiro, RJ',
    avatar: 'https://i.pinimg.com/originals/c7/37/67/c737676f5b2aac4463b6c99b399ea713.jpg',
    coverImage: 'https://i.ytimg.com/vi/yEpQFdVTfXw/maxresdefault.jpg',
    rating: 5.0,
    reviews: 89,
    hourlyRate: 95,
    completedProjects: 156,
    responseTime: '1h',
    specialty: 'Broadcast Design',
    skills: ['After Effects', 'Photoshop', 'Illustrator', 'DaVinci Resolve'],
    description: 'Criadora de identidades visuais para TV e streaming. Especializada em pacotes gráficos completos para emissoras.',
    portfolio: [
      'https://i.pinimg.com/originals/d4/1c/f8/d41cf843a2e4232aec6bf6e3b25c3679.jpg',
      'https://i.pinimg.com/originals/ce/ea/6c/ceea6c4a2d45bc4346b4d41fc4142444.png',
      'https://i.pinimg.com/736x/bd/1e/4c/bd1e4cdb885b16e7cf1695d29cdcc3f1--creative-portfolio-shirt-print.jpg'
    ],
    verified: true,
    featured: true,
    available: true,
    languages: ['Português', 'Inglês', 'Espanhol'],
    experience: '6+ anos'
  },
  {
    id: 3,
    name: 'Roberto Santos',
    title: 'VFX Artist & Animator',
    location: 'Remoto',
    avatar: 'https://miro.medium.com/v2/resize:fit:1152/0*V3YXYrKbE5zARzYi.jpg',
    coverImage: 'https://i.ytimg.com/vi/BeV8g8p3PKA/hqdefault.jpg',
    rating: 4.8,
    reviews: 203,
    hourlyRate: 75,
    completedProjects: 312,
    responseTime: '3h',
    specialty: 'Efeitos Visuais',
    skills: ['After Effects', 'Nuke', 'Blender', 'Houdini'],
    description: 'Artista de VFX com experiência em cinema e publicidade. Especializado em compositing e animação 3D.',
    portfolio: [
      'https://lh4.googleusercontent.com/tHCiJQW4pPkusWf2C5uQF63h1x3ezJ1W1E9bcLZvILsIJu6RfStJRLKnRfeiY3WPZAmDzu3QppOD354xIeFwS-e1yT_pu42I3I19wOwjp2ZeLFYGAYWx-h-4odyXiH6fIJ7h6fhjHwyDOsISTw',
      'https://i.ytimg.com/vi/gSHRkgcyJjM/maxresdefault.jpg',
      'https://i.ytimg.com/vi/y6yg4Wkcg3w/maxresdefault.jpg'
    ],
    verified: true,
    featured: false,
    available: true,
    languages: ['Português', 'Inglês'],
    experience: '10+ anos'
  },
  {
    id: 4,
    name: 'Marina Costa',
    title: 'Video Editor & Colorist',
    location: 'Belo Horizonte, MG',
    avatar: 'https://thumbs.dreamstime.com/z/female-video-editor-colorist-puts-her-headphones-background-professional-post-production-house-team-working-150487680.jpg',
    coverImage: 'https://i.ytimg.com/vi/NzDVFbhGy-Q/maxresdefault.jpg',
    rating: 4.7,
    reviews: 145,
    hourlyRate: 65,
    completedProjects: 189,
    responseTime: '4h',
    specialty: 'Edição de Vídeo',
    skills: ['Premiere Pro', 'DaVinci Resolve', 'Avid', 'Final Cut'],
    description: 'Editora e colorista com foco em documentários e conteúdo corporativo. Especializada em storytelling visual.',
    portfolio: [
      'https://i.ytimg.com/vi/ALyDrVcjOS8/maxresdefault.jpg',
      'https://i.ytimg.com/vi/V1aM4xnjomA/maxresdefault.jpg',
      'https://i.ytimg.com/vi/kN0zyYzl-Ec/maxresdefault.jpg'
    ],
    verified: true,
    featured: false,
    available: false,
    languages: ['Português'],
    experience: '5+ anos'
  },
  {
    id: 5,
    name: 'Lucas Ferreira',
    title: '2D/3D Animator',
    location: 'Brasília, DF',
    avatar: 'https://i.pinimg.com/736x/f4/9d/58/f49d58b8c6a678be1e4ff288b98cc75b.jpg',
    coverImage: 'https://i.ytimg.com/vi/irRopxnyxis/maxresdefault.jpg',
    rating: 4.9,
    reviews: 76,
    hourlyRate: 70,
    completedProjects: 98,
    responseTime: '2h',
    specialty: 'Animação 2D/3D',
    skills: ['After Effects', 'Cinema 4D', 'Blender', 'Toon Boom'],
    description: 'Animador especializado em character animation e motion graphics. Trabalha com publicidade e entretenimento.',
    portfolio: [
      'https://i.pinimg.com/originals/62/c5/b7/62c5b7a7b31d2e18c0d65018a6e9fc77.jpg',
      'https://i.ytimg.com/vi/vuWZxgvTNCM/maxresdefault.jpg',
      'https://i.ytimg.com/vi/0JL8WtC8FgI/maxresdefault.jpg'
    ],
    verified: true,
    featured: false,
    available: true,
    languages: ['Português', 'Inglês'],
    experience: '4+ anos'
  }
]

const jobs = [
  {
    id: 1,
    title: 'Motion Designer para Telejornal',
    company: 'TV Globo',
    location: 'São Paulo, SP',
    type: 'Freelance',
    budget: 'R$ 5.000 - R$ 8.000',
    duration: '2 semanas',
    posted: '2 dias atrás',
    proposals: 12,
    description: 'Procuramos motion designer experiente para criar pacote gráfico completo para novo telejornal.',
    skills: ['After Effects', 'Cinema 4D', 'Broadcast Design'],
    urgent: true,
    featured: true
  },
  {
    id: 2,
    title: 'Animação 3D para Comercial',
    company: 'Agência Criativa',
    location: 'Rio de Janeiro, RJ',
    type: 'Projeto',
    budget: 'R$ 12.000 - R$ 18.000',
    duration: '1 mês',
    posted: '1 dia atrás',
    proposals: 8,
    description: 'Criação de animação 3D para campanha publicitária de grande marca nacional.',
    skills: ['Cinema 4D', 'Blender', 'After Effects'],
    urgent: false,
    featured: true
  },
  {
    id: 3,
    title: 'Editor de Vídeo para YouTube',
    company: 'Canal Tech',
    location: 'Remoto',
    type: 'Contrato',
    budget: 'R$ 3.000/mês',
    duration: '6 meses',
    posted: '3 dias atrás',
    proposals: 24,
    description: 'Editor para canal de tecnologia com 500k inscritos. Experiência com YouTube essencial.',
    skills: ['Premiere Pro', 'After Effects', 'YouTube'],
    urgent: false,
    featured: false
  }
]

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState('professionals')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [sortBy, setSortBy] = useState('rating')
  const [filteredProfessionals, setFilteredProfessionals] = useState(professionals)

  useEffect(() => {
    let filtered = professionals

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(prof =>
        prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by specialty
    if (selectedSpecialty !== 'all') {
      filtered = filtered.filter(prof => 
        prof.specialty.toLowerCase().replace(' ', '-').replace('/', '-') === selectedSpecialty
      )
    }

    // Filter by location
    if (selectedLocation !== 'all') {
      if (selectedLocation === 'remote') {
        filtered = filtered.filter(prof => prof.location.toLowerCase().includes('remoto'))
      } else {
        const locationName = locations.find(loc => loc.id === selectedLocation)?.name
        if (locationName) {
          filtered = filtered.filter(prof => prof.location.includes(locationName))
        }
      }
    }

    // Sort professionals
    switch (sortBy) {
      case 'rating':
        filtered = filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'price-low':
        filtered = filtered.sort((a, b) => a.hourlyRate - b.hourlyRate)
        break
      case 'price-high':
        filtered = filtered.sort((a, b) => b.hourlyRate - a.hourlyRate)
        break
      case 'projects':
        filtered = filtered.sort((a, b) => b.completedProjects - a.completedProjects)
        break
      case 'response':
        filtered = filtered.sort((a, b) => {
          const aTime = parseInt(a.responseTime)
          const bTime = parseInt(b.responseTime)
          return aTime - bTime
        })
        break
    }

    setFilteredProfessionals(filtered)
  }, [searchTerm, selectedSpecialty, selectedLocation, sortBy])

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
              <Users className="w-4 h-4 text-secondary-400" />
              <span>Marketplace de Talentos</span>
            </div>
            
            <h1 className="heading-xl mb-6">
              Encontre os Melhores
              <span className="text-gradient-accent block">Profissionais de Motion Graphics</span>
            </h1>
            
            <p className="body-lg text-primary-200 max-w-3xl mx-auto mb-8">
              Conecte-se com motion designers, editores e animadores talentosos. 
              Profissionais verificados, portfólios completos e avaliações reais.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <Input
                variant="search"
                placeholder="Buscar profissionais, habilidades ou especialidades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search className="w-5 h-5" />}
                className="bg-white/90 backdrop-blur-sm border-white/30 text-primary-900 placeholder:text-primary-500"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-modern">
          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-white rounded-2xl shadow-soft border border-primary-100 p-2">
                <TabsTrigger 
                  value="professionals" 
                  className="rounded-xl data-[state=active]:bg-button-gradient data-[state=active]:text-white"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Profissionais ({filteredProfessionals.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="jobs" 
                  className="rounded-xl data-[state=active]:bg-button-gradient data-[state=active]:text-white"
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Vagas ({jobs.length})
                </TabsTrigger>
              </TabsList>

              {/* Professionals Tab */}
              <TabsContent value="professionals" className="space-y-8">
                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-soft border border-primary-100 p-6">
                  <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                      <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                        <SelectTrigger className="w-full sm:w-48">
                          <SelectValue placeholder="Especialidade" />
                        </SelectTrigger>
                        <SelectContent>
                          {specialties.map((specialty) => (
                            <SelectItem key={specialty.id} value={specialty.id}>
                              {specialty.name} ({specialty.count})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger className="w-full sm:w-48">
                          <SelectValue placeholder="Localização" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location.id} value={location.id}>
                              {location.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full sm:w-48">
                          <SelectValue placeholder="Ordenar por" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rating">Melhor Avaliação</SelectItem>
                          <SelectItem value="price-low">Menor Preço</SelectItem>
                          <SelectItem value="price-high">Maior Preço</SelectItem>
                          <SelectItem value="projects">Mais Projetos</SelectItem>
                          <SelectItem value="response">Resposta Rápida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="text-sm text-primary-600">
                      {filteredProfessionals.length} profissionais encontrados
                    </div>
                  </div>
                </div>

                {/* Professionals Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {filteredProfessionals.map((professional, index) => (
                    <motion.div
                      key={professional.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                    >
                      <ModernCard variant="profile" className="group">
                        {/* Cover Image */}
                        <div className="relative h-32 -m-6 mb-6 overflow-hidden rounded-t-2xl">
                          <Image
                            src={professional.coverImage}
                            alt={`${professional.name} portfolio`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          
                          {/* Badges */}
                          <div className="absolute top-4 left-4 flex gap-2">
                            {professional.featured && (
                              <Badge variant="gradient" className="text-xs">
                                <Award className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                            {professional.verified && (
                              <Badge variant="success" className="text-xs">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verificado
                              </Badge>
                            )}
                          </div>

                          {/* Status */}
                          <div className="absolute top-4 right-4">
                            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
                              professional.available 
                                ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                                : 'bg-red-500/20 text-red-300 border border-red-500/30'
                            }`}>
                              <div className={`w-2 h-2 rounded-full ${
                                professional.available ? 'bg-green-400' : 'bg-red-400'
                              }`}></div>
                              {professional.available ? 'Disponível' : 'Ocupado'}
                            </div>
                          </div>
                        </div>

                        {/* Profile Info */}
                        <div className="flex items-start space-x-4 mb-6">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-medium">
                              <Image
                                src={professional.avatar}
                                alt={professional.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            {professional.verified && (
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                                <CheckCircle className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-primary-900 mb-1">
                              {professional.name}
                            </h3>
                            <p className="text-secondary-600 font-medium mb-2">
                              {professional.title}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-primary-500">
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{professional.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>Responde em {professional.responseTime}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col items-end space-y-2">
                            <Button size="sm" variant="ghost">
                              <Heart className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="text-center">
                            <div className="flex items-center justify-center space-x-1 mb-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="font-semibold text-primary-900">{professional.rating}</span>
                            </div>
                            <p className="text-xs text-primary-500">{professional.reviews} reviews</p>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-primary-900 mb-1">
                              R$ {professional.hourlyRate}/h
                            </div>
                            <p className="text-xs text-primary-500">Valor/hora</p>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-primary-900 mb-1">
                              {professional.completedProjects}
                            </div>
                            <p className="text-xs text-primary-500">Projetos</p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-primary-600 text-sm mb-6 line-clamp-3">
                          {professional.description}
                        </p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {professional.skills.slice(0, 4).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {professional.skills.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{professional.skills.length - 4} mais
                            </Badge>
                          )}
                        </div>

                        {/* Portfolio Preview */}
                        <div className="grid grid-cols-3 gap-2 mb-6">
                          {professional.portfolio.slice(0, 3).map((image, idx) => (
                            <div key={idx} className="relative aspect-video rounded-lg overflow-hidden">
                              <Image
                                src={image}
                                alt={`Portfolio ${idx + 1}`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <Play className="w-6 h-6 text-white" />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-3">
                          <Button className="flex-1">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Contatar
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Perfil
                          </Button>
                        </div>
                      </ModernCard>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Jobs Tab */}
              <TabsContent value="jobs" className="space-y-8">
                <div className="space-y-6">
                  {jobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                    >
                      <ModernCard className="p-8">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                          <div className="flex-1">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <div className="flex items-center space-x-3 mb-2">
                                  <h3 className="text-xl font-semibold text-primary-900">
                                    {job.title}
                                  </h3>
                                  {job.urgent && (
                                    <Badge variant="warning" className="text-xs">
                                      <Zap className="w-3 h-3 mr-1" />
                                      Urgente
                                    </Badge>
                                  )}
                                  {job.featured && (
                                    <Badge variant="gradient" className="text-xs">
                                      <TrendingUp className="w-3 h-3 mr-1" />
                                      Featured
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-secondary-600 font-medium mb-2">{job.company}</p>
                              </div>
                            </div>

                            {/* Job Info */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-primary-500 mb-4">
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Briefcase className="w-4 h-4" />
                                <span>{job.type}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <DollarSign className="w-4 h-4" />
                                <span>{job.budget}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{job.duration}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>{job.posted}</span>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-primary-600 mb-4">
                              {job.description}
                            </p>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {job.skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>

                            {/* Proposals */}
                            <div className="text-sm text-primary-500">
                              {job.proposals} propostas recebidas
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col space-y-3 lg:w-48">
                            <Button className="w-full">
                              Enviar Proposta
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Heart className="w-4 h-4 mr-2" />
                              Salvar Vaga
                            </Button>
                          </div>
                        </div>
                      </ModernCard>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
