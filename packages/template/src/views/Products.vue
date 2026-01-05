<template>
  <div class="products-page">
    <div class="page-header">
      <div>
        <h1>Products</h1>
        <p>Manage your inventory and product listings.</p>
      </div>
      <div class="header-actions">
        <MaButton color="secondary" @click="cart.toggleCart()">
          <MaBadge :value="cart.totalItems.value" :show-zero="false" color="primary">
            <ShoppingCart :size="18" />
          </MaBadge>
          <span style="margin-left: 8px">Cart</span>
        </MaButton>
        <MaButton color="primary">+ New Product</MaButton>
      </div>
    </div>

    <div class="products-grid">
      <MaCard v-for="product in products" :key="product.id" class="product-card">
        <div class="product-image">📦</div>
        <div class="product-info">
          <div class="product-category">{{ product.category }}</div>
          <h3 class="product-name">{{ product.name }}</h3>
          <div class="product-price">${{ product.price }}</div>
          <div class="product-stock" :class="{ 'low-stock': product.stock < 10 }">
            Stock: {{ product.stock }} units
          </div>
        </div>
        <template #actions>
          <MaButton 
            color="primary" 
            @click="handleAddToCart(product)"
            :disabled="product.stock === 0"
          >
            <ShoppingCart :size="16" />
            {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
          </MaButton>
          <MaButton color="secondary">Edit</MaButton>
          <MaButton color="secondary" @click="openQuickView(product)">View</MaButton>
        </template>
      </MaCard>
    </div>

    <MaModal v-model="showQuickView" :title="selectedProduct?.name">
      <div v-if="selectedProduct" class="product-detail">
        <div class="detail-image">📦</div>
        <div class="detail-info">
          <div class="detail-row">
            <span class="detail-label">Category:</span>
            <span class="detail-value">{{ selectedProduct.category }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Price:</span>
            <span class="detail-value">${{ selectedProduct.price }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Stock:</span>
            <span class="detail-value">{{ selectedProduct.stock }} units</span>
          </div>
          <div class="detail-desc">
            <p>This is a detailed description of the {{ selectedProduct.name }}. It includes all the features and benefits of the product.</p>
          </div>
        </div>
      </div>
      <template #footer>
        <MaButton color="primary" @click="showQuickView = false">Close</MaButton>
      </template>
    </MaModal>

    <!-- Shopping Cart Drawer -->
    <MaDrawer v-model="cart.isCartOpen.value" title="Shopping Cart" width="450px">
      <MaShoppingCart
        :items="cart.items.value"
        variant="drawer"
        :tax-rate="0.08"
        :shipping="0"
        @increase-quantity="cart.increaseQuantity"
        @decrease-quantity="cart.decreaseQuantity"
        @remove-item="handleRemoveItem"
        @clear="handleClearCart"
        @checkout="handleCheckout"
      />
    </MaDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ShoppingCart } from 'lucide-vue-next'
import { useCart } from '../composables/useCart'
import { useToast } from 'my-admin-framework'

const router = useRouter()
const showQuickView = ref(false)
const selectedProduct = ref<any>(null)
const cart = useCart()
const toast = useToast()

const products = [
  { id: 1, name: 'Premium Subscription', category: 'Software', price: 99.00, stock: 150 },
  { id: 2, name: 'Enterprise License', category: 'Software', price: 499.00, stock: 45 },
  { id: 3, name: 'Basic Plan', category: 'Software', price: 49.00, stock: 8 },
  { id: 4, name: 'Consulting Hour', category: 'Service', price: 150.00, stock: 20 },
  { id: 5, name: 'API Access', category: 'Software', price: 29.00, stock: 500 },
  { id: 6, name: 'Custom Integration', category: 'Service', price: 1200.00, stock: 5 },
]

const openQuickView = (product: any) => {
  selectedProduct.value = product
  showQuickView.value = true
}

const handleAddToCart = (product: any) => {
  cart.addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category,
    stock: product.stock
  })
  toast.success(`${product.name} added to cart!`)
}

const handleRemoveItem = (item: any) => {
  cart.removeFromCart(item.id)
  toast.info(`${item.name} removed from cart`)
}

const handleClearCart = () => {
  cart.clearCart()
  toast.info('Cart cleared')
}

const handleCheckout = () => {
  if (cart.items.value.length === 0) {
    toast.warning('Your cart is empty')
    return
  }
  cart.closeCart()
  router.push('/checkout')
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.page-header h1 {
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: var(--ma-text-main);
}

.page-header p {
  color: var(--ma-text-muted);
  margin: 0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.product-card {
  display: flex;
  flex-direction: column;
}

.product-image {
  height: 160px;
  background: var(--ma-bg-page);
  border: 1px solid var(--ma-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  border-radius: 8px;
  margin-bottom: 16px;
}

.product-category {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--ma-text-muted);
  font-weight: 600;
  margin-bottom: 4px;
}

.product-name {
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: var(--ma-text-main);
}

.product-price {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ma-primary);
  margin-bottom: 8px;
}

.product-stock {
  font-size: 0.875rem;
  color: var(--ma-text-muted);
}

.product-stock.low-stock {
  color: #ef4444;
  font-weight: 600;
}

.product-detail {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.detail-image {
  height: 200px;
  background: var(--ma-bg-page);
  border: 1px solid var(--ma-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  border-radius: 12px;
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--ma-border);
}

.detail-label {
  font-weight: 600;
  color: var(--ma-text-muted);
}

.detail-value {
  color: var(--ma-text-main);
  font-weight: 600;
}

.detail-desc {
  margin-top: 12px;
  color: var(--ma-text-muted);
  line-height: 1.6;
}
</style>
