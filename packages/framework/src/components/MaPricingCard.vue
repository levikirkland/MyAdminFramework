<template>
  <div class="ma-pricing-card" :class="{ 'is-highlighted': highlighted }">
    <div class="ma-pricing-header">
      <h3 class="ma-pricing-title">{{ title }}</h3>
      <div class="ma-pricing-price">
        <span class="currency">{{ currency }}</span>
        <span class="amount">{{ price }}</span>
        <span class="period">/{{ period }}</span>
      </div>
    </div>

    <div class="ma-pricing-features">
      <div v-for="(feature, index) in features" :key="index" class="ma-feature-item">
        <svg class="check-icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>{{ feature }}</span>
      </div>
    </div>

    <div class="ma-pricing-action">
      <button class="ma-pricing-btn" @click="$emit('select')">{{ buttonText }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  price: string | number
  currency?: string
  period?: string
  features: string[]
  buttonText?: string
  highlighted?: boolean
}>(), {
  currency: '$',
  period: 'mo',
  buttonText: 'Choose Plan',
  highlighted: false
})

defineEmits(['select'])
</script>

<style scoped>
.ma-pricing-card {
  background: var(--ma-bg-card);
  border-radius: 16px;
  border: 1px solid var(--ma-border);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  transition: all 0.3s;
  position: relative;
}

.ma-pricing-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.06);
}

.ma-pricing-card.is-highlighted {
  border-color: var(--ma-primary);
  box-shadow: 0 8px 24px rgba(var(--ma-primary-rgb), 0.15);
  transform: scale(1.05);
  z-index: 1;
}

.ma-pricing-header {
  text-align: center;
}

.ma-pricing-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--ma-text-secondary);
  margin: 0 0 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ma-pricing-price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  color: var(--ma-text-main);
}

.currency {
  font-size: 24px;
  font-weight: 500;
  margin-right: 4px;
}

.amount {
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
}

.period {
  font-size: 16px;
  color: var(--ma-text-secondary);
  margin-left: 4px;
}

.ma-pricing-features {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ma-feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  color: var(--ma-text-main);
}

.check-icon {
  color: var(--ma-success);
  flex-shrink: 0;
}

.ma-pricing-btn {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
  border: 2px solid var(--ma-primary);
  color: var(--ma-primary);
}

.ma-pricing-btn:hover {
  background: var(--ma-primary-light);
}

.is-highlighted .ma-pricing-btn {
  background: var(--ma-primary);
  color: white;
}

.is-highlighted .ma-pricing-btn:hover {
  background: var(--ma-primary-hover);
  border-color: var(--ma-primary-hover);
}
</style>
