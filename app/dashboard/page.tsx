
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Download, 
  Heart, 
  ShoppingCart, 
  TrendingUp, 
  Star,
  Play,
  Eye,
  Calendar,
  DollarSign,
  Users,
  Award,
  Bell,
  Settings,
  Plus,
  Filter,
  Search
} from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ModernCard } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const stats = [
  {
    icon: Download,
    title: 'Downloads',
    value: '24',
    change: '+12%',
    color: 'from-secondary-500 to-blue-600'
  },
  {
    icon: Heart,
    title: 'Favoritos',
    value: '18',
    change: '+5%',
    color: 'from-pink-500 to-rose-600'
  },
  {
    icon: ShoppingCart,
    title: 'Compras',
    value: 'R$ 1.240',
    change: '+28%',
    color: 'from-accent-500 to-emerald-600'
  },
  {
    icon: TrendingUp,
    title: 'Economia',
    value: 'R$ 890',
    change: '+15%',
    color: 'from-warning-500 to-orange-600'
  }
]

const recentDownloads = [
  {
    id: 1,
    title: 'Broadcast News Lower Thirds',
    category: 'Lower Thirds',
    downloadDate: '2024-01-15',
    price: 89,
    rating: 4.9,
    image: '/api/placeholder/300/200'
  },
  {
    id: 2,
    title: 'Cinematic Title Sequences',
    category: 'Títulos',
    downloadDate: '2024-01-12',
    price: 119,
    rating: 5.0,
    image: '/api/placeholder/300/200'
  },
  {
    id: 3,
    title: 'Modern Transitions Pack',
    category: 'Transições',
    downloadDate: '2024-01-10',
    price: 69,
    rating: 4.8,
    image: '/api/placeholder/300/200'
  }
]

const favorites = [
  {
    id: 1,
    title: 'Corporate Logo Reveals',
    category: 'Logo Reveals',
    price: 79,
    rating: 4.7,
    image: '/api/placeholder/300/200'
  },
  {
    id: 2,
    title: 'Social Media Pack',
    category: 'Elementos',
    price: 49,
    rating: 4.6,
    image: '/api/placeholder/300/200'
  }
]

