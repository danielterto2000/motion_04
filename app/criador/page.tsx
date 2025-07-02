
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Upload, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Award, 
  CheckCircle,
  Star,
  Download,
  Zap,
  Play,
  ArrowRight,
  FileText,
  Shield,
  Headphones,
  Globe
} from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ModernCard } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const benefits = [
  {
    icon: DollarSign,
    title: 'Ganhe até 70% por venda',
    description: 'Uma das maiores comissões do mercado. Quanto mais você vende, mais você ganha.',
    color: 'from-accent-500 to-emerald-600'
  },
  {
    icon: Users,
    title: 'Audiência Global',
    description: 'Acesso a milhares de compradores ativos em todo o Brasil e América Latina.',
    color: 'from-secondary-500 to-blue-600'
  },
  {
    icon: TrendingUp,
    title: 'Marketing Gratuito',
    description: 'Promovemos seus templates em nossas redes sociais e campanhas pagas.',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    icon: Shield,
    title: 'Proteção Total',
    description: 'Seus templates são protegidos contra pirataria com nossa tecnologia avançada.',
    color: 'from-warning-500 to-orange-600'
  },
  {
    icon: Headphones,
    title: 'Suporte Dedicado',
    description: 'Equipe especializada para ajudar você a maximizar suas vendas.',
    color: 'from-pink-500 to-rose-600'
  },
  {
    icon: Globe,
    title: 'Alcance Internacional',
    description: 'Seus templates podem ser vendidos para clientes em diversos países.',
    color: 'from-cyan-500 to-teal-600'
  }
]

const stats = [
  { number: 'R$ 15.000', label: 'Ganho médio mensal', icon: DollarSign },
  { number: '2.8K+', label: 'Criadores ativos', icon: Users },
  { number: '98%', label: 'Taxa de aprovação', icon: CheckCircle },
  { number: '24h', label: 'Tempo de análise', icon: Zap }
]

const successStories = [
  {
    name: 'Carlos Mendes',
    role: 'Motion Designer',
    avatar: 'https://i.pinimg.com/736x/9c/4e/0d/9c4e0d984a09b623a811df41ad90c1bd.jpg',
    earnings: 'R$ 25.000/mês',
    templates: 47,
    rating: 4.9,
    quote: 'Em 6 meses na plataforma já consegui triplicar minha renda. A qualidade dos compradores é excepcional.',
    specialty: 'Broadcast Graphics'
  },
  {
    name: 'Ana Silva',
    role: 'Creative Director',
    avatar: 'https://i.pinimg.com/736x/c5/2c/c1/c52cc1529e92ccffaf3d883852361937.jpg',
    earnings: 'R$ 18.500/mês',
    templates: 32,
    rating: 5.0,
    quote: 'A Broadcast Motion me deu a liberdade financeira que sempre busquei. Recomendo para todos os criadores.',
    specialty: 'Logo Animations'
  },
  {
    name: 'Roberto Santos',
    role: 'Freelance Animator',
    avatar: 'https://i.ytimg.com/vi/lTKuiCWNJew/maxresdefault.jpg',
    earnings: 'R$ 12.800/mês',
    templates: 28,
    rating: 4.8,
    quote: 'Nunca pensei que seria possível viver apenas vendendo templates. A plataforma mudou minha vida.',
    specialty: 'Character Animation'
  }
]

const requirements = [
  'Qualidade profissional (4K mínimo)',
  'Compatibilidade com After Effects CC 2020+',
  'Documentação completa incluída',
  'Preview em alta qualidade',
  'Arquivos organizados e nomeados',
  'Licença comercial própria'
]

