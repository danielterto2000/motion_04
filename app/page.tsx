
import Header from '@/components/header'
import Footer from '@/components/footer'
import HeroSlider from '@/components/hero-slider'
import FeaturesSection from '@/components/features-section'
import StatsSection from '@/components/stats-section'
import TestimonialsSection from '@/components/testimonials-section'
import CTASection from '@/components/cta-section'
import WhatsAppButton from '@/components/whatsapp-button'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <HeroSlider />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* CTA Section */}
      <CTASection />
      
      <Footer />
      
      {/* WhatsApp Widget */}
      <WhatsAppButton />
    </main>
  )
}
