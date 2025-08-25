'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackButton from '@/components/ui/back-button'
import { useCartStore } from '@/store/cart-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  ArrowRight,
  Truck,
  Shield,
  RotateCcw
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    getSubtotal, 
    getTax, 
    getShipping, 
    getTotalPrice,
    getTotalItems 
  } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-ivory">
        <Header />
        
        <main className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-silver rounded-full flex items-center justify-center mx-auto mb-8">
                <ShoppingBag className="h-12 w-12 text-charcoal" />
              </div>
              
              <h1 className="text-4xl font-bold text-charcoal mb-4">
                Your Cart is Empty
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
              </p>
              
              <Link href="/shop">
                <Button size="lg" className="bg-royal-blue hover:bg-royal-blue/90 text-ivory">
                  Start Shopping
                </Button>
              </Link>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <BackButton href="/shop" label="Continue Shopping" />
          </div>
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-charcoal mb-2">
                Shopping Cart
              </h1>
              <p className="text-muted-foreground">
                {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in your cart
              </p>
            </div>
            
            <Button 
              variant="outline" 
              onClick={clearCart}
              className="border-silver text-charcoal hover:bg-silver"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Product Image */}
                      <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-charcoal">
                              {item.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              SKU: {item.sku}
                            </p>
                            {item.color && (
                              <Badge variant="secondary" className="mt-1">
                                {item.color}
                              </Badge>
                            )}
                            {item.size && (
                              <Badge variant="outline" className="mt-1 ml-2">
                                {item.size}
                              </Badge>
                            )}
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">Quantity:</span>
                            <div className="flex items-center border border-silver rounded-lg">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8 rounded-none"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value) || 1
                                  updateQuantity(item.id, value)
                                }}
                                className="w-16 h-8 text-center border-0 rounded-none"
                                min={1}
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 rounded-none"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-lg font-semibold text-charcoal">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              ${item.price.toFixed(2)} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-sm sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-charcoal mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-charcoal">${getSubtotal().toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span className="text-charcoal">${getTax().toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-charcoal">
                        {getShipping() === 0 ? 'FREE' : `$${getShipping().toFixed(2)}`}
                      </span>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold text-charcoal">Total</span>
                        <span className="text-xl font-bold text-charcoal">
                          ${getTotalPrice().toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Free Shipping Notice */}
                  {getSubtotal() < 500 && (
                    <div className="bg-gold/10 border border-gold rounded-lg p-3 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <Truck className="h-4 w-4 text-gold" />
                        <span className="text-gold font-medium">
                          Spend ${(500 - getSubtotal()).toFixed(2)} more for free shipping!
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Checkout Button */}
                  <Link href="/checkout">
                    <Button 
                      size="lg" 
                      className="w-full bg-royal-blue hover:bg-royal-blue/90 text-ivory mb-4"
                    >
                      Proceed to Checkout
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>

                  {/* Continue Shopping */}
                  <Link href="/shop">
                    <Button 
                      variant="outline" 
                      className="w-full border-silver text-charcoal hover:bg-silver"
                    >
                      Continue Shopping
                    </Button>
                  </Link>

                  {/* Trust Signals */}
                  <div className="mt-6 pt-6 border-t border-silver">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Shield className="h-4 w-4 text-royal-blue" />
                        <span className="text-muted-foreground">Secure checkout</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Truck className="h-4 w-4 text-royal-blue" />
                        <span className="text-muted-foreground">Free shipping over $500</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <RotateCcw className="h-4 w-4 text-royal-blue" />
                        <span className="text-muted-foreground">30-day returns</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}