export default function CriadorPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    portfolio: '',
    experience: '',
    specialty: '',
    description: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
                <Award className="w-4 h-4 text-secondary-400" />
                <span>Seja um Criador</span>
              </div>
              
              <h1 className="heading-xl mb-6">
                Transforme seu talento em
                <span className="text-gradient-accent block">renda recorrente</span>
              </h1>
              
              <p className="body-lg text-primary-200 mb-8 max-w-lg">
                Junte-se a milhares de criadores que já descobriram como monetizar 
                seus templates de motion graphics na maior plataforma do Brasil.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.slice(0, 2).map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3 border border-white/20">
                      <stat.icon className="w-6 h-6 text-secondary-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-sm text-primary-300">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="btn-primary text-lg px-8 py-4 h-auto">
                  <Upload className="w-5 h-5 mr-2" />
                  Começar Agora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" className="text-white border-white/30 hover:bg-white/10 text-lg px-8 py-4 h-auto">
                  <Play className="w-5 h-5 mr-2" />
                  Ver Como Funciona
                </Button>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-large">
                <Image
                  src="https://i.ytimg.com/vi/Q500H24UspY/maxresdefault.jpg"
                  alt="Criador de Motion Graphics"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating Stats */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-large border border-white/20"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent-500 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary-900">R$ 15K+</div>
                    <div className="text-sm text-primary-600">Ganho médio</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-large border border-white/20"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary-500 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary-900">2.8K+</div>
                    <div className="text-sm text-primary-600">Criadores</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-section-alt">
        <div className="container-modern">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-primary-900 mb-6">
              Por que escolher a
              <span className="text-gradient block">Broadcast Motion?</span>
            </h2>
            <p className="body-lg text-primary-600 max-w-3xl mx-auto">
              Oferecemos as melhores condições do mercado para criadores de motion graphics. 
              Sua criatividade merece ser recompensada adequadamente.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <ModernCard variant="feature">
                  <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="heading-sm text-primary-900 mb-4">{benefit.title}</h3>
                  <p className="body-md text-primary-600">{benefit.description}</p>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section-padding">
        <div className="container-modern">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="heading-lg text-primary-900 mb-6">
              Histórias de
              <span className="text-gradient block">sucesso reais</span>
            </h2>
            <p className="body-lg text-primary-600 max-w-3xl mx-auto">
              Conheça criadores que transformaram suas carreiras e alcançaram 
              a independência financeira vendendo templates conosco.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <ModernCard className="text-center">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <Image
                      src={story.avatar}
                      alt={story.name}
                      fill
                      className="object-cover rounded-full"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-primary-900 mb-2">{story.name}</h3>
                  <p className="text-secondary-600 font-medium mb-4">{story.role}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-lg font-bold text-accent-600">{story.earnings}</div>
                      <div className="text-xs text-primary-500">Ganho mensal</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-secondary-600">{story.templates}</div>
                      <div className="text-xs text-primary-500">Templates</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-lg font-bold text-primary-900">{story.rating}</span>
                      </div>
                      <div className="text-xs text-primary-500">Avaliação</div>
                    </div>
                  </div>

                  <blockquote className="text-primary-600 italic mb-4">
                    "{story.quote}"
                  </blockquote>

                  <Badge variant="secondary" className="text-xs">
                    {story.specialty}
                  </Badge>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="section-padding bg-section-alt">
        <div className="container-modern">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-lg text-primary-900 mb-6">
                Requisitos para
                <span className="text-gradient block">aprovação</span>
              </h2>
              <p className="body-lg text-primary-600 mb-8">
                Mantemos padrões altos de qualidade para garantir a melhor experiência 
                para nossos compradores e o sucesso dos nossos criadores.
              </p>

              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <motion.div
                    key={requirement}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-primary-700">{requirement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <ModernCard className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-primary-900 mb-2">
                    Processo Simples
                  </h3>
                  <p className="text-primary-600">
                    Análise em até 24 horas com feedback detalhado
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-600 font-semibold text-sm">
                      1
                    </div>
                    <span className="text-primary-700">Envie seu portfólio</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-600 font-semibold text-sm">
                      2
                    </div>
                    <span className="text-primary-700">Análise da nossa equipe</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-600 font-semibold text-sm">
                      3
                    </div>
                    <span className="text-primary-700">Aprovação e onboarding</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-primary-700 font-medium">Comece a vender!</span>
                  </div>
                </div>
              </ModernCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-padding">
        <div className="container-modern">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="heading-lg text-primary-900 mb-6">
                Pronto para começar?
              </h2>
              <p className="body-lg text-primary-600">
                Preencha o formulário abaixo e nossa equipe entrará em contato em até 24 horas.
              </p>
            </div>

            <ModernCard className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="portfolio">Link do Portfólio *</Label>
                  <Input
                    id="portfolio"
                    value={formData.portfolio}
                    onChange={(e) => handleInputChange('portfolio', e.target.value)}
                    placeholder="https://seuportfolio.com"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="experience">Experiência</Label>
                    <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione sua experiência" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 anos</SelectItem>
                        <SelectItem value="3-5">3-5 anos</SelectItem>
                        <SelectItem value="5-10">5-10 anos</SelectItem>
                        <SelectItem value="10+">Mais de 10 anos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="specialty">Especialidade</Label>
                    <Select value={formData.specialty} onValueChange={(value) => handleInputChange('specialty', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sua especialidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="motion-graphics">Motion Graphics</SelectItem>
                        <SelectItem value="broadcast">Broadcast Design</SelectItem>
                        <SelectItem value="animation">Animação 2D/3D</SelectItem>
                        <SelectItem value="vfx">Efeitos Visuais</SelectItem>
                        <SelectItem value="editing">Edição de Vídeo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Conte-nos sobre você</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Descreva sua experiência, projetos anteriores e por que quer se juntar à nossa plataforma..."
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full btn-primary text-lg py-4">
                  <Upload className="w-5 h-5 mr-2" />
                  Enviar Candidatura
                </Button>
              </form>
            </ModernCard>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
