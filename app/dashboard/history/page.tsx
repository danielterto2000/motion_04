
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft,
  Calendar,
  DollarSign,
  Download,
  Eye,
  Filter,
  Search,
  ShoppingCart,
  Star,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ModernCard } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

const purchaseHistory = [
  {
    id: 'PUR-001',
    date: '2024-01-15',
    items: [
      {
        title: 'Broadcast News Lower Thirds',
        category: 'Lower Thirds',
        price: 89,
        image: '/api/placeholder/300/200'
      }
    ],
    total: 89,
    status: 'completed',
    paymentMethod: 'Cartão de Crédito',
    downloadCount: 3
  },
  {
    id: 'PUR-002',
    date: '2024-01-12',
    items: [
      {
        title: 'Cinematic Title Sequences',
        category: 'Títulos',
        price: 119,
        image: '/api/placeholder/300/200'
      },
      {
        title: 'Modern Transitions Pack',
        category: 'Transições',
        price: 69,
        image: '/api/placeholder/300/200'
      }
    ],
    total: 188,
    status: 'completed',
    paymentMethod: 'PIX',
    downloadCount: 5
  },
  {
    id: 'PUR-003',
    date: '2024-01-10',
    items: [
      {
        title: 'Corporate Logo Reveals',
        category: 'Logo Reveals',
        price: 79,
        image: '/api/placeholder/300/200'
      }
    ],
    total: 79,
    status: 'pending',
    paymentMethod: 'Boleto',
    downloadCount: 0
  }
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-4 h-4 text-green-500" />
    case 'pending':
      return <Clock className="w-4 h-4 text-yellow-500" />
    case 'failed':
      return <XCircle className="w-4 h-4 text-red-500" />
    default:
      return <Clock className="w-4 h-4 text-gray-500" />
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Concluído'
    case 'pending':
      return 'Pendente'
    case 'failed':
      return 'Falhou'
    default:
      return 'Desconhecido'
  }
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'completed':
      return 'success'
    case 'pending':
      return 'warning'
    case 'failed':
      return 'destructive'
    default:
      return 'secondary'
  }
}

export default function HistoryPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

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
          <p className="text-primary-600">Carregando histórico...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const filteredHistory = purchaseHistory.filter(purchase => {
    if (activeTab === 'completed' && purchase.status !== 'completed') return false
    if (activeTab === 'pending' && purchase.status !== 'pending') return false
    if (searchTerm) {
      return purchase.items.some(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    return true
  })

  const totalSpent = purchaseHistory
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.total, 0)

  const totalPurchases = purchaseHistory.filter(p => p.status === 'completed').length

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
                  Histórico de <span className="text-gradient">Compras</span>
                </h1>
                <p className="body-lg text-primary-600">
                  Acompanhe todas as suas compras e downloads realizados.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <ModernCard className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary-900 mb-1">
                    R$ {totalSpent.toLocaleString('pt-BR')}
                  </div>
                  <div className="text-sm text-primary-600">Total Gasto</div>
                </ModernCard>
                <ModernCard className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary-900 mb-1">
                    {totalPurchases}
                  </div>
                  <div className="text-sm text-primary-600">Compras</div>
                </ModernCard>
              </div>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Buscar compras..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={<Search className="w-4 h-4" />}
                />
              </div>
              <div className="flex items-center space-x-2">
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
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-white rounded-2xl shadow-soft border border-primary-100 p-2">
                <TabsTrigger 
                  value="all" 
                  className="rounded-xl data-[state=active]:bg-button-gradient data-[state=active]:text-white"
                >
                  Todas ({purchaseHistory.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="completed" 
                  className="rounded-xl data-[state=active]:bg-button-gradient data-[state=active]:text-white"
                >
                  Concluídas ({purchaseHistory.filter(p => p.status === 'completed').length})
                </TabsTrigger>
                <TabsTrigger 
                  value="pending" 
                  className="rounded-xl data-[state=active]:bg-button-gradient data-[state=active]:text-white"
                >
                  Pendentes ({purchaseHistory.filter(p => p.status === 'pending').length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-6">
                {filteredHistory.length === 0 ? (
                  <ModernCard className="p-12 text-center">
                    <ShoppingCart className="w-16 h-16 text-primary-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-primary-900 mb-2">
                      Nenhuma compra encontrada
                    </h3>
                    <p className="text-primary-600 mb-6">
                      {searchTerm ? 'Tente ajustar os filtros de busca.' : 'Você ainda não fez nenhuma compra.'}
                    </p>
                    <Link href="/marketplace">
                      <Button>
                        Explorar Templates
                      </Button>
                    </Link>
                  </ModernCard>
                ) : (
                  <div className="space-y-6">
                    {filteredHistory.map((purchase) => (
                      <ModernCard key={purchase.id} className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                          {/* Purchase Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                              <div>
                                <h3 className="text-lg font-semibold text-primary-900">
                                  Pedido #{purchase.id}
                                </h3>
                                <div className="flex items-center gap-4 text-sm text-primary-600">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(purchase.date).toLocaleDateString('pt-BR')}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <DollarSign className="w-4 h-4" />
                                    {purchase.paymentMethod}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Download className="w-4 h-4" />
                                    {purchase.downloadCount} downloads
                                  </span>
                                </div>
                              </div>
                              <Badge variant={getStatusVariant(purchase.status)} className="flex items-center gap-1">
                                {getStatusIcon(purchase.status)}
                                {getStatusText(purchase.status)}
                              </Badge>
                            </div>

                            {/* Items */}
                            <div className="space-y-3">
                              {purchase.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-3 bg-primary-50 rounded-lg">
                                  <div className="w-16 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Eye className="w-6 h-6 text-primary-400" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium text-primary-900">{item.title}</h4>
                                    <p className="text-sm text-primary-600">{item.category}</p>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-semibold text-primary-900">
                                      R$ {item.price}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-3 lg:w-48">
                            <div className="text-right lg:text-center">
                              <div className="text-2xl font-bold text-primary-900">
                                R$ {purchase.total}
                              </div>
                              <div className="text-sm text-primary-600">Total</div>
                            </div>
                            
                            {purchase.status === 'completed' && (
                              <div className="flex gap-2">
                                <Button size="sm" className="flex-1">
                                  <Download className="w-4 h-4 mr-2" />
                                  Baixar
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                            
                            {purchase.status === 'pending' && (
                              <Button size="sm" variant="outline" className="w-full">
                                <Clock className="w-4 h-4 mr-2" />
                                Aguardando Pagamento
                              </Button>
                            )}
                          </div>
                        </div>
                      </ModernCard>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
