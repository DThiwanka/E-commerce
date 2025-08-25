'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

interface Category {
  id: string
  name: string
  description: string
  slug: string
  image: string
  productCount: number
  featured?: boolean
}

export default function CategoryShowcase() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - in real app, this would come from API
    const mockCategories: Category[] = [
      {
        id: '1',
        name: 'Women\'s Fashion',
        description: 'Elegant and sophisticated pieces for the modern woman',
        slug: 'womens-fashion',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop',
        productCount: 156,
        featured: true
      },
      {
        id: '2',
        name: 'Men\'s Collection',
        description: 'Sharp and refined styles for the distinguished gentleman',
        slug: 'mens-collection',
        image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&h=300&fit=crop',
        productCount: 124,
        featured: true
      },
      {
        id: '3',
        name: 'Accessories',
        description: 'Complete your look with our premium accessories',
        slug: 'accessories',
        image: 'https://images.unsplash.com/photo-1543161705-6551c905da0f?w=400&h=300&fit=crop',
        productCount: 89
      },
      {
        id: '4',
        name: 'Footwear',
        description: 'Step into luxury with our exclusive shoe collection',
        slug: 'footwear',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
        productCount: 67
      },
      {
        id: '5',
        name: 'Bags & Luggage',
        description: 'Premium craftsmanship for the discerning traveler',
        slug: 'bags-luggage',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
        productCount: 45
      },
      {
        id: '6',
        name: 'Jewelry',
        description: 'Exquisite pieces that capture timeless beauty',
        slug: 'jewelry',
        image: 'https://images.unsplash.com/photo-1599643478518-a3543199fe81?w=400&h=300&fit=crop',
        productCount: 78
      }
    ]

    setCategories(mockCategories)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const featuredCategories = categories.filter(cat => cat.featured)
  const regularCategories = categories.filter(cat => !cat.featured)

  return (
    <section className="py-16 px-4 bg-white" aria-labelledby="categories-heading">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-gold" />
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal" id="categories-heading">
              Shop by Category
            </h2>
            <Sparkles className="h-5 w-5 text-gold" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated categories, each offering a unique selection of luxury items
          </p>
        </div>

        {/* Featured Categories */}
        {featuredCategories.length > 0 && (
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredCategories.map((category) => (
                <Card key={category.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-64">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Badge className="mb-3 bg-gold text-charcoal hover:bg-gold/90">
                          Featured
                        </Badge>
                        <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                        <p className="text-white/90 mb-4 max-w-sm">{category.description}</p>
                        <Link href={`/shop?category=${category.slug}`}>
                          <Button variant="secondary" className="group">
                            Explore Collection
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularCategories.map((category) => (
            <Card key={category.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative h-48">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-charcoal group-hover:text-royal-blue transition-colors">
                    {category.name}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {category.productCount} items
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {category.description}
                </p>
                <Link href={`/shop?category=${category.slug}`}>
                  <Button variant="outline" size="sm" className="w-full group">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/shop">
            <Button size="lg" className="bg-royal-blue hover:bg-royal-blue/90 text-white">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}