import { ref, computed } from 'vue'

export interface CartItem {
  id: number | string
  name: string
  price: number
  quantity: number
  category?: string
  image?: string
  stock?: number
}

const cartItems = ref<CartItem[]>([])
const isCartOpen = ref(false)

export function useCart() {
  const items = computed(() => cartItems.value)
  
  const totalItems = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const subtotal = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  })

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    const existingItem = cartItems.value.find(item => item.id === product.id)
    
    if (existingItem) {
      // Check stock limit
      const maxStock = product.stock || 999
      if (existingItem.quantity < maxStock) {
        existingItem.quantity++
      }
    } else {
      cartItems.value.push({
        ...product,
        quantity: 1
      })
    }
  }

  const removeFromCart = (itemId: number | string) => {
    const index = cartItems.value.findIndex(item => item.id === itemId)
    if (index > -1) {
      cartItems.value.splice(index, 1)
    }
  }

  const updateQuantity = (itemId: number | string, quantity: number) => {
    const item = cartItems.value.find(item => item.id === itemId)
    if (item) {
      const maxStock = item.stock || 999
      item.quantity = Math.max(1, Math.min(quantity, maxStock))
    }
  }

  const increaseQuantity = (item: CartItem) => {
    const maxStock = item.stock || 999
    if (item.quantity < maxStock) {
      item.quantity++
    }
  }

  const decreaseQuantity = (item: CartItem) => {
    if (item.quantity > 1) {
      item.quantity--
    }
  }

  const clearCart = () => {
    cartItems.value = []
  }

  const openCart = () => {
    isCartOpen.value = true
  }

  const closeCart = () => {
    isCartOpen.value = false
  }

  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value
  }

  return {
    items,
    totalItems,
    subtotal,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart
  }
}
