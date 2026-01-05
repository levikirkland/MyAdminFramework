<template>
  <div class="ma-checkout">
    <!-- Progress Steps -->
    <div v-if="showSteps" class="checkout-steps">
      <div
        v-for="(step, index) in steps"
        :key="step.key"
        class="step"
        :class="{ active: currentStep === index, completed: currentStep > index }"
      >
        <div class="step-indicator">
          <Check v-if="currentStep > index" :size="16" />
          <span v-else>{{ index + 1 }}</span>
        </div>
        <span class="step-label">{{ step.label }}</span>
      </div>
    </div>

    <div class="checkout-content">
      <!-- Step 1: Shipping Information -->
      <div v-if="currentStep === 0" class="checkout-step">
        <h2 class="step-title">Shipping Information</h2>
        <div class="form-grid">
          <MaFormGroup label="Full Name" required>
            <MaInput v-model="shippingInfo.fullName" placeholder="John Doe" />
          </MaFormGroup>
          
          <MaFormGroup label="Email" required>
            <MaInput v-model="shippingInfo.email" type="email" placeholder="john@example.com" />
          </MaFormGroup>
          
          <MaFormGroup label="Phone" required>
            <MaInput v-model="shippingInfo.phone" placeholder="+1 (555) 123-4567" />
          </MaFormGroup>
          
          <MaFormGroup label="Address" required class="full-width">
            <MaInput v-model="shippingInfo.address" placeholder="123 Main Street" />
          </MaFormGroup>
          
          <MaFormGroup label="City" required>
            <MaInput v-model="shippingInfo.city" placeholder="New York" />
          </MaFormGroup>
          
          <MaFormGroup label="State/Province" required>
            <MaInput v-model="shippingInfo.state" placeholder="NY" />
          </MaFormGroup>
          
          <MaFormGroup label="Postal Code" required>
            <MaInput v-model="shippingInfo.postalCode" placeholder="10001" />
          </MaFormGroup>
          
          <MaFormGroup label="Country" required>
            <MaSelect v-model="shippingInfo.country" :options="countries" />
          </MaFormGroup>
        </div>

        <div v-if="allowBillingDifferent" class="billing-same">
          <MaCheckbox v-model="billingIsSame">
            Billing address is the same as shipping
          </MaCheckbox>
        </div>

        <div v-if="allowBillingDifferent && !billingIsSame" class="billing-section">
          <h3 class="section-subtitle">Billing Information</h3>
          <div class="form-grid">
            <MaFormGroup label="Address" required class="full-width">
              <MaInput v-model="billingInfo.address" placeholder="456 Billing St" />
            </MaFormGroup>
            
            <MaFormGroup label="City" required>
              <MaInput v-model="billingInfo.city" placeholder="Boston" />
            </MaFormGroup>
            
            <MaFormGroup label="State/Province" required>
              <MaInput v-model="billingInfo.state" placeholder="MA" />
            </MaFormGroup>
            
            <MaFormGroup label="Postal Code" required>
              <MaInput v-model="billingInfo.postalCode" placeholder="02101" />
            </MaFormGroup>
            
            <MaFormGroup label="Country" required>
              <MaSelect v-model="billingInfo.country" :options="countries" />
            </MaFormGroup>
          </div>
        </div>
      </div>

      <!-- Step 2: Payment Method -->
      <div v-if="currentStep === 1" class="checkout-step">
        <h2 class="step-title">Payment Method</h2>
        
        <div class="payment-methods">
          <div
            v-for="method in paymentMethods"
            :key="method.value"
            class="payment-method"
            :class="{ selected: paymentMethod === method.value }"
            @click="paymentMethod = method.value"
          >
            <component :is="method.icon" :size="24" />
            <span>{{ method.label }}</span>
            <div class="radio-indicator"></div>
          </div>
        </div>

        <div v-if="paymentMethod === 'card'" class="payment-form">
          <MaFormGroup label="Card Number" required>
            <MaInput v-model="cardInfo.number" placeholder="1234 5678 9012 3456" />
          </MaFormGroup>
          
          <div class="form-row">
            <MaFormGroup label="Expiry Date" required>
              <MaInput v-model="cardInfo.expiry" placeholder="MM/YY" />
            </MaFormGroup>
            
            <MaFormGroup label="CVV" required>
              <MaInput v-model="cardInfo.cvv" placeholder="123" type="password" />
            </MaFormGroup>
          </div>
          
          <MaFormGroup label="Cardholder Name" required>
            <MaInput v-model="cardInfo.name" placeholder="John Doe" />
          </MaFormGroup>
        </div>

        <div v-else-if="paymentMethod === 'paypal'" class="payment-info">
          <p>You will be redirected to PayPal to complete your purchase.</p>
        </div>

        <div v-else-if="paymentMethod === 'bank'" class="payment-info">
          <p>Bank transfer details will be provided after order confirmation.</p>
        </div>
      </div>

      <!-- Step 3: Review Order -->
      <div v-if="currentStep === 2" class="checkout-step">
        <h2 class="step-title">Review Your Order</h2>
        
        <div class="review-section">
          <h3 class="section-subtitle">Shipping Information</h3>
          <div class="info-card">
            <p><strong>{{ shippingInfo.fullName }}</strong></p>
            <p>{{ shippingInfo.address }}</p>
            <p>{{ shippingInfo.city }}, {{ shippingInfo.state }} {{ shippingInfo.postalCode }}</p>
            <p>{{ shippingInfo.country }}</p>
            <p>{{ shippingInfo.email }} • {{ shippingInfo.phone }}</p>
          </div>
        </div>

        <div class="review-section">
          <h3 class="section-subtitle">Payment Method</h3>
          <div class="info-card">
            <p>{{ paymentMethods.find(m => m.value === paymentMethod)?.label }}</p>
            <p v-if="paymentMethod === 'card'" class="muted">
              Card ending in {{ cardInfo.number.slice(-4) }}
            </p>
          </div>
        </div>

        <div class="review-section">
          <h3 class="section-subtitle">Order Items</h3>
          <div class="order-items">
            <div v-for="item in items" :key="item.id" class="order-item">
              <div class="item-image">{{ item.image || '📦' }}</div>
              <div class="item-info">
                <div class="item-name">{{ item.name }}</div>
                <div class="item-qty">Qty: {{ item.quantity }}</div>
              </div>
              <div class="item-price">${{ formatPrice(item.price * item.quantity) }}</div>
            </div>
          </div>
        </div>

        <div class="terms-section">
          <MaCheckbox v-model="agreedToTerms">
            I agree to the <a href="#" @click.prevent>Terms & Conditions</a> and 
            <a href="#" @click.prevent>Privacy Policy</a>
          </MaCheckbox>
        </div>
      </div>

      <!-- Order Summary Sidebar -->
      <div class="order-summary">
        <h3 class="summary-title">Order Summary</h3>
        
        <div class="summary-items">
          <div v-for="item in items" :key="item.id" class="summary-item">
            <span class="item-name">{{ item.name }} × {{ item.quantity }}</span>
            <span class="item-price">${{ formatPrice(item.price * item.quantity) }}</span>
          </div>
        </div>

        <div class="summary-totals">
          <div class="summary-row">
            <span>Subtotal</span>
            <span>${{ formatPrice(subtotal) }}</span>
          </div>
          <div v-if="shippingCost > 0" class="summary-row">
            <span>Shipping</span>
            <span>${{ formatPrice(shippingCost) }}</span>
          </div>
          <div v-if="tax > 0" class="summary-row">
            <span>Tax</span>
            <span>${{ formatPrice(tax) }}</span>
          </div>
          <div v-if="discount > 0" class="summary-row discount">
            <span>Discount</span>
            <span>-${{ formatPrice(discount) }}</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span>${{ formatPrice(total) }}</span>
          </div>
        </div>

        <div v-if="currentStep === 0 && allowPromoCode" class="promo-code">
          <MaInput v-model="promoCode" placeholder="Promo code" />
          <MaButton color="secondary" size="small" @click="applyPromoCode">Apply</MaButton>
        </div>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="checkout-actions">
      <MaButton v-if="currentStep > 0" color="secondary" @click="previousStep">
        <ChevronLeft :size="16" />
        Back
      </MaButton>
      
      <div style="flex: 1"></div>
      
      <MaButton
        v-if="currentStep < steps.length - 1"
        color="primary"
        @click="nextStep"
        :disabled="!canProceed"
      >
        Continue
        <ChevronRight :size="16" />
      </MaButton>
      
      <MaButton
        v-else
        color="primary"
        @click="completeOrder"
        :disabled="!agreedToTerms || processing"
        :loading="processing"
      >
        {{ processing ? 'Processing...' : `Place Order - $${formatPrice(total)}` }}
      </MaButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CreditCard, Wallet, Building2, Check, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import MaFormGroup from './MaFormGroup.vue'
