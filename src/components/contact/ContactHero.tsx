'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

export default function ContactHero() {
  return (
    <section className="relative h-[500px] overflow-hidden bg-gradient-to-br from-royal-blue to-charcoal">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=500&fit=crop"
          alt="Contact us background"
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
            <Badge className="bg-gold text-charcoal hover:bg-gold/90">
              GET IN TOUCH
            </Badge>
            
            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              We're Here to Help
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Have questions about our products, need assistance with your order, or want to learn more about LUXE? We're here to help.
            </p>

            {/* Quick Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Mail className="h-6 w-6 text-gold" />
                </div>
                <p className="text-white font-medium">Email Us</p>
                <p className="text-white/80 text-sm">support@luxe.com</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Phone className="h-6 w-6 text-gold" />
                </div>
                <p className="text-white font-medium">Call Us</p>
                <p className="text-white/80 text-sm">+1 (555) 123-4567</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-gold" />
                </div>
                <p className="text-white font-medium">Visit Us</p>
                <p className="text-white/80 text-sm">Milan, Italy</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Clock className="h-6 w-6 text-gold" />
                </div>
                <p className="text-white font-medium">Hours</p>
                <p className="text-white/80 text-sm">24/7 Support</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <Link href="#contact-form">
                <Button size="lg" className="bg-gold text-charcoal hover:bg-gold/90 px-8 py-3">
                  Send Message
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}