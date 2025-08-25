'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'

interface CollectionBannerProps {
  title: string
  subtitle: string
  image: string
  description: string
}

export default function CollectionBanner({ title, subtitle, image, description }: CollectionBannerProps) {
  return (
    <section className="relative h-[500px] overflow-hidden bg-gradient-to-br from-charcoal via-gray-800 to-royal-blue">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            {/* Badge */}
            <div className="flex items-center justify-center gap-2">
              <Star className="h-5 w-5 text-gold" />
              <Badge className="bg-gold text-charcoal hover:bg-gold/90">
                FEATURED COLLECTION
              </Badge>
              <Star className="h-5 w-5 text-gold" />
            </div>
            
            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              {title}
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>

            {/* Description */}
            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/shop">
                <Button size="lg" className="bg-gold text-charcoal hover:bg-gold/90 px-8 py-3">
                  Shop Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/collections">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-charcoal px-8 py-3">
                  View All Collections
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}