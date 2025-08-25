'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackButton from '@/components/ui/back-button'
import { useCartStore } from '@/store/cart-store'
import { useAuthStore } from '@/store/auth-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft, 
  ArrowRight, 
  Truck, 
  Shield, 
  CreditCard,
  MapPin,
  User,
  Mail,
  Phone,
  CheckCircle,
  Package,
  Download,
  Eye,
  Home,
  ShoppingBag
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from '@/hooks/use-toast'

type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'confirmation'

interface OrderData {
  id: string
  status: string
  total: number
  createdAt: string
  items: Array<{
    id: string
    productId: string
    quantity: number
    price: number
    product: {
      id: string
      name: string
      image: string
      sku: string
    }
  }>
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, getSubtotal, getTax, getShipping, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping')
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderData, setOrderData] = useState<OrderData | null>(null)

  // Shipping form state
  const [shippingInfo, setShippingInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phone: '',
    saveInfo: false
  })

  // Payment form state
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    savePayment: false
  })

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-ivory">
        <Header />
        
        <main className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold text-charcoal mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Add some items to your cart to proceed with checkout.
              </p>
              <Link href="/shop">
                <Button size="lg" className="bg-royal-blue hover:bg-royal-blue/90 text-ivory">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    )
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep('payment')
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    try {
      // Prepare order data
      const orderPayload = {
        userId: user?.id,
        email: shippingInfo.email,
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        address: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        zipCode: shippingInfo.zipCode,
        country: shippingInfo.country,
        phone: shippingInfo.phone,
        subtotal: getSubtotal(),
        tax: getTax(),
        shipping: getShipping(),
        total: getTotalPrice(),
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          sku: item.sku,
          color: item.color
        }))
      }

      // Create order via API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      })

      const data = await response.json()

      if (response.ok) {
        setOrderData(data.order)
        setCurrentStep('confirmation')
        clearCart()
        toast({
          title: "Order Placed Successfully!",
          description: `Order #${data.order.id.slice(-8)} has been confirmed.`,
        })
      } else {
        throw new Error(data.error || 'Failed to create order')
      }
    } catch (error) {
      console.error('Order creation error:', error)
      toast({
        title: "Order Failed",
        description: error instanceof Error ? error.message : "Failed to place order. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const updateShippingInfo = (field: string, value: string | boolean) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }))
  }

  const updatePaymentInfo = (field: string, value: string | boolean) => {
    setPaymentInfo(prev => ({ ...prev, [field]: value }))
  }

  const CheckoutSteps = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        <div className={`flex items-center ${currentStep === 'shipping' ? 'text-royal-blue' : 'text-muted-foreground'}`}>
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
            currentStep === 'shipping' ? 'border-royal-blue bg-royal-blue text-ivory' : 'border-silver'
          }`}>
            1
          </div>
          <span className="ml-2 font-medium">Shipping</span>
        </div>
        
        <div className="w-16 h-0.5 bg-silver"></div>
        
        <div className={`flex items-center ${currentStep === 'payment' || currentStep === 'confirmation' ? 'text-royal-blue' : 'text-muted-foreground'}`}>
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
            currentStep === 'payment' || currentStep === 'confirmation' ? 'border-royal-blue bg-royal-blue text-ivory' : 'border-silver'
          }`}>
            2
          </div>
          <span className="ml-2 font-medium">Payment</span>
        </div>
        
        <div className="w-16 h-0.5 bg-silver"></div>
        
        <div className={`flex items-center ${currentStep === 'confirmation' ? 'text-royal-blue' : 'text-muted-foreground'}`}>
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
            currentStep === 'confirmation' ? 'border-royal-blue bg-royal-blue text-ivory' : 'border-silver'
          }`}>
            3
          </div>
          <span className="ml-2 font-medium">Confirmation</span>
        </div>
      </div>
    </div>
  )

  const OrderSummary = () => (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-charcoal">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-charcoal truncate">
                  {item.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  Qty: {item.quantity}
                </p>
                {item.color && (
                  <Badge variant="secondary" className="text-xs mt-1">
                    {item.color}
                  </Badge>
                )}
              </div>
              <div className="text-sm font-semibold text-charcoal">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
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

          <Separator />

          <div className="flex justify-between">
            <span className="text-lg font-semibold text-charcoal">Total</span>
            <span className="text-xl font-bold text-charcoal">
              ${getTotalPrice().toFixed(2)}
            </span>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="pt-4 border-t">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-royal-blue" />
              <span className="text-muted-foreground">Secure checkout</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-4 w-4 text-royal-blue" />
              <span className="text-muted-foreground">Free shipping over $500</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const ConfirmationSection = () => {
    if (!orderData) return null

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'PENDING': return 'bg-yellow-100 text-yellow-800'
        case 'PROCESSING': return 'bg-blue-100 text-blue-800'
        case 'SHIPPED': return 'bg-purple-100 text-purple-800'
        case 'DELIVERED': return 'bg-green-100 text-green-800'
        case 'CANCELLED': return 'bg-red-100 text-red-800'
        default: return 'bg-gray-100 text-gray-800'
      }
    }

    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-charcoal mb-4">
            Order Confirmed!
          </h2>
          
          <p className="text-lg text-gray-600 mb-2">
            Thank you for your purchase, {shippingInfo.firstName}!
          </p>
          
          <p className="text-gray-600 mb-6">
            Order confirmation will be sent to: <span className="font-semibold text-charcoal">{shippingInfo.email}</span>
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold text-charcoal">Order #{orderData.id.slice(-8)}</h3>
                <p className="text-sm text-gray-600">
                  Placed on {new Date(orderData.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Badge className={getStatusColor(orderData.status)}>
                {orderData.status}
              </Badge>
            </div>

            <Separator className="my-4" />

            {/* Order Items */}
            <div className="space-y-3 mb-4">
              <h4 className="font-medium text-charcoal">Order Items:</h4>
              {orderData.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-sm">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-charcoal">{item.product.name}</p>
                    <p className="text-gray-600">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                  </div>
                  <div className="font-semibold text-charcoal">
                    ${(item.quantity * item.price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-charcoal">Total</span>
              <span className="text-xl font-bold text-charcoal">
                ${orderData.total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => router.push('/account')}
            >
              <Eye className="h-4 w-4" />
              View Order Details
            </Button>
            
            <Button 
              className="flex items-center gap-2 bg-royal-blue hover:bg-royal-blue/90"
              onClick={() => router.push('/shop')}
            >
              <ShoppingBag className="h-4 w-4" />
              Continue Shopping
            </Button>
          </div>

          {/* Shipping Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg text-left">
            <div className="flex items-center gap-2 mb-2">
              <Truck className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Shipping Information</h4>
            </div>
            <div className="text-sm text-blue-800">
              <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
              <p>{shippingInfo.address}</p>
              <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
              <p>{shippingInfo.country}</p>
              <p className="mt-2">Phone: {shippingInfo.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {currentStep !== 'confirmation' && (
            <div className="mb-8">
              <BackButton href="/cart" label="Back to Cart" />
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold text-charcoal mb-8 text-center">
            {currentStep === 'confirmation' ? 'Order Confirmation' : 'Checkout'}
          </h1>

          <CheckoutSteps />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {currentStep === 'shipping' && (
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-charcoal flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleShippingSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={shippingInfo.email}
                            onChange={(e) => updateShippingInfo('email', e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={shippingInfo.phone}
                            onChange={(e) => updateShippingInfo('phone', e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={shippingInfo.firstName}
                            onChange={(e) => updateShippingInfo('firstName', e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={shippingInfo.lastName}
                            onChange={(e) => updateShippingInfo('lastName', e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          value={shippingInfo.address}
                          onChange={(e) => updateShippingInfo('address', e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={shippingInfo.city}
                            onChange={(e) => updateShippingInfo('city', e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={shippingInfo.state}
                            onChange={(e) => updateShippingInfo('state', e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input
                            id="zipCode"
                            value={shippingInfo.zipCode}
                            onChange={(e) => updateShippingInfo('zipCode', e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Select value={shippingInfo.country} onValueChange={(value) => updateShippingInfo('country', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="UK">United Kingdom</SelectItem>
                            <SelectItem value="AU">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="saveInfo"
                          checked={shippingInfo.saveInfo}
                          onCheckedChange={(checked) => updateShippingInfo('saveInfo', checked as boolean)}
                        />
                        <Label htmlFor="saveInfo" className="text-sm">
                          Save this information for next time
                        </Label>
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full bg-royal-blue hover:bg-royal-blue/90 text-ivory"
                      >
                        Continue to Payment
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {currentStep === 'payment' && (
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-charcoal flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentInfo.cardNumber}
                          onChange={(e) => updatePaymentInfo('cardNumber', e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={paymentInfo.expiryDate}
                            onChange={(e) => updatePaymentInfo('expiryDate', e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={paymentInfo.cvv}
                            onChange={(e) => updatePaymentInfo('cvv', e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="nameOnCard">Name on Card</Label>
                        <Input
                          id="nameOnCard"
                          value={paymentInfo.nameOnCard}
                          onChange={(e) => updatePaymentInfo('nameOnCard', e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="savePayment"
                          checked={paymentInfo.savePayment}
                          onCheckedChange={(checked) => updatePaymentInfo('savePayment', checked as boolean)}
                        />
                        <Label htmlFor="savePayment" className="text-sm">
                          Save payment method for future purchases
                        </Label>
                      </div>

                      <div className="bg-gold/10 border border-gold rounded-lg p-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Shield className="h-4 w-4 text-gold" />
                          <span className="text-gold font-medium">
                            Your payment information is encrypted and secure
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setCurrentStep('shipping')}
                          className="flex-1 border-silver text-charcoal"
                        >
                          Back to Shipping
                        </Button>
                        <Button 
                          type="submit" 
                          size="lg" 
                          className="flex-1 bg-royal-blue hover:bg-royal-blue/90 text-ivory"
                          disabled={isProcessing}
                        >
                          {isProcessing ? 'Processing...' : 'Complete Order'}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {currentStep === 'confirmation' && (
                <ConfirmationSection />
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {currentStep !== 'confirmation' && <OrderSummary />}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}