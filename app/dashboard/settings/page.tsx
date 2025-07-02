
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft,
  User,
  Bell,
  Shield,
  CreditCard,
  Download,
  Eye,
  EyeOff,
  Save,
  Trash2,
  AlertTriangle
} from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ModernCard } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Form states
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: ''
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    weeklyNewsletter: true,
    specialOffers: false,
    downloadNotifications: true,
    securityAlerts: true
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'private',
    showPurchaseHistory: false,
    allowDataCollection: true
  })

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
    } else {
      // Carregar dados do usuário
      setProfileData({
        name: session.user?.name || '',
        email: session.user?.email || '',
        phone: '',
        company: '',
        website: ''
      })
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-secondary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-primary-600">Carregando configurações...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro ao atualizar",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Senhas não coincidem",
        description: "A nova senha e confirmação devem ser iguais.",
        variant: "destructive",
      })
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Senha muito fraca",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      
      toast({
        title: "Senha atualizada!",
        description: "Sua senha foi alterada com sucesso.",
      })
    } catch (error) {
      toast({
        title: "Erro ao alterar senha",
        description: "Verifique sua senha atual e tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNotificationUpdate = async () => {
    setIsLoading(true)

    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      toast({
        title: "Notificações atualizadas!",
        description: "Suas preferências foram salvas.",
      })
    } catch (error) {
      toast({
        title: "Erro ao atualizar",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      return
    }

    setIsLoading(true)

    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Conta excluída",
        description: "Sua conta foi excluída com sucesso.",
      })
      
      // Redirecionar para home
      router.push('/')
    } catch (error) {
      toast({
        title: "Erro ao excluir conta",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

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
            
            <div>
              <h1 className="heading-lg text-primary-900 mb-4">
                <span className="text-gradient">Configurações</span> da Conta
              </h1>
              <p className="body-lg text-primary-600">
                Gerencie suas informações pessoais, preferências e configurações de segurança.
              </p>
            </div>
          </motion.div>

          {/* Settings Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 bg-white rounded-2xl shadow-soft border border-primary-100 p-2">
                <TabsTrigger 
                  value="profile" 
                  className="rounded-xl data-[state=active]:bg-button-gradient data-[state=active]:text-white"
                >
                  <User className="w-4 h-4 mr-2" />
                  Perfil
                </TabsTrigger>
                <TabsTrigger 
                  value="security" 
                  className="rounded-xl data-[state=active]:bg-button-gradient data-[state=active]:text-white"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Segurança
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="rounded-xl data-[state=active]:bg-button-gradient data-[state=active]:text-white"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Notificações
                </TabsTrigger>
                <TabsTrigger 
                  value="privacy" 
                  className="rounded-xl data-[state=active]:bg-button-gradient data-[state=active]:text-white"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Privacidade
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <ModernCard className="p-6">
                  <h3 className="text-lg font-semibold text-primary-900 mb-6">Informações Pessoais</h3>
                  
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">Empresa</Label>
                        <Input
                          id="company"
                          value={profileData.company}
                          onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                          placeholder="Nome da empresa"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                        placeholder="https://seusite.com"
                      />
                    </div>

                    <Button type="submit" disabled={isLoading}>
                      <Save className="w-4 h-4 mr-2" />
                      {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                    </Button>
                  </form>
                </ModernCard>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <ModernCard className="p-6">
                  <h3 className="text-lg font-semibold text-primary-900 mb-6">Alterar Senha</h3>
                  
                  <form onSubmit={handlePasswordUpdate} className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Senha Atual</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                          placeholder="Sua senha atual"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                          {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="newPassword">Nova Senha</Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showNewPassword ? 'text' : 'password'}
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                            placeholder="Nova senha"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                          >
                            {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                            placeholder="Confirme a nova senha"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" disabled={isLoading}>
                      <Shield className="w-4 h-4 mr-2" />
                      {isLoading ? 'Alterando...' : 'Alterar Senha'}
                    </Button>
                  </form>
                </ModernCard>

                <ModernCard className="p-6 border-red-200 bg-red-50">
                  <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Zona de Perigo
                  </h3>
                  <p className="text-red-700 mb-4">
                    Excluir sua conta removerá permanentemente todos os seus dados, compras e downloads. Esta ação não pode ser desfeita.
                  </p>
                  <Button 
                    variant="destructive" 
                    onClick={handleDeleteAccount}
                    disabled={isLoading}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir Conta
                  </Button>
                </ModernCard>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <ModernCard className="p-6">
                  <h3 className="text-lg font-semibold text-primary-900 mb-6">Preferências de Notificação</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-primary-900">Notificações por E-mail</h4>
                        <p className="text-sm text-primary-600">Receba atualizações importantes por e-mail</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.emailNotifications}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          emailNotifications: e.target.checked
                        })}
                        className="w-4 h-4 text-secondary-600 bg-gray-100 border-gray-300 rounded focus:ring-secondary-500"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-primary-900">Newsletter Semanal</h4>
                        <p className="text-sm text-primary-600">Novos templates e dicas semanais</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.weeklyNewsletter}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          weeklyNewsletter: e.target.checked
                        })}
                        className="w-4 h-4 text-secondary-600 bg-gray-100 border-gray-300 rounded focus:ring-secondary-500"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-primary-900">Ofertas Especiais</h4>
                        <p className="text-sm text-primary-600">Promoções e descontos exclusivos</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.specialOffers}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          specialOffers: e.target.checked
                        })}
                        className="w-4 h-4 text-secondary-600 bg-gray-100 border-gray-300 rounded focus:ring-secondary-500"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-primary-900">Notificações de Download</h4>
                        <p className="text-sm text-primary-600">Confirmações de download e atualizações</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.downloadNotifications}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          downloadNotifications: e.target.checked
                        })}
                        className="w-4 h-4 text-secondary-600 bg-gray-100 border-gray-300 rounded focus:ring-secondary-500"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-primary-900">Alertas de Segurança</h4>
                        <p className="text-sm text-primary-600">Notificações sobre atividade da conta</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.securityAlerts}
                        onChange={(e) => setNotificationSettings({
                          ...notificationSettings,
                          securityAlerts: e.target.checked
                        })}
                        className="w-4 h-4 text-secondary-600 bg-gray-100 border-gray-300 rounded focus:ring-secondary-500"
                      />
                    </div>
                  </div>

                  <Button onClick={handleNotificationUpdate} disabled={isLoading} className="mt-6">
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? 'Salvando...' : 'Salvar Preferências'}
                  </Button>
                </ModernCard>
              </TabsContent>

              {/* Privacy Tab */}
              <TabsContent value="privacy" className="space-y-6">
                <ModernCard className="p-6">
                  <h3 className="text-lg font-semibold text-primary-900 mb-6">Configurações de Privacidade</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-primary-900 mb-2">Visibilidade do Perfil</h4>
                      <select
                        value={privacySettings.profileVisibility}
                        onChange={(e) => setPrivacySettings({
                          ...privacySettings,
                          profileVisibility: e.target.value
                        })}
                        className="w-full px-3 py-2 border border-primary-200 rounded-lg bg-white text-primary-700 focus:outline-none focus:ring-2 focus:ring-secondary-500"
                      >
                        <option value="private">Privado</option>
                        <option value="public">Público</option>
                        <option value="friends">Apenas Amigos</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-primary-900">Mostrar Histórico de Compras</h4>
                        <p className="text-sm text-primary-600">Permitir que outros vejam seus templates comprados</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={privacySettings.showPurchaseHistory}
                        onChange={(e) => setPrivacySettings({
                          ...privacySettings,
                          showPurchaseHistory: e.target.checked
                        })}
                        className="w-4 h-4 text-secondary-600 bg-gray-100 border-gray-300 rounded focus:ring-secondary-500"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-primary-900">Permitir Coleta de Dados</h4>
                        <p className="text-sm text-primary-600">Ajudar a melhorar a plataforma com dados anônimos</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={privacySettings.allowDataCollection}
                        onChange={(e) => setPrivacySettings({
                          ...privacySettings,
                          allowDataCollection: e.target.checked
                        })}
                        className="w-4 h-4 text-secondary-600 bg-gray-100 border-gray-300 rounded focus:ring-secondary-500"
                      />
                    </div>
                  </div>

                  <Button onClick={handleNotificationUpdate} disabled={isLoading} className="mt-6">
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? 'Salvando...' : 'Salvar Configurações'}
                  </Button>
                </ModernCard>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
