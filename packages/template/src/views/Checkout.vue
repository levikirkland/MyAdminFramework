<template>
  <div class="checkout-page">
    <div v-if="!orderCompleted" class="checkout-container">
      <div class="page-header">
        <h1>Checkout</h1>
        <p>Complete your purchase securely</p>
      </div>

      <MaCheckout
        :items="checkoutItems"
        :shipping-cost="15.00"
        :tax-rate="0.08"
        :discount="discount"
        @complete="handleOrderComplete"
        @promo-applied="handlePromoCode"
      />
    </div>

    <!-- Order Confirmation -->
    <div v-else class="order-confirmation">
      <div class="confirmation-card">
        <div class="success-icon">
          <CheckCircle :size="64" />
        </div>
        <h1>Order Confirmed!</h1>
        <p class="confirmation-text">
          Thank you for your order. A confirmation email has been sent to 
          <strong>{{ orderData.shipping.email }}</strong>
        </p>
        
        <div class="order-details">
          <div class="detail-row">
            <span class="label">Order Number:</span>
            <span class="value">#{{ orderNumber }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Order Date:</span>
            <span class="value">{{ orderDate }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Total Amount:</span>
            <span class="value">${{ orderData.totals.total.toFixed(2) }}</span>
          </div>
        </div>

        <div class="confirmation-actions">
          <MaButton color="primary" @click="viewOrderDetails">
            View Order Details
          </MaButton>
          <MaButton color="secondary" @click="continueShopping">
            Continue Shopping
          </MaButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { CheckCircle } from 'lucide-vue-next'
import { useCart } from '../composables/useCart'
import { useToast } from 'my-admin-framework'

const router = useRouter()
const cart = useCart()
const toast = useToast()

const orderCompleted = ref(false)
const orderData = ref<any>(null)
const orderNumber = ref('')
const discount = ref(0)

const checkoutItems = computed(() => {
  return cart.items.value.map(item => ({
    id: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image
  }))
})

const orderDate = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

onMounted(() => {
  // Redirect if cart is empty
  if (cart.items.value.length === 0) {
    toast.warning('Your cart is empty')
    router.push('/products')
  }
})

const handlePromoCode = (code: string) => {
  // Simulate promo code validation
  const validCodes: Record<string, number> = {
    'SAVE10': 10,
    'WELCOME20': 20,
    'SUMMER15': 15
  }
  
  const upperCode = code.toUpperCase()
  if (validCodes[upperCode]) {
    discount.value = validCodes[upperCode]
    toast.success(`Promo code applied! You saved $${discount.value}`)
  } else {
    toast.error('Invalid promo code')
  }
}

const handleOrderComplete = (data: any) => {
  orderData.value = data
  orderNumber.value = `ORD-${Date.now().toString().slice(-8)}`
  orderCompleted.value = true
  
  // Clear the cart
  cart.clearCart()
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' })
  
  console.log('Order completed:', { orderNumber: orderNumber.value, ...data })
}

const viewOrderDetails = () => {
  toast.info('Order tracking page coming soon!')
  // router.push(`/orders/${orderNumber.value}`)
}

const continueShopping = () => {
  router.push('/products')
}
</script>

<style scoped>
.checkout-page {
  min-height: calc(100vh - 120px);
  padding: 32px;
}

.checkout-container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: var(--ma-text-main);
}

.page-header p {
  color: var(--ma-text-muted);
  margin: 0;
}

.order-confirmation {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 600px;
}

.confirmation-card {
  background: var(--ma-bg-card);
  border: 1px solid var(--ma-border);
  border-radius: 16px;
  padding: 48px;
  max-width: 600px;
  text-align: center;
}

.success-icon {
  color: var(--ma-success, #10b981);
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}

.confirmation-card h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: var(--ma-text-main);
}

.confirmation-text {
  color: var(--ma-text-muted);
  margin: 0 0 32px 0;
  line-height: 1.6;
}

.order-details {
  background: var(--ma-bg-page);
  border: 1px solid var(--ma-border);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
}

.detail-row:not(:last-child) {
  border-bottom: 1px solid var(--ma-border);
}

.detail-row .label {
  color: var(--ma-text-muted);
  font-weight: 500;
}

.detail-row .value {
  color: var(--ma-text-main);
  font-weight: 600;
}

.confirmation-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

@media (max-width: 768px) {
  .checkout-page {
    padding: 16px;
  }
  
  .confirmation-card {
    padding: 32px 24px;
  }
  
  .confirmation-actions {
    flex-direction: column;
  }
}
</style>
