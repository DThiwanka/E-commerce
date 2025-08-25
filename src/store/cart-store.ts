import { create } from 'zustand'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  color?: string
  size?: string
  sku: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getSubtotal: () => number
  getTax: () => number
  getShipping: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (item) => {
    const items = get().items
    const existingItem = items.find(i => i.id === item.id)

    if (existingItem) {
      set({
        items: items.map(i =>
          i.id === item.id
            ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1) }
            : i
        )
      })
    } else {
      set({
        items: [...items, { ...item, quantity: item.quantity || 1 }]
      })
    }
  },

  removeItem: (id) => {
    set({ items: get().items.filter(item => item.id !== id) })
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id)
      return
    }
    set({
      items: get().items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    })
  },

  clearCart: () => {
    set({ items: [] })
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  },

  getTotalPrice: () => {
    const subtotal = get().getSubtotal()
    const tax = get().getTax()
    const shipping = get().getShipping()
    return subtotal + tax + shipping
  },

  getSubtotal: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
  },

  getTax: () => {
    const subtotal = get().getSubtotal()
    return subtotal * 0.08 // 8% tax
  },

  getShipping: () => {
    const subtotal = get().getSubtotal()
    return subtotal >= 500 ? 0 : 15 // Free shipping over $500
  }
}))