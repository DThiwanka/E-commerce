import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackButton from '@/components/ui/back-button'
import ProductGrid from '@/components/ProductGrid'
import ShopFilters from '@/components/ShopFilters'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Luxury Essentials Collection | LUXE - Luxury Fashion',
  description: 'Discover our Luxury Essentials collection featuring premium quality pieces for everyday wear. Explore foundation pieces for the modern wardrobe.',
  openGraph: {
    title: 'Luxury Essentials Collection | LUXE - Luxury Fashion',
    description: 'Discover our Luxury Essentials collection featuring premium quality pieces for everyday wear. Explore foundation pieces for the modern wardrobe.',
    type: 'website',
  },
}

export default function EssentialsCollectionPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <BackButton href="/collections" label="Back to Collections" />
          </div>
          
          {/* Collection Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
              Luxury Essentials
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Premium quality for everyday wear. Discover our curated selection of foundation pieces that form the cornerstone of the modern luxury wardrobe.
            </p>
          </div>

          {/* Products Section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <ShopFilters />
            </div>
            <div className="lg:col-span-3">
              <ProductGrid />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}