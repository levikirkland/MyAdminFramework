<template>
  <div class="ma-shopping-cart" :class="{ 'is-drawer': variant === 'drawer' }">
    <div v-if="variant === 'drawer'" class="ma-cart-header">
      <h3 class="ma-cart-title">Shopping Cart</h3>
      <MaBadge :value="totalItems" :show-zero="false" color="primary">
        <ShoppingCart :size="20" />
      </MaBadge>
    </div>

    <div class="ma-cart-body">
      <div v-if="items.length === 0" class="ma-cart-empty">
        <ShoppingCart :size="48" class="empty-icon" />
        <p class="empty-text">Your cart is empty</p>
        <p class="empty-subtext">Add items to get started</p>
      </div>

      <div v-else class="ma-cart-items">
        <div v-for="item in items" :key="item.id" class="ma-cart-item">
          <div class="item-image">{{ item.image || '📦' }}</div>
          <div class="item-details">
            <div class="item-name">{{ item.name }}</div>
            <div class="item-category">{{ item.category }}</div>
            <div class="item-price">${{ formatPrice(item.price) }}</div>
          </div>
          <div class="item-actions">
            <div class="quantity-control">
              <button 
                class="quantity-btn" 
                @click="decreaseQuantity(item)"
                :disabled="item.quantity <= 1"
              >
                <Minus :size="14" />
              </button>
              <span class="quantity-value">{{ item.quantity }}</span>
              <button 
                class="quantity-btn" 
                @click="increaseQuantity(item)"
                :disabled="item.quantity >= (item.stock || 999)"
              >
                <Plus :size="14" />
              </button>
            </div>
            <button class="remove-btn" @click="removeItem(item)" :title="`Remove ${item.name}`">
              <Trash2 :size="16" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="items.length > 0" class="ma-cart-footer">
      <div class="cart-summary">
        <div class="summary-row">
          <span class="summary-label">Subtotal</span>
          <span class="summary-value">${{ formatPrice(subtotal) }}</span>
        </div>
        <div v-if="tax > 0" class="summary-row">
          <span class="summary-label">Tax ({{ taxRate * 100 }}%)</span>
          <span class="summary-value">${{ formatPrice(tax) }}</span>
        </div>
        <div v-if="shipping > 0" class="summary-row">
          <span class="summary-label">Shipping</span>
          <span class="summary-value">${{ formatPrice(shipping) }}</span>
        </div>
        <div class="summary-row total">
          <span class="summary-label">Total</span>
          <span class="summary-value">${{ formatPrice(total) }}</span>
        </div>
      </div>

      <div class="cart-actions">
        <slot name="actions">
          <MaButton color="secondary" @click="handleClear" block>Clear Cart</MaButton>
          <MaButton color="primary" @click="handleCheckout" block>Checkout</MaButton>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-vue-next'
import MaBadge from './MaBadge.vue'
import MaButton from './MaButton.vue'

export interface CartItem {
  id: number | string
  name: string
  price: number
  quantity: number
  category?: string
  image?: string
  stock?: number
}

const props = withDefaults(defineProps<{
  items: CartItem[]
  variant?: 'default' | 'drawer' | 'inline'
  taxRate?: number
  shipping?: number
}>(), {
  variant: 'default',
  taxRate: 0,
  shipping: 0
})

const emit = defineEmits<{
  'update:items': [items: CartItem[]]
  'increase-quantity': [item: CartItem]
  'decrease-quantity': [item: CartItem]
  'remove-item': [item: CartItem]
  'clear': []
  'checkout': []
}>()

const totalItems = computed(() => {
  return props.items.reduce((sum, item) => sum + item.quantity, 0)
})

const subtotal = computed(() => {
  return props.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const tax = computed(() => {
  return subtotal.value * props.taxRate
})

const total = computed(() => {
  return subtotal.value + tax.value + props.shipping
})

const formatPrice = (price: number): string => {
  return price.toFixed(2)
}

const increaseQuantity = (item: CartItem) => {
  emit('increase-quantity', item)
}

const decreaseQuantity = (item: CartItem) => {
  emit('decrease-quantity', item)
}

const removeItem = (item: CartItem) => {
  emit('remove-item', item)
}

const handleClear = () => {
  emit('clear')
}

const handleCheckout = () => {
  emit('checkout')
}
</script>

<style scoped>
.ma-shopping-cart {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--ma-bg-card);
  border: 1px solid var(--ma-border);
  border-radius: 8px;
}

.ma-shopping-cart.is-drawer {
  border: none;
  border-radius: 0;
}

.ma-cart-header {
  padding: 20px;
  border-bottom: 1px solid var(--ma-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ma-cart-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ma-text-main);
}

.ma-cart-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.ma-cart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.empty-icon {
  color: var(--ma-text-muted);
  opacity: 0.3;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--ma-text-main);
  margin: 0 0 8px 0;
}

.empty-subtext {
  color: var(--ma-text-muted);
  margin: 0;
}

.ma-cart-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ma-cart-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: var(--ma-bg-page);
  border: 1px solid var(--ma-border);
  border-radius: 8px;
  transition: all 0.2s;
}

.ma-cart-item:hover {
  border-color: var(--ma-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.item-image {
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  background: var(--ma-bg-card);
  border: 1px solid var(--ma-border);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.item-details {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-weight: 600;
  color: var(--ma-text-main);
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-category {
  font-size: 0.75rem;
  color: var(--ma-text-muted);
  text-transform: uppercase;
  margin-bottom: 6px;
}

.item-price {
  font-size: 1rem;
  font-weight: 600;
  color: var(--ma-primary);
}

.item-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--ma-bg-card);
  border: 1px solid var(--ma-border);
  border-radius: 6px;
  padding: 2px;
}

.quantity-btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--ma-text-main);
  border-radius: 4px;
  transition: all 0.2s;
}

.quantity-btn:hover:not(:disabled) {
  background: var(--ma-bg-page);
  color: var(--ma-primary);
}

.quantity-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.quantity-value {
  min-width: 24px;
  text-align: center;
  font-weight: 600;
  color: var(--ma-text-main);
  font-size: 0.875rem;
}

.remove-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--ma-border);
  border-radius: 6px;
  cursor: pointer;
  color: var(--ma-text-muted);
  transition: all 0.2s;
}

.remove-btn:hover {
  background: #fee;
  border-color: #ef4444;
  color: #ef4444;
}

.ma-cart-footer {
  border-top: 1px solid var(--ma-border);
  padding: 20px;
}

.cart-summary {
  margin-bottom: 16px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.summary-row.total {
  border-top: 2px solid var(--ma-border);
  margin-top: 8px;
  padding-top: 16px;
}

.summary-label {
  color: var(--ma-text-muted);
  font-size: 0.875rem;
}

.summary-row.total .summary-label {
  font-size: 1rem;
  font-weight: 600;
  color: var(--ma-text-main);
}

.summary-value {
  font-weight: 600;
  color: var(--ma-text-main);
}

.summary-row.total .summary-value {
  font-size: 1.25rem;
  color: var(--ma-primary);
}

.cart-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Scrollbar styling */
.ma-cart-body::-webkit-scrollbar {
  width: 6px;
}

.ma-cart-body::-webkit-scrollbar-track {
  background: transparent;
}

.ma-cart-body::-webkit-scrollbar-thumb {
  background: var(--ma-border);
  border-radius: 3px;
}

.ma-cart-body::-webkit-scrollbar-thumb:hover {
  background: var(--ma-text-muted);
}
</style>
