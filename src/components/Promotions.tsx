'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Gift, Truck, Shield } from 'lucide-react'
import Image from 'next/image'
import { useToast } from '@/hooks/use-toast'

interface Banner {
  id: string
  title: string
  subtitle?: string
  image: string
  link?: string
  position: number
  active: boolean
}

export default function Promotions() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/content/banners')
      const data = await response.json()

      if (response.ok) {
        setBanners(data.banners)
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch promotions',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-charcoal">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden mb-16">
            <div className="w-full h-64 md:h-96 bg-gray-700 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4"></div>
                <div className="h-6 bg-gray-700 rounded w-32 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-48 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const mainBanner = banners.find(banner => banner.position === 1)

  return (
    <section className="py-16 bg-charcoal">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Promotion Banner */}
        {mainBanner && (
          <div className="relative rounded-2xl overflow-hidden mb-16">
            <Image
              src={mainBanner.image}
              alt={mainBanner.title}
              width={1200}
              height={400}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 to-royal-blue/60 flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ivory mb-4">
                    {mainBanner.title}
                  </h2>
                  {mainBanner.subtitle && (
                    <p className="text-lg text-ivory/90 mb-6">
                      {mainBanner.subtitle}
                    </p>
                  )}
                  <Button 
                    size="lg"
                    className="bg-gold hover:bg-gold/90 text-charcoal px-8 py-4 text-lg group"
                    onClick={() => mainBanner.link && window.open(mainBanner.link, '_self')}
                  >
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center text-ivory">
            <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Luxury Gift Wrapping</h3>
            <p className="text-ivory/80">
              Complimentary gift wrapping and personalized messages for all orders.
            </p>
          </div>

          <div className="text-center text-ivory">
            <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Free Worldwide Shipping</h3>
            <p className="text-ivory/80">
              Enjoy complimentary express shipping on orders over $500.
            </p>
          </div>

          <div className="text-center text-ivory">
            <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
            <p className="text-ivory/80">
              30-day return policy and lifetime warranty on all products.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}