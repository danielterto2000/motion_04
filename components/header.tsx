
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  Play, 
  User, 
  LogOut, 
  Settings, 
  ChevronDown,
  Search,
  Bell,
  ShoppingBag
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const navigation = [
  { name: 'Início', href: '/' },
  { name: 'Templates', href: '/templates' },
  { name: 'Marketplace', href: '/marketplace' },
  { name: 'Seja um Criador', href: '/criador' },
  { name: 'Contato', href: '/contato' },
]

export default function Header() {
  const { data: session } = useSession()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-soft border-b border-primary-100' 
            : 'bg-transparent'
        }`}
      >
        <div className="container-modern">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-button-gradient rounded-xl flex items-center justify-center shadow-medium group-hover:shadow-glow transition-all duration-300">
                  <Play className="w-5 h-5 text-white" fill="currentColor" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className={`text-xl font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-primary-900' : 'text-white drop-shadow-lg'
                }`}>
                  Broadcast<span className={`transition-colors duration-300 ${
                    isScrolled ? 'text-gradient' : 'text-accent-400'
                  }`}>Motion</span>
                </h1>
                <p className={`text-xs -mt-1 transition-colors duration-300 ${
                  isScrolled ? 'text-primary-500' : 'text-white/80 drop-shadow-md'
                }`}>Graphics Studio</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative group ${
                    isScrolled 
                      ? 'text-primary-700 hover:text-secondary-600 hover:bg-primary-50' 
                      : 'text-white/90 hover:text-white hover:bg-white/10 drop-shadow-md'
                  }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-full group-hover:left-0 ${
                    isScrolled ? 'bg-secondary-500' : 'bg-accent-400'
                  }`}></span>
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Search Button */}
              <Button variant="ghost" size="sm" className={`transition-colors duration-300 ${
                isScrolled 
                  ? 'text-primary-600 hover:text-secondary-600' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}>
                <Search className="w-4 h-4" />
              </Button>

              {session ? (
                <div className="flex items-center space-x-3">
                  {/* Notifications */}
                  <Button variant="ghost" size="sm" className={`relative transition-colors duration-300 ${
                    isScrolled 
                      ? 'text-primary-600 hover:text-secondary-600' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}>
                    <Bell className="w-4 h-4" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-warning-500 rounded-full"></span>
                  </Button>

                  {/* Cart */}
                  <Button variant="ghost" size="sm" className={`transition-colors duration-300 ${
                    isScrolled 
                      ? 'text-primary-600 hover:text-secondary-600' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}>
                    <ShoppingBag className="w-4 h-4" />
                  </Button>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className={`flex items-center space-x-2 transition-colors duration-300 ${
                        isScrolled 
                          ? 'hover:bg-primary-50' 
                          : 'hover:bg-white/10'
                      }`}>
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-button-gradient text-white text-sm">
                            {session.user?.name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <span className={`text-sm font-medium hidden xl:block transition-colors duration-300 ${
                          isScrolled ? 'text-primary-700' : 'text-white drop-shadow-md'
                        }`}>
                          {session.user?.name?.split(' ')[0] || 'Usuário'}
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-colors duration-300 ${
                          isScrolled ? 'text-primary-500' : 'text-white/70'
                        }`} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-md border border-primary-200">
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="w-4 h-4 mr-2" />
                        <span>Configurações</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                        <LogOut className="w-4 h-4 mr-2" />
                        <span>Sair</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link href="/auth/signin">
                    <Button variant="ghost" className={`transition-colors duration-300 ${
                      isScrolled 
                        ? 'text-primary-700 hover:text-secondary-600' 
                        : 'text-white/90 hover:text-white hover:bg-white/10 drop-shadow-md'
                    }`}>
                      Entrar
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button className="btn-primary">
                      Cadastrar
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className={`lg:hidden transition-colors duration-300 ${
                isScrolled 
                  ? 'text-primary-700 hover:bg-primary-50' 
                  : 'text-white hover:bg-white/10 drop-shadow-md'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white/95 backdrop-blur-md shadow-large z-50 lg:hidden"
            >
              <div className="p-6">
                {/* Mobile Logo */}
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-10 h-10 bg-button-gradient rounded-xl flex items-center justify-center shadow-medium">
                    <Play className="w-5 h-5 text-white" fill="currentColor" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-primary-900">
                      Broadcast<span className="text-gradient">Motion</span>
                    </h1>
                    <p className="text-xs text-primary-500 -mt-1">Graphics Studio</p>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-2 mb-8">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="block px-4 py-3 text-base font-medium text-primary-700 hover:text-secondary-600 hover:bg-primary-50 rounded-xl transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Actions */}
                <div className="space-y-4 pt-6 border-t border-primary-200">
                  {session ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-xl">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-button-gradient text-white">
                            {session.user?.name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-primary-900">{session.user?.name}</p>
                          <p className="text-sm text-primary-600">{session.user?.email}</p>
                        </div>
                      </div>
                      <Link href="/dashboard">
                        <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMobileMenuOpen(false)}>
                          <User className="w-4 h-4 mr-3" />
                          Dashboard
                        </Button>
                      </Link>
                      <Button variant="ghost" className="w-full justify-start text-red-600" onClick={handleSignOut}>
                        <LogOut className="w-4 h-4 mr-3" />
                        Sair
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link href="/auth/signin" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Entrar
                        </Button>
                      </Link>
                      <Link href="/auth/signup" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full btn-primary">
                          Cadastrar
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