import MaInput from './MaInput.vue'
import MaSelect from './MaSelect.vue'
import MaCheckbox from './MaCheckbox.vue'
import MaButton from './MaButton.vue'

export interface CheckoutItem {
  id: number | string
  name: string
  price: number
  quantity: number
  image?: string
}

const props = withDefaults(defineProps<{
  items: CheckoutItem[]
  shippingCost?: number
  taxRate?: number
  discount?: number
  showSteps?: boolean
  allowPromoCode?: boolean
  allowBillingDifferent?: boolean
}>(), {
  shippingCost: 0,
  taxRate: 0,
  discount: 0,
  showSteps: true,
  allowPromoCode: true,
  allowBillingDifferent: true
})

const emit = defineEmits<{
  'complete': [data: any]
  'step-change': [step: number]
  'promo-applied': [code: string]
}>()

const currentStep = ref(0)
const processing = ref(false)
const agreedToTerms = ref(false)
const billingIsSame = ref(true)
const promoCode = ref('')
const paymentMethod = ref('card')

const steps = [
  { key: 'shipping', label: 'Shipping' },
  { key: 'payment', label: 'Payment' },
  { key: 'review', label: 'Review' }
]

const shippingInfo = ref({
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'United States'
})

const billingInfo = ref({
  address: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'United States'
})

