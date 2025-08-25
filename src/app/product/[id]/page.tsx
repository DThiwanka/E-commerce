'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackButton from '@/components/ui/back-button'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Heart, 
  Share2, 
  ShoppingCart, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import Image from 'next/image'

const productData = {
  id: '1',
  name: 'Luxury Silk Scarf',
  price: 299,
  originalPrice: 399,
  description: 'Indulge in the ultimate luxury with our exquisite silk scarf, crafted from the finest mulberry silk. This timeless accessory features an elegant pattern that complements any outfit, from casual chic to formal elegance.',
  features: [
    '100% Pure Mulberry Silk',
    'Hand-rolled edges',
    'Versatile 90x90 cm size',
    'Dry clean only',
    'Made in Italy'
  ],
  images: [
    'https://images.unsplash.com/photo-1590766940554-153a0b48a329?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590766940554-153a0b48a329?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590766940554-153a0b48a329?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590766940554-153a0b48a329?auto=format&fit=crop&w=800&q=80'
  ],
  category: 'Accessories',
  brand: 'LUXE Collection',
  sku: 'LUX-SC-001',
  inStock: true,
  rating: 4.8,
  reviews: 124,
  colors: [
    { name: 'Classic Blue', hex: '#1e3a8a', available: true },
    { name: 'Elegant Red', hex: '#7c2d12', available: true },
    { name: 'Timeless Black', hex: '#000000', available: false }
  ],
  sizes: ['One Size'],
  relatedProducts: [
    {
      id: 2,
      name: 'Designer Handbag',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1584917865442-89e75a8f4327?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      name: 'Premium Watch',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1523275335684-2d6115b6d5d3?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 4,
      name: 'Pearl Necklace',
      price: 799,
      image: 'https://images.unsplash.com/photo-1596944922819-d916f3b6b3c8?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 5,
      name: 'Leather Gloves',
      price: 199,
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=400&q=80'
    }
  ]
}

export default function ProductPage() {
  const params = useParams()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState(productData.colors[0])
  const [quantity, setQuantity] = useState(1)

  const handlePreviousImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? productData.images.length - 1 : prev - 1
    )
  }

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === productData.images.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <BackButton href="/shop" label="Back to Shop" />
          </div>
          
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
            <a href="/" className="hover:text-royal-blue">Home</a>
            <span>/</span>
            <a href="/shop" className="hover:text-royal-blue">Shop</a>
            <span>/</span>
            <a href={`/shop?category=${productData.category.toLowerCase()}`} className="hover:text-royal-blue">
              {productData.category}
            </a>
            <span>/</span>
            <span className="text-charcoal">{productData.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-lg bg-white">
                <Image
                  src={productData.images[selectedImageIndex]}
                  alt={productData.name}
                  width={800}
                  height={800}
                  className="w-full h-auto object-cover"
                />
                
                {/* Navigation Arrows */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePreviousImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-charcoal"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-2">
                {productData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImageIndex === index 
                        ? 'border-royal-blue' 
                        : 'border-transparent hover:border-silver'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${productData.name} view ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <Badge className="mb-2 bg-royal-blue text-ivory">New Arrival</Badge>
                <h1 className="text-3xl sm:text-4xl font-bold text-charcoal mb-2">
                  {productData.name}
                </h1>
                <p className="text-lg text-muted-foreground mb-4">
                  {productData.brand} • SKU: {productData.sku}
                </p>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${
                        i < Math.floor(productData.rating) ? 'text-gold fill-current' : 'text-gray-300'
                      }`} />
                    ))}
                  </div>
                  <span className="text-lg font-medium text-charcoal">
                    {productData.rating}
                  </span>
                  <span className="text-muted-foreground">
                    ({productData.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-bold text-charcoal">
                    ${productData.price}
                  </span>
                  {productData.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ${productData.originalPrice}
                    </span>
                  )}
                  <Badge variant="destructive" className="bg-red-600">
                    Save ${productData.originalPrice! - productData.price}
                  </Badge>
                </div>
              </div>

              {/* Description */}
              <p className="text-lg text-muted-foreground leading-relaxed">
                {productData.description}
              </p>

              {/* Product Options */}
              <div className="space-y-6">
                {/* Color Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-3">Color</h3>
                  <div className="flex gap-3">
                    {productData.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        disabled={!color.available}
                        className={`relative p-2 rounded-lg border-2 transition-all ${
                          selectedColor.name === color.name
                            ? 'border-royal-blue'
                            : 'border-silver hover:border-charcoal'
                        } ${!color.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div
                          className="w-8 h-8 rounded-full border border-gray-300"
                          style={{ backgroundColor: color.hex }}
                        />
                        {!color.available && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-0.5 bg-red-600 rotate-45"></div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Selected: {selectedColor.name}
                  </p>
                </div>

                {/* Quantity */}
                <div>
                  <h3 className="text-lg font-semibold text-charcoal mb-3">Quantity</h3>
                  <Select value={quantity.toString()} onValueChange={(value) => setQuantity(parseInt(value))}>
                    <SelectTrigger className="w-32 border-silver focus:border-royal-blue focus:ring-royal-blue">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((qty) => (
                        <SelectItem key={qty} value={qty.toString()}>
                          {qty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="flex-1 bg-royal-blue hover:bg-royal-blue/90 text-ivory"
                    disabled={!productData.inStock}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button size="lg" variant="outline" className="border-silver">
                    <Heart className="h-5 w-5 mr-2" />
                    Wishlist
                  </Button>
                  <Button size="lg" variant="outline" className="border-silver">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                {/* Trust Signals */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-silver">
                  <div className="flex items-center gap-3">
                    <Truck className="h-6 w-6 text-royal-blue" />
                    <div>
                      <p className="font-medium text-charcoal">Free Shipping</p>
                      <p className="text-sm text-muted-foreground">On orders over $500</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-royal-blue" />
                    <div>
                      <p className="font-medium text-charcoal">Secure Payment</p>
                      <p className="text-sm text-muted-foreground">100% secure</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="h-6 w-6 text-royal-blue" />
                    <div>
                      <p className="font-medium text-charcoal">Easy Returns</p>
                      <p className="text-sm text-muted-foreground">30-day policy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Information Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-charcoal mb-4">Product Description</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {productData.description}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      This luxurious silk scarf is the perfect accessory to elevate any outfit. 
                      Crafted with attention to every detail, it features a sophisticated pattern 
                      that reflects the timeless elegance of Italian craftsmanship. The lightweight 
                      silk fabric drapes beautifully, making it versatile enough to be worn in 
                      multiple ways - as a neck scarf, headband, or even as a bag accessory.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="features" className="mt-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-charcoal mb-4">Key Features</h3>
                    <ul className="space-y-2">
                      {productData.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-royal-blue rounded-full"></div>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-charcoal mb-4">Customer Reviews</h3>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Reviews coming soon...</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="shipping" className="mt-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-charcoal mb-4">Shipping & Returns</h3>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        <strong>Shipping:</strong> Free express shipping on orders over $500. 
                        Standard shipping takes 3-5 business days.
                      </p>
                      <p>
                        <strong>Returns:</strong> 30-day return policy. Items must be unused 
                        and in original packaging.
                      </p>
                      <p>
                        <strong>International:</strong> We ship worldwide. Customs fees may apply.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-charcoal mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {productData.relatedProducts.map((product) => (
                <Card key={product.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4 bg-white">
                    <h3 className="text-lg font-semibold text-charcoal mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-charcoal">${product.price}</span>
                      <Button size="sm" className="bg-royal-blue hover:bg-royal-blue/90 text-ivory">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}