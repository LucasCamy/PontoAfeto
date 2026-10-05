import { MotionConfig } from 'motion/react'
import { ShopProvider } from './lib/shop'
import { Navbar } from './components/sections/Navbar'
import { Hero } from './components/sections/Hero'
import { BenefitStrip } from './components/sections/BenefitStrip'
import { Categories } from './components/sections/Categories'
import { ProductGrid } from './components/sections/ProductGrid'
import { ProductDetail } from './components/sections/ProductDetail'
import { FeaturedProduct } from './components/sections/FeaturedProduct'
import { HandmadeProcess } from './components/sections/HandmadeProcess'
import { CustomOrderSection } from './components/sections/CustomOrderSection'
import { AboutBrand } from './components/sections/AboutBrand'
import { Testimonials } from './components/sections/Testimonials'
import { Gallery } from './components/sections/Gallery'
import { FAQ } from './components/sections/FAQ'
import { FinalCTA } from './components/sections/FinalCTA'
import { Footer } from './components/sections/Footer'
import { WhatsAppButton } from './components/sections/WhatsAppButton'
import { BagDrawer, BagToast } from './components/sections/BagDrawer'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ShopProvider>
        <div className="paper-grain">
          <Navbar />
          <main id="conteudo" tabIndex={-1} className="outline-none">
            <Hero />
            <BenefitStrip />
            <Categories />
            <ProductGrid />
            <FeaturedProduct />
            <HandmadeProcess />
            <CustomOrderSection />
            <AboutBrand />
            <Testimonials />
            <Gallery />
            <FAQ />
            <FinalCTA />
          </main>
          <Footer />
        </div>
        <WhatsAppButton />
        <ProductDetail />
        <BagDrawer />
        <BagToast />
      </ShopProvider>
    </MotionConfig>
  )
}
