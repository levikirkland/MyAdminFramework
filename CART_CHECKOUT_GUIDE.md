# Shopping Cart & Checkout Components

Complete e-commerce flow components added to MyAdmin Framework.

## Components

### 1. MaShoppingCart

A comprehensive shopping cart component with full item management.

**Location:** `packages/framework/src/components/MaShoppingCart.vue`

**Features:**
- Item display with images, names, categories, and prices
- Quantity controls with stock limits
- Remove item functionality
- Empty state messaging
- Subtotal, tax, and shipping calculations
- Multiple variants: `default`, `drawer`, `inline`
- Customizable actions via slots

**Props:**
```typescript
{
  items: CartItem[]           // Array of cart items
  variant?: 'default' | 'drawer' | 'inline'
  taxRate?: number           // Tax rate (e.g., 0.08 for 8%)
  shipping?: number          // Shipping cost
}
```

**Events:**
- `increase-quantity` - Item quantity increased
- `decrease-quantity` - Item quantity decreased
- `remove-item` - Item removed from cart
- `clear` - Cart cleared
- `checkout` - Checkout initiated

**Usage Example:**
```vue
<MaShoppingCart
  :items="cartItems"
  variant="drawer"
  :tax-rate="0.08"
  :shipping="15.00"
  @checkout="handleCheckout"
  @remove-item="handleRemove"
/>
```

---

### 2. MaCheckout

Multi-step checkout component with shipping, payment, and order review.

**Location:** `packages/framework/src/components/MaCheckout.vue`

**Features:**
- 3-step checkout flow (Shipping → Payment → Review)
- Progress indicator
- Shipping and billing address forms
- Multiple payment methods (Card, PayPal, Bank Transfer)
- Order summary sidebar with real-time totals
- Promo code support
- Terms & conditions checkbox
- Responsive design
- Form validation

**Props:**
```typescript
{
  items: CheckoutItem[]           // Items to checkout
  shippingCost?: number          // Shipping fee
  taxRate?: number               // Tax rate
  discount?: number              // Discount amount
  showSteps?: boolean            // Show progress steps
  allowPromoCode?: boolean       // Enable promo codes
  allowBillingDifferent?: boolean // Allow different billing address
}
```

**Events:**
- `complete` - Order completed (provides full order data)
- `step-change` - Step changed (provides step index)
- `promo-applied` - Promo code applied

**Usage Example:**
```vue
<MaCheckout
  :items="checkoutItems"
  :shipping-cost="15.00"
  :tax-rate="0.08"
  @complete="handleOrderComplete"
  @promo-applied="handlePromo"
/>
```

---

## Composables

### useCart

Cart state management composable for the template app.

**Location:** `packages/template/src/composables/useCart.ts`

**Features:**
- Global cart state (reactive across components)
- Add/remove/update items
- Quantity management with stock validation
- Drawer toggle controls
- Computed totals

**API:**
```typescript
const cart = useCart()

// State
cart.items              // Reactive cart items
cart.totalItems         // Total item count
cart.subtotal           // Cart subtotal
cart.isCartOpen         // Drawer open state

// Methods
cart.addToCart(product)        // Add item to cart
cart.removeFromCart(id)        // Remove item by ID
cart.updateQuantity(id, qty)   // Update quantity
cart.increaseQuantity(item)    // Increase by 1
cart.decreaseQuantity(item)    // Decrease by 1
cart.clearCart()               // Clear all items
cart.openCart()                // Open drawer
cart.closeCart()               // Close drawer
cart.toggleCart()              // Toggle drawer
```

---

## Views

### Products Page

Enhanced with full cart integration.

**Location:** `packages/template/src/views/Products.vue`

**Features:**
- Cart button with badge showing item count
- "Add to Cart" buttons on product cards
- Cart drawer (slides from right)
- Stock validation (disables button if out of stock)
- Toast notifications for user feedback
- Navigate to checkout

### Checkout Page

Complete checkout flow with order confirmation.

**Location:** `packages/template/src/views/Checkout.vue`

**Features:**
- Full MaCheckout component integration
- Promo code validation (SAVE10, WELCOME20, SUMMER15)
- Order confirmation screen
- Order number generation
- Clears cart on completion
- Redirects to products if cart is empty

**Route:** `/checkout`

---

## Implementation Guide

### Quick Start

1. **Add items to cart:**
```vue
<script setup>
import { useCart } from '@/composables/useCart'
const cart = useCart()

const addProduct = (product) => {
  cart.addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category,
    stock: product.stock
  })
}
</script>
```

2. **Display cart:**
```vue
<template>
  <MaDrawer v-model="cart.isCartOpen.value" title="Cart">
    <MaShoppingCart
      :items="cart.items.value"
      variant="drawer"
      @checkout="goToCheckout"
    />
  </MaDrawer>
</template>
```

3. **Checkout flow:**
```vue
<MaCheckout
  :items="cart.items.value"
  @complete="handleOrder"
/>
```

---

## Customization

### Styling

All components use CSS variables from your design system:
- `--ma-primary` - Primary color
- `--ma-bg-card` - Card background
- `--ma-border` - Border color
- `--ma-text-main` - Main text color
- `--ma-text-muted` - Muted text color

### Actions Slot

Customize checkout footer buttons:
```vue
<MaShoppingCart :items="items">
  <template #actions>
    <MaButton @click="customAction">Custom Action</MaButton>
  </template>
</MaShoppingCart>
```

---

## Testing Promo Codes

Use these codes in checkout:
- `SAVE10` - $10 off
- `WELCOME20` - $20 off
- `SUMMER15` - $15 off

---

## Future Enhancements

Potential additions:
- Wishlist functionality
- Recently viewed items
- Product recommendations
- Save cart for later
- Guest checkout
- Multiple shipping addresses
- Gift wrapping options
- Order tracking page
- Invoice generation

---

Built with ❤️ for MyAdmin Framework
