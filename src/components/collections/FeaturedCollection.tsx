'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlist-store'
import { useCartStore } from '@/store/cart-store'
import { useAuthStore } from '@/store/auth-store'
import { toast } from '@/hooks/use-toast'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  image2?: string
  category?: string
  rating?: number
  reviewCount?: number
  featured?: boolean
  bestseller?: boolean
}

export default function FeaturedCollection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem: addToWishlist, items: wishlistItems, removeItem: removeFromWishlist } = useWishlistStore()
  const { addItem: addToCart } = useCartStore()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    // Fetch featured products from API
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/products?featured=true&limit=4')
        const data = await response.json()

        if (response.ok) {
          setProducts(data.products)
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch featured products",
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

    fetchProducts()
  }, [])

  const handleWishlistToggle = (product: Product) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to add items to your wishlist",
        variant: "destructive"
      })
      return
    }

    const isInWishlist = wishlistItems.some(item => item.id === product.id)
    
    if (isInWishlist) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist`
      })
    } else {
      addToWishlist(product)
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist`
      })
    }
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    })
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`
    })
  }

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 bg-gray-50" aria-labelledby="featured-heading">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4" id="featured-heading">
            Featured Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked pieces that represent the pinnacle of luxury fashion and craftsmanship
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const isInWishlist = wishlistItems.some(item => item.id === product.id)
            
            return (
              <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.featured && (
                      <Badge className="bg-gold text-charcoal hover:bg-gold/90">
                        Featured
                      </Badge>
                    )}
                    {product.bestseller && (
                      <Badge className="bg-red-500 text-white hover:bg-red-500/90">
                        Bestseller
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="bg-white/90 hover:bg-white text-charcoal shadow-md"
                      onClick={() => handleWishlistToggle(product)}
                      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart 
                        className={`h-4 w-4 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} 
                      />
                    </Button>
                  </div>

                  {/* Quick Add Button */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      className="w-full bg-white text-charcoal hover:bg-gray-100"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Quick Add
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Category */}
                    <p className="text-sm text-gray-500">{product.category}</p>
                    
                    {/* Product Name */}
                    <h3 className="font-semibold text-charcoal line-clamp-2 group-hover:text-royal-blue transition-colors">
                      <Link href={`/product/${product.id}`}>
                        {product.name}
                      </Link>
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>
                    
                    {/* Rating */}
                    {product.rating && (
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating!)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {product.rating} ({product.reviewCount})
                        </span>
                      </div>
                    )}
                    
                    {/* Price and Actions */}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-charcoal">
                        ${product.price.toLocaleString()}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        className="bg-royal-blue hover:bg-royal-blue/90"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/shop">
            <Button size="lg" className="bg-charcoal hover:bg-charcoal/90 text-white">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}