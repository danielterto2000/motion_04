
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Play, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Heart,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const footerLinks = {
  platform: [
    { name: 'Templates', href: '/templates' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Seja um Criador', href: '/criador' },
  ],
  support: [
    { name: 'Central de Ajuda', href: '/ajuda' },
    { name: 'Contato', href: '/contato' },
    { name: 'Documentação', href: '/docs' },
  ],
  company: [
    { name: 'Sobre Nós', href: '/sobre' },
    { name: 'Blog', href: '/blog' },
    { name: 'Carreiras', href: '/carreiras' },
  ]
}

const socialLinks = [
  { name: 'Instagram', href: '#', icon: '📷' },
  { name: 'YouTube', href: '#', icon: '📺' },
  { name: 'LinkedIn', href: '#', icon: '💼' },
  { name: 'Twitter', href: '#', icon: '🐦' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-500 to-purple-600"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='https://cdn.pixabay.com/photo/2022/04/13/11/02/dots-7130062_960_720.png fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="container-modern section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Logo */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-button-gradient rounded-xl flex items-center justify-center shadow-large">
                    <Play className="w-6 h-6 text-white" fill="currentColor" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      Broadcast<span className="text-gradient-accent">Motion</span>
                    </h2>
                    <p className="text-sm text-primary-300">Graphics Studio</p>
                  </div>
                </div>

                <p className="text-primary-200 body-md mb-8 max-w-md">
                  Transformamos ideias em motion graphics profissionais. 
                  Conectamos criadores talentosos com projetos incríveis no universo broadcast.
                </p>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-primary-200">
                    <Mail className="w-5 h-5 text-secondary-400" />
                    <span>contato@broadcastmotion.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-primary-200">
                    <Phone className="w-5 h-5 text-secondary-400" />
                    <span>+55 (11) 9999-9999</span>
                  </div>
                  <div className="flex items-center space-x-3 text-primary-200">
                    <MapPin className="w-5 h-5 text-secondary-400" />
                    <span>São Paulo, SP - Brasil</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Platform Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-semibold mb-6 text-white">Plataforma</h3>
                  <ul className="space-y-3">
                    {footerLinks.platform.map((link) => (
                      <li key={link.name}>
                        <Link 
                          href={link.href}
                          className="text-primary-300 hover:text-secondary-400 transition-colors duration-200 flex items-center group"
                        >
                          <span>{link.name}</span>
                          <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Support Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-semibold mb-6 text-white">Suporte</h3>
                  <ul className="space-y-3">
                    {footerLinks.support.map((link) => (
                      <li key={link.name}>
                        <Link 
                          href={link.href}
                          className="text-primary-300 hover:text-secondary-400 transition-colors duration-200 flex items-center group"
                        >
                          <span>{link.name}</span>
                          <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Company Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-semibold mb-6 text-white">Empresa</h3>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link) => (
                      <li key={link.name}>
                        <Link 
                          href={link.href}
                          className="text-primary-300 hover:text-secondary-400 transition-colors duration-200 flex items-center group"
                        >
                          <span>{link.name}</span>
                          <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 pt-12 border-t border-primary-700"
          >
            <div className="max-w-2xl">
              <h3 className="text-xl font-semibold mb-4 text-white">
                Fique por dentro das novidades
              </h3>
              <p className="text-primary-300 mb-6">
                Receba templates exclusivos, dicas de motion graphics e oportunidades de trabalho.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="flex-1 px-4 py-3 rounded-xl bg-primary-800 border border-primary-600 text-white placeholder:text-primary-400 focus:border-secondary-400 focus:ring-2 focus:ring-secondary-400/20 transition-all duration-200"
                />
                <Button className="btn-primary whitespace-nowrap">
                  Inscrever-se
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-700">
          <div className="container-modern py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Copyright */}
              <div className="flex items-center space-x-2 text-primary-300">
                <span>© {currentYear} Broadcast Motion Graphics.</span>
                <span>Feito com</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>no Brasil</span>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-primary-800 hover:bg-primary-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                    title={social.name}
                  >
                    <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                      {social.icon}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
