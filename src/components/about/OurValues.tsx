'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Diamond, 
  Shield, 
  Users, 
  Leaf, 
  Award, 
  Globe,
  Heart,
  Star
} from 'lucide-react'

export default function OurValues() {
  const values = [
    {
      icon: Diamond,
      title: 'Exceptional Quality',
      description: 'We source only the finest materials and work with renowned designers to ensure every piece meets our exacting standards of excellence.',
      color: 'text-blue-600'
    },
    {
      icon: Shield,
      title: 'Trust & Integrity',
      description: 'Building lasting relationships with our customers through transparency, honesty, and unwavering commitment to ethical business practices.',
      color: 'text-green-600'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Our customers are at the heart of everything we do. We provide personalized service and create memorable shopping experiences.',
      color: 'text-purple-600'
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Committed to responsible fashion by partnering with brands that prioritize sustainable practices and environmental consciousness.',
      color: 'text-emerald-600'
    },
    {
      icon: Award,
      title: 'Craftsmanship',
      description: 'Celebrating the art of fine craftsmanship and supporting designers who preserve traditional techniques while innovating for the future.',
      color: 'text-orange-600'
    },
    {
      icon: Globe,
      title: 'Global Perspective',
      description: 'Bringing together the best of international fashion while respecting cultural diversity and promoting global design talent.',
      color: 'text-indigo-600'
    }
  ]

  const commitments = [
    {
      icon: Heart,
      title: 'Community Impact',
      description: 'Supporting local communities and charitable initiatives that make a positive difference in people\'s lives.',
      stat: '50+'
    },
    {
      icon: Star,
      title: 'Customer Satisfaction',
      description: 'Maintaining an exceptional satisfaction rate through dedicated service and quality assurance.',
      stat: '98%'
    }
  ]

  return (
    <section className="py-16 px-4 bg-gray-50" aria-labelledby="values-heading">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-royal-blue text-white">
            Our Core Values
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4" id="values-heading">
            What We Stand For
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our values are the foundation of everything we do at LUXE. They guide our decisions, shape our culture, and define our commitment to excellence in luxury fashion.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white">
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className={`h-8 w-8 ${value.color}`} />
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Commitments Section */}
        <div className="bg-gradient-to-r from-royal-blue to-charcoal rounded-2xl p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              Our Commitment to Excellence
            </h3>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Beyond fashion, we're committed to making a positive impact through our business practices and community engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {commitments.map((commitment, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <commitment.icon className="h-10 w-10 text-gold" />
                </div>
                <div className="text-4xl font-bold text-gold mb-2">
                  {commitment.stat}
                </div>
                <h4 className="text-xl font-bold mb-3">
                  {commitment.title}
                </h4>
                <p className="text-white/80 leading-relaxed">
                  {commitment.description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-gold mb-1">200+</div>
              <div className="text-sm text-white/80">Designer Brands</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold mb-1">50K+</div>
              <div className="text-sm text-white/80">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold mb-1">30+</div>
              <div className="text-sm text-white/80">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold mb-1">24/7</div>
              <div className="text-sm text-white/80">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}