const recommendations = [
  {
    id: 1,
    title: 'Particle Backgrounds',
    category: 'Backgrounds',
    price: 59,
    originalPrice: 89,
    rating: 4.9,
    image: '/api/placeholder/300/200',
    trending: true
  },
  {
    id: 2,
    title: 'Sports Graphics Package',
    category: 'Pacote Completo',
    price: 149,
    originalPrice: 199,
    rating: 4.8,
    image: '/api/placeholder/300/200',
    new: true
  }
]

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-secondary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-primary-600">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container-modern">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h1 className="heading-lg text-primary-900 mb-4">
                  Bem-vindo de volta, <span className="text-gradient">{session.user?.name?.split(' ')[0]}</span>!
                </h1>
                <p className="body-lg text-primary-600">
                  Aqui está um resumo da sua atividade e novidades para você.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="outline">
                  <Bell className="w-4 h-4 mr-2" />
                  Notificações
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Explorar Templates
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {stats.map((stat, index) => (
              <ModernCard key={stat.title} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="success" className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-primary-900 mb-1">{stat.value}</h3>
                <p className="text-primary-600 text-sm">{stat.title}</p>
              </ModernCard>
            ))}
          </motion.div>

          {/* Main Content Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-white rounded-2xl shadow-soft border border-primary-100 p-2">
                <TabsTrigger 
                  value="overview" 
                  className="rounded-xl data-[state=active]:bg-button-gradient data-[state=active]:text-white"
                >
                  Visão Geral
                </TabsTrigger>
                <TabsTrigger 
                  value="downloads" 
                  className="rounded-xl data-[state=active]:bg-button-gradient data-[state=active]:text-white"
                >
                  Downloads
                </TabsTrigger>
                <TabsTrigger 
                  value="favorites" 
                  className="rounded-xl data-[state=active]:bg-button-gradient data-[state=active]:text-white"
                >
                  Favoritos
                </TabsTrigger>
                <TabsTrigger 
                  value="settings" 
                  className="rounded-xl data-[state=active]:bg-button-gradient data-[state=active]:text-white"
                >
                  Configurações
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                {/* Recent Downloads */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="heading-md text-primary-900">Downloads Recentes</h2>
                    <div className="flex gap-2">
                      <Link href="/dashboard/downloads">
                        <Button variant="ghost">Ver Todos</Button>
                      </Link>
                      <Link href="/dashboard/history">
                        <Button variant="ghost">Histórico de Compras</Button>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentDownloads.map((item) => (
                      <ModernCard key={item.id} variant="product" className="group">
                        <div className="relative aspect-video overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                            <Play className="w-12 h-12 text-primary-400" />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30">
                                <Download className="w-4 h-4 mr-2" />
                                Baixar Novamente
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{item.rating}</span>
                            </div>
                          </div>
                          
                          <h3 className="font-semibold text-primary-900 mb-2">{item.title}</h3>
                          
                          <div className="flex items-center justify-between text-sm text-primary-500">
                            <span>Baixado em {new Date(item.downloadDate).toLocaleDateString('pt-BR')}</span>
                            <span className="font-medium text-primary-900">R$ {item.price}</span>
                          </div>
                        </div>
                      </ModernCard>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="heading-md text-primary-900">Recomendado para Você</h2>
                    <Button variant="ghost">Ver Mais</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recommendations.map((item) => (
                      <ModernCard key={item.id} variant="product" className="group">
                        <div className="relative aspect-video overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                            <Play className="w-12 h-12 text-primary-400" />
                          </div>
                          
                          <div className="absolute top-4 left-4 flex gap-2">
                            {item.trending && (
                              <Badge variant="warning" className="text-xs">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                            {item.new && (
                              <Badge variant="success" className="text-xs">
                                Novo
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{item.rating}</span>
                            </div>
                          </div>
                          
                          <h3 className="font-semibold text-primary-900 mb-4">{item.title}</h3>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-primary-900">R$ {item.price}</span>
                              {item.originalPrice > item.price && (
                                <span className="text-sm text-primary-500 line-through">R$ {item.originalPrice}</span>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Heart className="w-4 h-4" />
                              </Button>
                              <Button size="sm">
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Comprar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </ModernCard>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Downloads Tab */}
              <TabsContent value="downloads" className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex-1 max-w-md">
                    <Input
                      placeholder="Buscar nos seus downloads..."
                      icon={<Search className="w-4 h-4" />}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link href="/dashboard/downloads">
                      <Button variant="outline" size="sm">
                        Ver Todos os Downloads
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtros
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      Data
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentDownloads.map((item) => (
                    <ModernCard key={item.id} variant="product" className="group">
                      <div className="relative aspect-video overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                          <Play className="w-12 h-12 text-primary-400" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30">
                              <Download className="w-4 h-4 mr-2" />
                              Baixar
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{item.rating}</span>
                          </div>
                        </div>
                        
                        <h3 className="font-semibold text-primary-900 mb-2">{item.title}</h3>
                        
                        <div className="flex items-center justify-between text-sm text-primary-500 mb-4">
                          <span>Baixado em {new Date(item.downloadDate).toLocaleDateString('pt-BR')}</span>
                          <span className="font-medium text-primary-900">R$ {item.price}</span>
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1">
                            <Download className="w-4 h-4 mr-2" />
                            Baixar
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </ModernCard>
                  ))}
                </div>
              </TabsContent>

              {/* Favorites Tab */}
              <TabsContent value="favorites" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="heading-md text-primary-900">Seus Favoritos</h2>
                  <div className="flex items-center gap-4">
                    <p className="text-primary-600">{favorites.length} templates salvos</p>
                    <Link href="/dashboard/favorites">
                      <Button variant="outline" size="sm">
                        Ver Todos os Favoritos
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((item) => (
                    <ModernCard key={item.id} variant="product" className="group">
                      <div className="relative aspect-video overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                          <Play className="w-12 h-12 text-primary-400" />
                        </div>
                        <div className="absolute top-4 right-4">
                          <Button size="sm" variant="ghost" className="w-8 h-8 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30">
                            <Heart className="w-4 h-4 fill-current text-red-500" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{item.rating}</span>
                          </div>
                        </div>
                        
                        <h3 className="font-semibold text-primary-900 mb-4">{item.title}</h3>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-primary-900">R$ {item.price}</span>
                          <Button size="sm">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Comprar
                          </Button>
                        </div>
                      </div>
                    </ModernCard>
                  ))}
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-8">
                <div>
                  <h2 className="heading-md text-primary-900 mb-6">Configurações da Conta</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ModernCard className="p-6">
                      <h3 className="text-lg font-semibold text-primary-900 mb-4">Informações Pessoais</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-primary-700 mb-2">Nome</label>
                          <Input value={session.user?.name || ''} disabled />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-primary-700 mb-2">E-mail</label>
                          <Input value={session.user?.email || ''} disabled />
                        </div>
                        <Link href="/dashboard/settings">
                          <Button className="w-full">
                            <Settings className="w-4 h-4 mr-2" />
                            Gerenciar Configurações
                          </Button>
                        </Link>
                      </div>
                    </ModernCard>

                    <ModernCard className="p-6">
                      <h3 className="text-lg font-semibold text-primary-900 mb-4">Acesso Rápido</h3>
                      <div className="space-y-3">
                        <Link href="/dashboard/settings" className="block">
                          <Button variant="outline" className="w-full justify-start">
                            <Settings className="w-4 h-4 mr-2" />
                            Configurações Completas
                          </Button>
                        </Link>
                        <Link href="/dashboard/history" className="block">
                          <Button variant="outline" className="w-full justify-start">
                            <Calendar className="w-4 h-4 mr-2" />
                            Histórico de Compras
                          </Button>
                        </Link>
                        <Link href="/dashboard/downloads" className="block">
                          <Button variant="outline" className="w-full justify-start">
                            <Download className="w-4 h-4 mr-2" />
                            Meus Downloads
                          </Button>
                        </Link>
                        <Link href="/dashboard/favorites" className="block">
                          <Button variant="outline" className="w-full justify-start">
                            <Heart className="w-4 h-4 mr-2" />
                            Favoritos
                          </Button>
                        </Link>
                      </div>
                    </ModernCard>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
