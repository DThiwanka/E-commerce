'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Diamond, Star, Award } from 'lucide-react'
import Link from 'next/link'

export default function AboutHero() {
  return (
    <section className="relative h-[600px] overflow-hidden bg-gradient-to-br from-charcoal via-gray-800 to-royal-blue">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop"
          alt="Luxury fashion boutique"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Badge */}
            <div className="flex items-center justify-center gap-2">
              <Diamond className="h-5 w-5 text-gold" />
              <Badge className="bg-gold text-charcoal hover:bg-gold/90">
                ESTABLISHED 2010
              </Badge>
              <Diamond className="h-5 w-5 text-gold" />
            </div>
            
            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Crafting Luxury,
              <br />
              <span className="text-gold">Defining Elegance</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Discover the story behind our passion for exceptional craftsmanship and our journey to become a leading name in luxury fashion.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="h-5 w-5 text-gold fill-current" />
                  <span className="text-3xl font-bold text-white">14+</span>
                </div>
                <p className="text-white/80">Years of Excellence</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Award className="h-5 w-5 text-gold" />
                  <span className="text-3xl font-bold text-white">50K+</span>
                </div>
                <p className="text-white/80">Happy Customers</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Diamond className="h-5 w-5 text-gold" />
                  <span className="text-3xl font-bold text-white">200+</span>
                </div>
                <p className="text-white/80">Designer Brands</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/shop">
                <Button size="lg" className="bg-gold text-charcoal hover:bg-gold/90 px-8 py-3">
                  Explore Collection
                </Button>
              </Link>
              <Link href="#our-story">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-charcoal px-8 py-3">
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}