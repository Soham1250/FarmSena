import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Services from '@/components/Services'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Services />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
