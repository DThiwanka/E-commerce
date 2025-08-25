import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

interface WishlistState {
  items: WishlistItem[]
  addItem: (product: { id: string; name: string; price: number; image: string }) => void
  removeItem: (productId: string) => void
  toggleItem: (product: { id: string; name: string; price: number; image: string }) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const currentItems = get().items
        const existingItem = currentItems.find(item => item.productId === product.id)

        if (!existingItem) {
          const newItem: WishlistItem = {
            id: `wishlist-${Date.now()}`,
            productId: product.id,
            product,
            createdAt: new Date().toISOString()
          }
          
          set({ items: [...currentItems, newItem] })
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter(item => item.productId !== productId) })
      },

      toggleItem: (product) => {
        const currentItems = get().items
        const existingItem = currentItems.find(item => item.productId === product.id)

        if (existingItem) {
          get().removeItem(product.id)
        } else {
          get().addItem(product)
        }
      },

      isInWishlist: (productId) => {
        return get().items.some(item => item.productId === productId)
      },

      clearWishlist: () => {
        set({ items: [] })
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
)