'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'

export default function CollectionHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const collections = [
    {
      id: 1,
      title: 'Timeless Elegance',
      subtitle: 'Classic pieces that never go out of style',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=600&fit=crop',
      cta: 'Explore Collection',
      link: '/collections/timeless'
    },
    {
      id: 2,
      title: 'Seasonal Trends',
      subtitle: 'The latest fashion for the modern wardrobe',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
      cta: 'Shop Now',
      link: '/collections/seasonal'
    },
    {
      id: 3,
      title: 'Luxury Essentials',
      subtitle: 'Premium quality for everyday wear',
      image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=1200&h=600&fit=crop',
      cta: 'Discover',
      link: '/collections/essentials'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % collections.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [collections.length])

  return (
    <section className="relative h-[600px] overflow-hidden bg-charcoal" aria-label="Featured collections">
      {/* Slideshow */}
      <div className="relative h-full">
        {collections.map((collection, index) => (
          <div
            key={collection.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={index !== currentSlide}
          >
            <Image
              src={collection.image}
              alt={collection.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Current collection info */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Star className="h-5 w-5 text-gold fill-current" />
                <span className="text-gold font-medium tracking-wide">EXCLUSIVE COLLECTION</span>
                <Star className="h-5 w-5 text-gold fill-current" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                {collections[currentSlide].title}
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                {collections[currentSlide].subtitle}
              </p>
            </div>

            {/* CTA Button */}
            <Link href={collections[currentSlide].link}>
              <Button 
                size="lg" 
                className="bg-royal-blue hover:bg-royal-blue/90 text-white px-8 py-3 text-lg group"
              >
                {collections[currentSlide].cta}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {collections.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + collections.length) % collections.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        aria-label="Previous collection"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % collections.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        aria-label="Next collection"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  )
}