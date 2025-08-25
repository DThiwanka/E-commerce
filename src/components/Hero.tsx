'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury fashion"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 to-royal-blue/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-ivory px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
          Discover
          <br />
          <span className="text-gold">Timeless</span>
          <br />
          Elegance
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90 animate-fade-in-up">
          Experience the pinnacle of luxury fashion with our curated collection of premium lifestyle essentials.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
          <Button 
            size="lg" 
            className="bg-royal-blue hover:bg-royal-blue/90 text-ivory px-8 py-4 text-lg group"
          >
            Shop Collection
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-ivory text-ivory hover:bg-ivory hover:text-charcoal px-8 py-4 text-lg"
          >
            Discover More
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-ivory rounded-full flex justify-center">
          <div className="w-1 h-3 bg-ivory rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}