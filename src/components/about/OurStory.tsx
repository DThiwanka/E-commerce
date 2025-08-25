'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, Eye, Target, Users } from 'lucide-react'

export default function OurStory() {
  const storyPoints = [
    {
      year: '2010',
      title: 'The Beginning',
      description: 'LUXE was founded with a simple vision: to bring the world\'s finest luxury fashion to discerning customers who appreciate exceptional craftsmanship and timeless style.',
      icon: Heart,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop'
    },
    {
      year: '2015',
      title: 'Global Expansion',
      description: 'From our flagship boutique in Milan, we expanded to serve customers worldwide, establishing ourselves as a trusted name in luxury retail.',
      icon: Eye,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Embracing the future, we launched our online platform, bringing the LUXE experience to customers\' fingertips while maintaining our commitment to personal service.',
      icon: Target,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop'
    },
    {
      year: 'Today',
      title: 'Continuing the Legacy',
      description: 'Today, LUXE stands as a testament to our unwavering dedication to quality, style, and customer satisfaction, serving fashion enthusiasts around the globe.',
      icon: Users,
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop'
    }
  ]

  return (
    <section id="our-story" className="py-16 px-4 bg-white" aria-labelledby="our-story-heading">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-royal-blue text-white">
            Our Journey
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4" id="our-story-heading">
            Our Story
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From a dream to reality, discover how LUXE has evolved over the years while staying true to our core values of quality, craftsmanship, and exceptional customer service.
          </p>
        </div>

        {/* Story Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Side - Text Content */}
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-bold text-charcoal mb-4">
                Born from Passion, Built on Excellence
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                LUXE was born from a simple yet powerful idea: everyone deserves access to exceptional luxury fashion that not only looks beautiful but feels extraordinary. Our founder, with over two decades of experience in the fashion industry, envisioned a platform where craftsmanship meets contemporary style.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                What started as a small boutique in the fashion capital of Milan has grown into a global destination for luxury fashion enthusiasts. Throughout our journey, we've remained committed to our founding principles: curating only the finest pieces, providing personalized service, and creating an shopping experience that's as luxurious as the products we offer.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, LUXE represents more than just a retailer – we're curators of style, guardians of craftsmanship, and partners in our customers' fashion journeys. Every piece in our collection tells a story of dedication, artistry, and the relentless pursuit of perfection.
              </p>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600&h=450&fit=crop"
                alt="LUXE boutique interior"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gold text-charcoal p-6 rounded-lg shadow-lg">
              <div className="text-3xl font-bold mb-1">14+</div>
              <div className="text-sm font-medium">Years of Excellence</div>
            </div>
          </div>
        </div>

        {/* Story Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {storyPoints.map((point, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative h-48">
                <Image
                  src={point.image}
                  alt={point.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gold text-charcoal">
                    {point.year}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <point.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-charcoal mb-2">
                  {point.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {point.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}