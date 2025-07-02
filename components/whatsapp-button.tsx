
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, HelpCircle, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

const faqs = [
  {
    question: 'Como baixar templates?',
    answer: 'Após a compra, você recebe acesso imediato para download em sua conta.',
    action: 'Ver Templates'
  },
  {
    question: 'Posso usar comercialmente?',
    answer: 'Sim! Todos os templates incluem licença comercial completa.',
    action: 'Saber Mais'
  },
  {
    question: 'Como contratar profissionais?',
    answer: 'Navegue pelo marketplace e entre em contato diretamente com os criadores.',
    action: 'Ver Marketplace'
  },
  {
    question: 'Preciso de ajuda técnica?',
    answer: 'Nossa equipe está disponível 24/7 para suporte técnico especializado.',
    action: 'Falar com Suporte'
  }
]

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const toggleWidget = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setShowChat(false)
    }
  }

  const openWhatsApp = (message: string = '') => {
    const defaultMessage = message || 'Olá! Gostaria de saber mais sobre a Broadcast Motion Graphics.'
    const encodedMessage = encodeURIComponent(defaultMessage)
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  const handleFAQClick = (faq: typeof faqs[0]) => {
    const message = `Olá! Tenho uma dúvida sobre: ${faq.question}`
    openWhatsApp(message)
  }

  return (
    <>
      {/* Main WhatsApp Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={toggleWidget}
          className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-large flex items-center justify-center text-white transition-all duration-300 hover:scale-110 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="whatsapp"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Pulse Animation */}
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
        </motion.button>

        {/* Notification Badge */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 3 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
          >
            1
          </motion.div>
        )}
      </motion.div>

      {/* Widget Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-large border border-primary-200 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-green-500 p-4 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Broadcast Motion</h3>
                  <p className="text-sm text-green-100">Normalmente responde em poucos minutos</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {!showChat ? (
                <>
                  {/* Welcome Message */}
                  <div className="mb-4">
                    <div className="bg-primary-50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-primary-700">
                        👋 Olá! Como podemos ajudar você hoje?
                      </p>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2 mb-4">
                    <button
                      onClick={() => openWhatsApp('Gostaria de saber mais sobre os templates disponíveis.')}
                      className="w-full text-left p-3 rounded-lg hover:bg-primary-50 transition-colors duration-200 border border-primary-100"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center">
                          <HelpCircle className="w-4 h-4 text-secondary-600" />
                        </div>
                        <div>
                          <p className="font-medium text-primary-900 text-sm">Dúvidas sobre Templates</p>
                          <p className="text-xs text-primary-600">Saiba mais sobre nossos produtos</p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => openWhatsApp('Preciso de ajuda para encontrar um profissional adequado para meu projeto.')}
                      className="w-full text-left p-3 rounded-lg hover:bg-primary-50 transition-colors duration-200 border border-primary-100"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center">
                          <Phone className="w-4 h-4 text-accent-600" />
                        </div>
                        <div>
                          <p className="font-medium text-primary-900 text-sm">Suporte Técnico</p>
                          <p className="text-xs text-primary-600">Ajuda com downloads e instalação</p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => openWhatsApp('Gostaria de saber sobre oportunidades para criadores na plataforma.')}
                      className="w-full text-left p-3 rounded-lg hover:bg-primary-50 transition-colors duration-200 border border-primary-100"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Mail className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-primary-900 text-sm">Seja um Criador</p>
                          <p className="text-xs text-primary-600">Venda seus templates conosco</p>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* FAQ Section */}
                  <div className="border-t border-primary-200 pt-4">
                    <h4 className="font-semibold text-primary-900 text-sm mb-3">Perguntas Frequentes</h4>
                    <div className="space-y-2">
                      {faqs.slice(0, 2).map((faq, index) => (
                        <button
                          key={index}
                          onClick={() => handleFAQClick(faq)}
                          className="w-full text-left p-2 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                        >
                          <p className="text-sm text-primary-700 font-medium">{faq.question}</p>
                          <p className="text-xs text-primary-500 mt-1">{faq.answer}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                /* Chat Interface */
                <div className="space-y-4">
                  <div className="bg-primary-50 rounded-lg p-3">
                    <p className="text-sm text-primary-700">
                      Você será redirecionado para o WhatsApp para continuar a conversa.
                    </p>
                  </div>
                  
                  <Button
                    onClick={() => openWhatsApp()}
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Abrir WhatsApp
                  </Button>
                </div>
              )}

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-primary-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-primary-600">Online agora</span>
                  </div>
                  <button
                    onClick={() => openWhatsApp()}
                    className="text-xs text-green-600 hover:text-green-700 font-medium"
                  >
                    Iniciar conversa →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={toggleWidget}
          />
        )}
      </AnimatePresence>
    </>
  )
}
