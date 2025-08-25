'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Eye, Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { useCartStore } from '@/store/cart-store'
import { useWishlistStore } from '@/store/wishlist-store'
import { useAuthStore } from '@/store/auth-store'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'

interface Product {
  id: string
  name: string
  description?: string
  price: number
  image: string
  stock: number
  sku?: string
  featured?: boolean
  bestseller?: boolean
  category?: {
    id: string
    name: string
    slug: string
  }
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const addItem = useCartStore((state) => state.addItem)
  const { toggleItem, isInWishlist } = useWishlistStore()
  const { isAuthenticated } = useAuthStore()
  const { toast } = useToast()

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/products?featured=true&limit=4')
      const data = await response.json()

      if (response.ok) {
        setProducts(data.products)
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch featured products',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      sku: product.sku
    })
    toast({
      title: 'Added to Cart',
      description: `${product.name} has been added to your cart`,
    })
  }

  const handleToggleWishlist = (product: Product) => {
    if (!isAuthenticated) {
      toast({
        title: 'Please sign in',
        description: 'You need to be signed in to add items to your wishlist',
        variant: 'destructive',
      })
      return
    }

    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    })

    const isCurrentlyInWishlist = isInWishlist(product.id)
    toast({
      title: isCurrentlyInWishlist ? 'Removed from wishlist' : 'Added to wishlist',
      description: `${product.name} has been ${isCurrentlyInWishlist ? 'removed from' : 'added to'} your wishlist`,
    })
  }

  if (loading) {
    return (
      <section className="py-16 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-64 bg-gray-200 animate-pulse"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section className="py-16 bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
              Featured Collection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of premium products crafted with exceptional attention to detail.
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No featured products available at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-ivory">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Featured Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium products crafted with exceptional attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.featured && (
                  <Badge className="absolute top-4 left-4 bg-gold text-charcoal">
                    Featured
                  </Badge>
                )}
                {product.bestseller && (
                  <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                    Bestseller
                  </Badge>
                )}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-semibold">Out of Stock</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Link href={`/product/${product.id}`}>
                      <Button size="icon" variant="secondary" className="bg-ivory text-charcoal hover:bg-gold">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="bg-ivory text-charcoal hover:bg-gold"
                      onClick={() => handleToggleWishlist(product)}
                    >
                      <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                  </div>
                </div>
              </div>
              <CardContent className="p-4 bg-white">
                <p className="text-sm text-royal-blue font-medium mb-1">{product.category?.name}</p>
                <h3 className="text-lg font-semibold text-charcoal mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-charcoal">${product.price.toLocaleString()}</span>
                  <Button 
                    size="sm" 
                    className="bg-royal-blue hover:bg-royal-blue/90 text-ivory"
                    disabled={product.stock === 0}
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory px-8"
            onClick={() => window.location.href = '/shop?featured=true'}
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}