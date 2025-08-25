'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Search, Menu, User, Heart } from 'lucide-react'
import CartDrawer from './CartDrawer'
import AuthModal from './auth/AuthModal'
import { useAuthStore } from '@/store/auth-store'
import { useWishlistStore } from '@/store/wishlist-store'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuthStore()
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-silver bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-royal-blue rounded-full"></div>
              <span className="text-xl font-bold text-charcoal">LUXE</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/shop" className="text-charcoal hover:text-royal-blue transition-colors">
              Shop
            </Link>
            <Link href="/collections" className="text-charcoal hover:text-royal-blue transition-colors">
              Collections
            </Link>
            <Link href="/about" className="text-charcoal hover:text-royal-blue transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-charcoal hover:text-royal-blue transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4" role="navigation" aria-label="User actions">
            {/* Search */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-charcoal hover:text-royal-blue"
              aria-label={isSearchOpen ? "Close search" : "Open search"}
              aria-expanded={isSearchOpen}
              aria-controls="search-bar"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* User Account */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                {user?.role === 'ADMIN' && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-charcoal hover:text-royal-blue"
                    onClick={() => router.push('/admin')}
                    aria-label="Admin dashboard"
                    title="Admin Dashboard"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-charcoal hover:text-royal-blue"
                  onClick={() => router.push('/account')}
                  aria-label="My account"
                  title="My Account"
                >
                  <User className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-charcoal hover:text-royal-blue"
                onClick={() => setIsAuthModalOpen(true)}
                aria-label="Sign in"
                title="Sign In"
              >
                <User className="h-5 w-5" />
              </Button>
            )}

            {/* Wishlist */}
            <Link href="/wishlist" aria-label="Wishlist">
              <Button variant="ghost" size="icon" className="text-charcoal hover:text-royal-blue relative">
                <Heart className="h-5 w-5" />
                {isAuthenticated && useWishlistStore.getState().items.length > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-xs flex items-center justify-center p-0"
                    aria-label={`${useWishlistStore.getState().items.length} items in wishlist`}
                  >
                    {useWishlistStore.getState().items.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <div className="flex items-center">
              <CartDrawer />
            </div>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-charcoal">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link href="/shop" className="text-charcoal hover:text-royal-blue transition-colors py-2">
                    Shop
                  </Link>
                  <Link href="/collections" className="text-charcoal hover:text-royal-blue transition-colors py-2">
                    Collections
                  </Link>
                  <Link href="/about" className="text-charcoal hover:text-royal-blue transition-colors py-2">
                    About
                  </Link>
                  <Link href="/contact" className="text-charcoal hover:text-royal-blue transition-colors py-2">
                    Contact
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div id="search-bar" className="pb-4" role="search">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border-silver focus:border-royal-blue focus:ring-royal-blue"
                aria-label="Search products"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" aria-hidden="true" />
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  )
}