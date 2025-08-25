import Link from 'next/link'
import { Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-royal-blue rounded-full"></div>
              <span className="text-xl font-bold">LUXE</span>
            </div>
            <p className="text-ivory/80 mb-4">
              Discover timeless elegance and premium luxury fashion for the modern lifestyle.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 hover:text-gold cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 hover:text-gold cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 hover:text-gold cursor-pointer transition-colors" />
              <MessageCircle className="h-5 w-5 hover:text-gold cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/shop" className="text-ivory/80 hover:text-gold transition-colors">All Products</Link></li>
              <li><Link href="/collections" className="text-ivory/80 hover:text-gold transition-colors">Collections</Link></li>
              <li><Link href="/new-arrivals" className="text-ivory/80 hover:text-gold transition-colors">New Arrivals</Link></li>
              <li><Link href="/bestsellers" className="text-ivory/80 hover:text-gold transition-colors">Bestsellers</Link></li>
              <li><Link href="/sale" className="text-ivory/80 hover:text-gold transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-ivory/80 hover:text-gold transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="text-ivory/80 hover:text-gold transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-ivory/80 hover:text-gold transition-colors">Returns</Link></li>
              <li><Link href="/size-guide" className="text-ivory/80 hover:text-gold transition-colors">Size Guide</Link></li>
              <li><Link href="/faq" className="text-ivory/80 hover:text-gold transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-ivory/80 hover:text-gold transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-ivory/80 hover:text-gold transition-colors">Careers</Link></li>
              <li><Link href="/press" className="text-ivory/80 hover:text-gold transition-colors">Press</Link></li>
              <li><Link href="/sustainability" className="text-ivory/80 hover:text-gold transition-colors">Sustainability</Link></li>
              <li><Link href="/privacy" className="text-ivory/80 hover:text-gold transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ivory/20 mt-8 pt-8 text-center">
          <p className="text-ivory/60">
            © 2024 LUXE. All rights reserved. | Designed with passion for luxury fashion.
          </p>
        </div>
      </div>
    </footer>
  )
}