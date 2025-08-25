import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CollectionHero from '@/components/collections/CollectionHero'
import CategoryShowcase from '@/components/collections/CategoryShowcase'
import FeaturedCollection from '@/components/collections/FeaturedCollection'
import CollectionGrid from '@/components/collections/CollectionGrid'
import Newsletter from '@/components/Newsletter'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Collections | LUXE - Luxury Fashion',
  description: 'Explore our curated collections of luxury fashion items. From timeless classics to seasonal trends, discover the perfect pieces for your wardrobe.',
  openGraph: {
    title: 'Collections | LUXE - Luxury Fashion',
    description: 'Explore our curated collections of luxury fashion items. From timeless classics to seasonal trends, discover the perfect pieces for your wardrobe.',
    type: 'website',
  },
}

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        <CollectionHero />
        <CategoryShowcase />
        <FeaturedCollection />
        <CollectionGrid />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}