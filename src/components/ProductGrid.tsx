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
  image2?: string
  image3?: string
  image4?: string
  stock: number
  sku?: string
  tags?: string
  featured?: boolean
  bestseller?: boolean
  seasonal?: boolean
  category?: {
    id: string
    name: string
    slug: string
  }
  reviews?: Array<{
    id: string
    rating: number
    comment?: string
  }>
}

interface ProductGridProps {
  viewMode: 'grid' | 'list'
  category?: string
  featured?: boolean
  bestseller?: boolean
  search?: string
}

export default function ProductGrid({ viewMode, category, featured, bestseller, search }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const addItem = useCartStore((state) => state.addItem)
  const { toggleItem, isInWishlist } = useWishlistStore()
  const { user, isAuthenticated } = useAuthStore()
  const { toast } = useToast()

  useEffect(() => {
    fetchProducts()
  }, [category, featured, bestseller, search])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      
      if (category) params.append('category', category)
      if (featured) params.append('featured', 'true')
      if (bestseller) params.append('bestseller', 'true')
      if (search) params.append('search', search)

      const response = await fetch(`/api/products?${params}`)
      const data = await response.json()

      if (response.ok) {
        setProducts(data.products)
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch products',
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

  const getAverageRating = (reviews?: Product['reviews']) => {
    if (!reviews || reviews.length === 0) return 0
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return sum / reviews.length
  }

  const getReviewCount = (reviews?: Product['reviews']) => {
    return reviews?.length || 0
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="h-64 bg-gray-200 animate-pulse"></div>
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No products found.</p>
      </div>
    )
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {products.map((product) => {
          const avgRating = getAverageRating(product.reviews)
          const reviewCount = getReviewCount(product.reviews)
          
          return (
            <Card key={product.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-1/3 h-64 md:h-auto">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
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
                </div>
                <CardContent className="flex-1 p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <p className="text-sm text-royal-blue font-medium mb-1">{product.category?.name}</p>
                      <h3 className="text-xl font-semibold text-charcoal mb-2">{product.name}</h3>
                      {product.description && (
                        <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                      )}
                      
                      {avgRating > 0 && (
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-gold">
                                {i < Math.floor(avgRating) ? '★' : '☆'}
                              </span>
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            ({reviewCount} reviews)
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-charcoal">${product.price.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        size="lg"
                        className="flex-1 bg-royal-blue hover:bg-royal-blue/90 text-ivory"
                        disabled={product.stock === 0}
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button size="icon" variant="outline" className="border-silver">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="border-silver"
                        onClick={() => handleToggleWishlist(product)}
                      >
                        <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          )
        })}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        const avgRating = getAverageRating(product.reviews)
        const reviewCount = getReviewCount(product.reviews)
        
        return (
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
              
              {avgRating > 0 && (
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-gold text-sm">
                        {i < Math.floor(avgRating) ? '★' : '☆'}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({reviewCount})
                  </span>
                </div>
              )}
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-charcoal">${product.price.toLocaleString()}</span>
              </div>
              
              <Button 
                size="sm" 
                className="w-full bg-royal-blue hover:bg-royal-blue/90 text-ivory"
                disabled={product.stock === 0}
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}