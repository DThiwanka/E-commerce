import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackButton from '@/components/ui/back-button'
import AboutHero from '@/components/about/AboutHero'
import OurStory from '@/components/about/OurStory'
import OurValues from '@/components/about/OurValues'
import TeamSection from '@/components/about/TeamSection'
import Milestones from '@/components/about/Milestones'
import Newsletter from '@/components/Newsletter'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | LUXE - Luxury Fashion',
  description: 'Discover the story behind LUXE, our commitment to exceptional craftsmanship, and our dedication to bringing you the finest luxury fashion from around the world.',
  openGraph: {
    title: 'About Us | LUXE - Luxury Fashion',
    description: 'Discover the story behind LUXE, our commitment to exceptional craftsmanship, and our dedication to bringing you the finest luxury fashion from around the world.',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        {/* Back Button */}
        <div className="container mx-auto px-4 pt-8">
          <div className="mb-8">
            <BackButton href="/" label="Back to Home" />
          </div>
        </div>
        
        <AboutHero />
        <OurStory />
        <OurValues />
        <TeamSection />
        <Milestones />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}