'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Heart, Eye, ArrowRight } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlist-store'
import { useAuthStore } from '@/store/auth-store'
import { toast } from '@/hooks/use-toast'

interface Collection {
  id: string
  name: string
  description: string
  image: string
  productCount: number
  slug: string
  featured?: boolean
  tags?: string[]
}

export default function CollectionGrid() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem: addToWishlist, items: wishlistItems, removeItem: removeFromWishlist } = useWishlistStore()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    // Fetch collections from API
    const fetchCollections = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/categories')
        const data = await response.json()

        if (response.ok) {
          setCollections(data.collections)
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch collections",
            variant: "destructive"
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [])

  const handleWishlistToggle = (collection: Collection) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save collections",
        variant: "destructive"
      })
      return
    }

    const isInWishlist = wishlistItems.some(item => item.id === collection.id)

    if (isInWishlist) {
      removeFromWishlist(collection.id)
      toast({
        title: "Removed from Wishlist",
        description: `${collection.name} has been removed from your wishlist`
      })
    } else {
      addToWishlist({
        id: collection.id,
        name: collection.name,
        price: 0, // Collections don't have prices
        image: collection.image,
        quantity: 1
      })
      toast({
        title: "Saved to Wishlist",
        description: `${collection.name} has been saved to your wishlist`
      })
    }
  }

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

  const featuredCollections = collections.filter(c => c.featured)
  const allCollections = collections

  return (
    <section className="py-16 px-4 bg-white" aria-labelledby="collections-grid-heading">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4" id="collections-grid-heading">
            Explore Our Collections
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each collection tells a unique story of craftsmanship, style, and luxury
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="all">All Collections</TabsTrigger>
            <TabsTrigger value="featured">Featured Only</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCollections.map((collection) => (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                  onWishlistToggle={handleWishlistToggle}
                  isInWishlist={wishlistItems.some(item => item.id === collection.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredCollections.map((collection) => (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                  onWishlistToggle={handleWishlistToggle}
                  isInWishlist={wishlistItems.some(item => item.id === collection.id)}
                  featured={true}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-royal-blue to-charcoal text-white rounded-2xl p-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Discover Your Perfect Style
          </h3>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
            Let our collections inspire your next fashion statement. From everyday elegance to special occasion glamour.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button size="lg" variant="secondary" className="bg-white text-charcoal hover:bg-gray-100">
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/account">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-charcoal">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

interface CollectionCardProps {
  collection: Collection
  onWishlistToggle: (collection: Collection) => void
  isInWishlist: boolean
  featured?: boolean
}

function CollectionCard({ collection, onWishlistToggle, isInWishlist, featured = false }: CollectionCardProps) {
  return (
    <Card className={`group overflow-hidden hover:shadow-xl transition-all duration-300 ${featured ? 'lg:col-span-1' : ''}`}>
      <div className="relative">
        {/* Image */}
        <div className={`relative overflow-hidden ${featured ? 'h-64' : 'h-48'}`}>
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

          {/* Featured Badge */}
          {collection.featured && (
            <Badge className="absolute top-4 left-4 bg-gold text-charcoal hover:bg-gold/90">
              Featured
            </Badge>
          )}

          {/* Wishlist Button */}
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-4 right-4 bg-white/90 hover:bg-white text-charcoal shadow-md"
            onClick={() => onWishlistToggle(collection)}
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>

          {/* Product Count Overlay */}
          <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
            {typeof collection.productCount === 'number' ? collection.productCount : 0} pieces
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Title */}
            <h3 className="text-xl font-bold text-charcoal group-hover:text-royal-blue transition-colors">
              {collection.name}
            </h3>

            {/* Description */}
            <p className="text-gray-600 line-clamp-2">
              {collection.description}
            </p>

            {/* Tags */}
            {collection.tags && Array.isArray(collection.tags) && collection.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {collection.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {String(tag)}
                  </Badge>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <Link href={`/collections/${typeof collection.slug === 'string' ? collection.slug : String(collection.slug)}`}>
                <Button variant="outline" size="sm" className="group">
                  <Eye className="h-4 w-4 mr-2" />
                  View Collection
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <span className="text-sm text-gray-500">
                {typeof collection.productCount === 'number' ? collection.productCount : 0} items
              </span>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}