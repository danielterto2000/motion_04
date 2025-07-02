
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft,
  Download,
  Eye,
  Filter,
  Search,
  Star,
  Calendar,
  FolderOpen,
  Play,
  Grid3X3,
  List,
  SortAsc,
  SortDesc
} from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ModernCard } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

const downloads = [
  {
    id: 1,
    title: 'Broadcast News Lower Thirds',
    category: 'Lower Thirds',
    downloadDate: '2024-01-15',
    purchaseDate: '2024-01-15',
    price: 89,
    rating: 4.9,
    downloads: 3,
    fileSize: '245 MB',
    format: 'After Effects',
    image: '/api/placeholder/300/200',
    tags: ['news', 'broadcast', 'professional']
  },
  {
    id: 2,
    title: 'Cinematic Title Sequences',
    category: 'Títulos',
    downloadDate: '2024-01-14',
    purchaseDate: '2024-01-12',
    price: 119,
    rating: 5.0,
    downloads: 2,
    fileSize: '512 MB',
    format: 'After Effects + Premiere',
    image: '/api/placeholder/300/200',
    tags: ['cinematic', 'titles', 'epic']
  },
  {
    id: 3,
    title: 'Modern Transitions Pack',
    category: 'Transições',
    downloadDate: '2024-01-12',
    purchaseDate: '2024-01-12',
    price: 69,
    rating: 4.8,
    downloads: 5,
    fileSize: '156 MB',
    format: 'Premiere Pro',
    image: '/api/placeholder/300/200',
    tags: ['transitions', 'modern', 'smooth']
  },
  {
    id: 4,
    title: 'Corporate Logo Reveals',
    category: 'Logo Reveals',
    downloadDate: '2024-01-10',
    purchaseDate: '2024-01-10',
    price: 79,
    rating: 4.7,
    downloads: 1,
    fileSize: '189 MB',
    format: 'After Effects',
    image: '/api/placeholder/300/200',
    tags: ['logo', 'corporate', 'reveal']
  }
]

export default function DownloadsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'category'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

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
          <p className="text-primary-600">Carregando downloads...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const categories = ['all', ...Array.from(new Set(downloads.map(d => d.category)))]

  const filteredDownloads = downloads
    .filter(download => {
      if (selectedCategory !== 'all' && download.category !== selectedCategory) return false
      if (searchTerm) {
        return download.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               download.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
               download.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      }
      return true
    })
    .sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.downloadDate).getTime() - new Date(b.downloadDate).getTime()
          break
        case 'name':
          comparison = a.title.localeCompare(b.title)
          break
        case 'category':
          comparison = a.category.localeCompare(b.category)
          break
      }
      return sortOrder === 'asc' ? comparison : -comparison
    })

  const totalDownloads = downloads.reduce((sum, d) => sum + d.downloads, 0)
  const totalSize = downloads.reduce((sum, d) => sum + parseFloat(d.fileSize), 0)

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
                  Meus <span className="text-gradient">Downloads</span>
                </h1>
                <p className="body-lg text-primary-600">
                  Acesse e baixe novamente todos os seus templates adquiridos.
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <ModernCard className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary-900 mb-1">
                    {downloads.length}
                  </div>
                  <div className="text-sm text-primary-600">Templates</div>
                </ModernCard>
                <ModernCard className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary-900 mb-1">
                    {totalDownloads}
                  </div>
                  <div className="text-sm text-primary-600">Downloads</div>
                </ModernCard>
                <ModernCard className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary-900 mb-1">
                    {totalSize.toFixed(1)} GB
                  </div>
                  <div className="text-sm text-primary-600">Tamanho</div>
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
                    placeholder="Buscar downloads..."
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
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [sort, order] = e.target.value.split('-')
                    setSortBy(sort as any)
                    setSortOrder(order as any)
                  }}
                  className="px-3 py-2 border border-primary-200 rounded-lg bg-white text-primary-700 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                >
                  <option value="date-desc">Mais recentes</option>
                  <option value="date-asc">Mais antigos</option>
                  <option value="name-asc">Nome A-Z</option>
                  <option value="name-desc">Nome Z-A</option>
                  <option value="category-asc">Categoria A-Z</option>
                </select>
                
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

          {/* Downloads Grid/List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {filteredDownloads.length === 0 ? (
              <ModernCard className="p-12 text-center">
                <FolderOpen className="w-16 h-16 text-primary-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  Nenhum download encontrado
                </h3>
                <p className="text-primary-600 mb-6">
                  {searchTerm ? 'Tente ajustar os filtros de busca.' : 'Você ainda não fez nenhum download.'}
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
                {filteredDownloads.map((download) => (
                  <ModernCard 
                    key={download.id} 
                    variant="product" 
                    className={`group ${viewMode === 'list' ? 'p-6' : ''}`}
                  >
                    {viewMode === 'grid' ? (
                      <>
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
                          <div className="absolute top-4 right-4">
                            <Badge variant="secondary" className="text-xs">
                              {download.downloads}x baixado
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary" className="text-xs">{download.category}</Badge>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{download.rating}</span>
                            </div>
                          </div>
                          
                          <h3 className="font-semibold text-primary-900 mb-2">{download.title}</h3>
                          
                          <div className="space-y-2 text-sm text-primary-500 mb-4">
                            <div className="flex items-center justify-between">
                              <span>Formato:</span>
                              <span className="font-medium">{download.format}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Tamanho:</span>
                              <span className="font-medium">{download.fileSize}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Baixado em:</span>
                              <span className="font-medium">
                                {new Date(download.downloadDate).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
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
                      </>
                    ) : (
                      <div className="flex items-center gap-6">
                        <div className="w-24 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Play className="w-6 h-6 text-primary-400" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-primary-900">{download.title}</h3>
                            <Badge variant="secondary" className="text-xs">{download.category}</Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-primary-600">
                            <span>{download.format}</span>
                            <span>{download.fileSize}</span>
                            <span>{download.downloads}x baixado</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{download.rating}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-primary-600">
                            {new Date(download.downloadDate).toLocaleDateString('pt-BR')}
                          </span>
                          <Button size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Baixar
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
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