const cardInfo = ref({
  number: '',
  expiry: '',
  cvv: '',
  name: ''
})

const countries = [
  { label: 'United States', value: 'United States' },
  { label: 'Canada', value: 'Canada' },
  { label: 'United Kingdom', value: 'United Kingdom' },
  { label: 'Australia', value: 'Australia' },
  { label: 'Germany', value: 'Germany' },
  { label: 'France', value: 'France' }
]

const paymentMethods = [
  { label: 'Credit/Debit Card', value: 'card', icon: CreditCard },
  { label: 'PayPal', value: 'paypal', icon: Wallet },
  { label: 'Bank Transfer', value: 'bank', icon: Building2 }
]

const subtotal = computed(() => {
  return props.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const tax = computed(() => {
  return subtotal.value * props.taxRate
})

const total = computed(() => {
  return subtotal.value + props.shippingCost + tax.value - props.discount
})

const canProceed = computed(() => {
  if (currentStep.value === 0) {
    const required = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'postalCode', 'country']
    return required.every(field => shippingInfo.value[field as keyof typeof shippingInfo.value])
  }
  if (currentStep.value === 1) {
    if (paymentMethod.value === 'card') {
      return cardInfo.value.number && cardInfo.value.expiry && cardInfo.value.cvv && cardInfo.value.name
    }
    return true
  }
  return true
})

const formatPrice = (price: number): string => {
  return price.toFixed(2)
}

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
    emit('step-change', currentStep.value)
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
    emit('step-change', currentStep.value)
  }
}

const applyPromoCode = () => {
  if (promoCode.value) {
    emit('promo-applied', promoCode.value)
  }
}

const completeOrder = async () => {
  if (!agreedToTerms.value) return
  
  processing.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  const orderData = {
    shipping: shippingInfo.value,
    billing: billingIsSame.value ? shippingInfo.value : billingInfo.value,
    payment: {
      method: paymentMethod.value,
      ...(paymentMethod.value === 'card' ? { card: cardInfo.value } : {})
    },
    items: props.items,
    totals: {
      subtotal: subtotal.value,
      shipping: props.shippingCost,
      tax: tax.value,
      discount: props.discount,
      total: total.value
    },
    promoCode: promoCode.value
  }
  
  emit('complete', orderData)
  processing.value = false
}
</script>

<style scoped>
.ma-checkout {
  max-width: 1200px;
  margin: 0 auto;
}

.checkout-steps {
  display: flex;
  justify-content: center;
  margin-bottom: 48px;
  padding: 0 24px;
}

.step {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  flex: 1;
  max-width: 200px;
}

.step:not(:last-child)::after {
  content: '';
  position: absolute;
  left: calc(50% + 60px);
  top: 16px;
  width: calc(100% - 60px);
  height: 2px;
  background: var(--ma-border);
  z-index: -1;
}

