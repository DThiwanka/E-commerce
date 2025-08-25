'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { useAuthStore } from '@/store/auth-store'
import { useWishlistStore } from '@/store/wishlist-store'
import { useCartStore } from '@/store/cart-store'
import BackButton from '@/components/ui/back-button'
import { 
  Heart, 
  ShoppingCart, 
  Eye, 
  Trash2, 
  Package
} from 'lucide-react'
import Link from 'next/link'

interface WishlistItem {
  id: string
  productId: string
  product: {
    id: string
    name: string
    price: number
    image: string
  }
  createdAt: string
}

export default function WishlistPage() {
  const { user, isAuthenticated } = useAuthStore()
  const { items, removeItem, clearWishlist } = useWishlistStore()
  const { addItem } = useCartStore()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = (item: WishlistItem) => {
    addItem({
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      image: item.product.image,
      sku: ''
    })
    
    toast({
      title: 'Added to cart',
      description: `${item.product.name} has been added to your cart`,
    })
  }

  const handleRemoveFromWishlist = (productId: string) => {
    removeItem(productId)
    toast({
      title: 'Removed from wishlist',
      description: 'Item has been removed from your wishlist',
    })
  }

  const handleClearWishlist = () => {
    if (confirm('Are you sure you want to clear your entire wishlist?')) {
      clearWishlist()
      toast({
        title: 'Wishlist cleared',
        description: 'All items have been removed from your wishlist',
      })
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>Please sign in to view your wishlist</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <BackButton href="/shop" label="Back to Shop" />
            <h1 className="text-3xl font-bold text-charcoal">My Wishlist</h1>
          </div>
          {items.length > 0 && (
            <Button 
              variant="outline" 
              onClick={handleClearWishlist}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>
        <p className="text-muted-foreground">
          {items.length} {items.length === 1 ? 'item' : 'items'} in your wishlist
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">Your wishlist is empty</h3>
          <p className="text-muted-foreground mb-6">Save items you love by clicking the heart icon</p>
          <Link href="/shop">
            <Button className="bg-royal-blue hover:bg-royal-blue/90 text-ivory">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Link href={`/product/${item.product.id}`}>
                      <Button size="icon" variant="secondary" className="bg-ivory text-charcoal hover:bg-gold">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="bg-ivory text-charcoal hover:bg-gold"
                      onClick={() => handleRemoveFromWishlist(item.productId)}
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
              <CardContent className="p-4 bg-white">
                <h3 className="text-lg font-semibold text-charcoal mb-2 line-clamp-2">
                  {item.product.name}
                </h3>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-royal-blue">
                    ${item.product.price.toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm"
                    className="flex-1 bg-royal-blue hover:bg-royal-blue/90 text-ivory"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    size="icon" 
                    variant="outline"
                    onClick={() => handleRemoveFromWishlist(item.productId)}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-3 text-xs text-muted-foreground">
                  Added on {new Date(item.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}