
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft,
  Heart,
  ShoppingCart,
  Star,
  Search,
  Filter,
  Grid3X3,
  List,
  Play,
  Eye,
  Trash2
} from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ModernCard } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

const favorites = [
  {
    id: 1,
    title: 'Corporate Logo Reveals',
    category: 'Logo Reveals',
    price: 79,
    originalPrice: 99,
    rating: 4.7,
    image: '/api/placeholder/300/200',
    addedDate: '2024-01-15',
    tags: ['logo', 'corporate', 'reveal'],
    isOnSale: true,
    discount: 20
  },
  {
    id: 2,
    title: 'Social Media Pack',
    category: 'Elementos',
    price: 49,
    rating: 4.6,
    image: '/api/placeholder/300/200',
    addedDate: '2024-01-12',
    tags: ['social', 'media', 'pack'],
    isOnSale: false
  },
  {
    id: 3,
    title: 'Particle Backgrounds',
    category: 'Backgrounds',
    price: 59,
    originalPrice: 89,
    rating: 4.9,
    image: '/api/placeholder/300/200',
    addedDate: '2024-01-10',
    tags: ['particles', 'background', 'abstract'],
    isOnSale: true,
    discount: 34
  },
  {
    id: 4,
    title: 'Sports Graphics Package',
    category: 'Pacote Completo',
    price: 149,
    originalPrice: 199,
    rating: 4.8,
    image: '/api/placeholder/300/200',
    addedDate: '2024-01-08',
    tags: ['sports', 'graphics', 'package'],
    isOnSale: true,
    discount: 25
  }
]

export default function FavoritesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedFavorites, setSelectedFavorites] = useState<number[]>([])

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
          <p className="text-primary-600">Carregando favoritos...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const categories = ['all', ...Array.from(new Set(favorites.map(f => f.category)))]

  const filteredFavorites = favorites.filter(favorite => {
    if (selectedCategory !== 'all' && favorite.category !== selectedCategory) return false
    if (searchTerm) {
      return favorite.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
             favorite.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
             favorite.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    return true
  })

  const toggleFavoriteSelection = (id: number) => {
    setSelectedFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fId => fId !== id)
        : [...prev, id]
    )
  }

  const removeFavorites = () => {
    // Implementar remoção dos favoritos selecionados
    setSelectedFavorites([])
  }

  const totalSavings = favorites
    .filter(f => f.isOnSale)
    .reduce((sum, f) => sum + (f.originalPrice ? f.originalPrice - f.price : 0), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container-modern">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar ao Dashboard
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h1 className="heading-lg text-primary-900 mb-4">
                  Meus <span className="text-gradient">Favoritos</span>
                </h1>
                <p className="body-lg text-primary-600">
                  Templates que você salvou para comprar depois.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <ModernCard className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary-900 mb-1">
                    {favorites.length}
                  </div>
                  <div className="text-sm text-primary-600">Favoritos</div>
                </ModernCard>
                <ModernCard className="p-4 text-center">
                  <div className="text-2xl font-bold text-accent-600 mb-1">
                    R$ {totalSavings}
                  </div>
                  <div className="text-sm text-primary-600">Economia</div>
                </ModernCard>
              </div>
            </div>
          </motion.div>

          {/* Filters and Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="flex-1 max-w-md">
                  <Input
                    placeholder="Buscar favoritos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={<Search className="w-4 h-4" />}
                  />
                </div>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-primary-200 rounded-lg bg-white text-primary-700 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                >
                  <option value="all">Todas as categorias</option>
                  {categories.filter(c => c !== 'all').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                {selectedFavorites.length > 0 && (
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={removeFavorites}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remover ({selectedFavorites.length})
                  </Button>
                )}
                
                <div className="flex border border-primary-200 rounded-lg bg-white">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Favorites Grid/List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {filteredFavorites.length === 0 ? (
              <ModernCard className="p-12 text-center">
                <Heart className="w-16 h-16 text-primary-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  Nenhum favorito encontrado
                </h3>
                <p className="text-primary-600 mb-6">
                  {searchTerm ? 'Tente ajustar os filtros de busca.' : 'Você ainda não salvou nenhum template.'}
                </p>
                <Link href="/marketplace">
                  <Button>
                    Explorar Templates
                  </Button>
                </Link>
              </ModernCard>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {filteredFavorites.map((favorite) => (
                  <ModernCard 
                    key={favorite.id} 
                    variant="product" 
                    className={`group relative ${viewMode === 'list' ? 'p-6' : ''}`}
                  >
                    {/* Selection Checkbox */}
                    <div className="absolute top-4 left-4 z-10">
                      <input
                        type="checkbox"
                        checked={selectedFavorites.includes(favorite.id)}
                        onChange={() => toggleFavoriteSelection(favorite.id)}
                        className="w-4 h-4 text-secondary-600 bg-white border-gray-300 rounded focus:ring-secondary-500"
                      />
                    </div>

                    {viewMode === 'grid' ? (
                      <>
                        <div className="relative aspect-video overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                            <Play className="w-12 h-12 text-primary-400" />
                          </div>
                          
                          <div className="absolute top-4 right-4 flex gap-2">
                            {favorite.isOnSale && (
                              <Badge variant="destructive" className="text-xs">
                                -{favorite.discount}%
                              </Badge>
                            )}
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="w-8 h-8 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
                            >
                              <Heart className="w-4 h-4 fill-current text-red-500" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary" className="text-xs">{favorite.category}</Badge>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{favorite.rating}</span>
                            </div>
                          </div>
                          
                          <h3 className="font-semibold text-primary-900 mb-4">{favorite.title}</h3>
                          
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-primary-900">R$ {favorite.price}</span>
                              {favorite.originalPrice && favorite.originalPrice > favorite.price && (
                                <span className="text-sm text-primary-500 line-through">R$ {favorite.originalPrice}</span>
                              )}
                            </div>
                          </div>

                          <div className="text-xs text-primary-500 mb-4">
                            Adicionado em {new Date(favorite.addedDate).toLocaleDateString('pt-BR')}
                          </div>

                          <div className="flex space-x-2">
                            <Button size="sm" className="flex-1">
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Comprar
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-6">
                        <div className="w-24 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Play className="w-6 h-6 text-primary-400" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-primary-900">{favorite.title}</h3>
                            <Badge variant="secondary" className="text-xs">{favorite.category}</Badge>
                            {favorite.isOnSale && (
                              <Badge variant="destructive" className="text-xs">
                                -{favorite.discount}%
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-primary-600">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{favorite.rating}</span>
                            </div>
                            <span>Adicionado em {new Date(favorite.addedDate).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-xl font-bold text-primary-900">R$ {favorite.price}</div>
                            {favorite.originalPrice && favorite.originalPrice > favorite.price && (
                              <div className="text-sm text-primary-500 line-through">R$ {favorite.originalPrice}</div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button size="sm">
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Comprar
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-red-500 hover:text-red-700"
                            >
                              <Heart className="w-4 h-4 fill-current" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </ModernCard>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