.step.completed:not(:last-child)::after {
  background: var(--ma-primary);
}

.step-indicator {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--ma-bg-card);
  border: 2px solid var(--ma-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: var(--ma-text-muted);
  transition: all 0.3s;
}

.step.active .step-indicator {
  background: var(--ma-primary);
  border-color: var(--ma-primary);
  color: white;
}

.step.completed .step-indicator {
  background: var(--ma-primary);
  border-color: var(--ma-primary);
  color: white;
}

.step-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ma-text-muted);
}

.step.active .step-label {
  color: var(--ma-text-main);
  font-weight: 600;
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 32px;
  margin-bottom: 32px;
}

.checkout-step {
  background: var(--ma-bg-card);
  border: 1px solid var(--ma-border);
  border-radius: 12px;
  padding: 32px;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 24px 0;
  color: var(--ma-text-main);
}

.section-subtitle {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--ma-text-main);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-grid .full-width {
  grid-column: 1 / -1;
}

.form-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
}

.billing-same {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--ma-border);
}

.billing-section {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--ma-border);
}

.payment-methods {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.payment-method {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px;
  background: var(--ma-bg-page);
  border: 2px solid var(--ma-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.payment-method:hover {
  border-color: var(--ma-primary);
}

.payment-method.selected {
  border-color: var(--ma-primary);
  background: var(--ma-primary-light, rgba(59, 130, 246, 0.1));
}

.radio-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 16px;
  height: 16px;
  border: 2px solid var(--ma-border);
  border-radius: 50%;
}

.payment-method.selected .radio-indicator {
  border-color: var(--ma-primary);
  background: var(--ma-primary);
  box-shadow: inset 0 0 0 3px var(--ma-bg-card);
}

.payment-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.payment-info {
  padding: 20px;
  background: var(--ma-bg-page);
  border-radius: 8px;
  color: var(--ma-text-muted);
}

.review-section {
  margin-bottom: 24px;
}

.info-card {
  background: var(--ma-bg-page);
  border: 1px solid var(--ma-border);
  border-radius: 8px;
  padding: 16px;
}

.info-card p {
  margin: 4px 0;
  color: var(--ma-text-main);
}

.info-card .muted {
  color: var(--ma-text-muted);
  font-size: 0.875rem;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--ma-bg-page);
  border: 1px solid var(--ma-border);
  border-radius: 8px;
}

.order-item .item-image {
  width: 48px;
  height: 48px;
  background: var(--ma-bg-card);
  border: 1px solid var(--ma-border);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.order-item .item-info {
  flex: 1;
}

.order-item .item-name {
  font-weight: 600;
  color: var(--ma-text-main);
  margin-bottom: 4px;
}

.order-item .item-qty {
  font-size: 0.875rem;
  color: var(--ma-text-muted);
}

.order-item .item-price {
  font-weight: 600;
  color: var(--ma-primary);
}

.terms-section {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--ma-border);
}

.terms-section a {
  color: var(--ma-primary);
  text-decoration: none;
}

.terms-section a:hover {
  text-decoration: underline;
}

.order-summary {
  background: var(--ma-bg-card);
  border: 1px solid var(--ma-border);
  border-radius: 12px;
  padding: 24px;
  height: fit-content;
  position: sticky;
  top: 24px;
}

.summary-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--ma-text-main);
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--ma-border);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.summary-item .item-name {
  color: var(--ma-text-main);
  font-size: 0.875rem;
}

.summary-item .item-price {
  color: var(--ma-text-main);
  font-weight: 600;
  font-size: 0.875rem;
}

.summary-totals {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  color: var(--ma-text-muted);
  font-size: 0.875rem;
}

.summary-row.discount {
  color: var(--ma-success, #10b981);
}

.summary-row.total {
  margin-top: 8px;
  padding-top: 12px;
  border-top: 2px solid var(--ma-border);
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--ma-text-main);
}

.promo-code {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--ma-border);
  display: flex;
  gap: 8px;
}

.checkout-actions {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 24px;
  background: var(--ma-bg-card);
  border: 1px solid var(--ma-border);
  border-radius: 12px;
}

@media (max-width: 768px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }
  
  .order-summary {
    position: static;
  }
  
  .payment-methods {
    grid-template-columns: 1fr;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
