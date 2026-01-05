<template>
  <article class="ma-property-card" :class="[`ma-property-card--${variant}`, { 'ma-property-card--featured': featured }]">
    <!-- Status Badge -->
    <div v-if="status" class="ma-property-card__status" :class="`ma-property-card__status--${status.toLowerCase().replace(' ', '-')}`">
      {{ status }}
    </div>

    <!-- Featured Badge -->
    <div v-if="featured" class="ma-property-card__featured-badge">
      <Star :size="12" fill="currentColor" />
      Featured
    </div>

    <!-- Image Gallery -->
    <div class="ma-property-card__images">
      <div class="ma-property-card__image-main">
        <img :src="currentImage" :alt="title" />
        <div v-if="images && images.length > 1" class="ma-property-card__image-nav">
          <button 
            v-for="(_image, index) in images.slice(0, 4)" 
            :key="index"
            :class="{ 'active': currentImageIndex === index }"
            @click="currentImageIndex = index"
          >
            <span v-if="index === 3 && images.length > 4">+{{ images.length - 3 }}</span>
          </button>
        </div>
      </div>
      <button v-if="showFavorite" class="ma-property-card__favorite" @click="toggleFavorite">
        <Heart :size="20" :fill="isFavorited ? 'currentColor' : 'none'" />
      </button>
    </div>

    <!-- Content -->
    <div class="ma-property-card__content">
      <!-- Price -->
      <div class="ma-property-card__price-row">
        <div class="ma-property-card__price">
          {{ formatPrice(price) }}
          <span v-if="priceFrequency" class="ma-property-card__price-frequency">/{{ priceFrequency }}</span>
        </div>
        <div v-if="propertyType" class="ma-property-card__type">
          {{ propertyType }}
        </div>
      </div>

      <!-- Title & Location -->
      <h3 class="ma-property-card__title">
        <a v-if="url" :href="url" @click.prevent="handleClick">{{ title }}</a>
        <span v-else>{{ title }}</span>
      </h3>
      <div class="ma-property-card__location">
        <MapPin :size="14" />
        {{ location }}
      </div>

      <!-- Specs -->
      <div class="ma-property-card__specs">
        <div v-if="bedrooms" class="ma-property-card__spec">
          <Bed :size="16" />
          <span>{{ bedrooms }} <span class="spec-label">bed</span></span>
        </div>
        <div v-if="bathrooms" class="ma-property-card__spec">
          <Bath :size="16" />
          <span>{{ bathrooms }} <span class="spec-label">bath</span></span>
        </div>
        <div v-if="area" class="ma-property-card__spec">
          <Maximize2 :size="16" />
          <span>{{ area }} <span class="spec-label">{{ areaUnit }}</span></span>
        </div>
      </div>

      <!-- Features -->
      <div v-if="features && features.length && variant !== 'compact'" class="ma-property-card__features">
        <span v-for="feature in displayFeatures" :key="feature" class="ma-property-card__feature">
          <Check :size="12" />
          {{ feature }}
        </span>
        <span v-if="features.length > maxFeatures" class="ma-property-card__feature ma-property-card__feature--more">
          +{{ features.length - maxFeatures }} more
        </span>
      </div>

      <!-- Agent -->
      <div v-if="agent" class="ma-property-card__agent">
        <div v-if="agent.avatar" class="ma-property-card__agent-avatar">
          <img :src="agent.avatar" :alt="agent.name" />
        </div>
        <div v-else class="ma-property-card__agent-avatar ma-property-card__agent-avatar--placeholder">
          {{ getAgentInitials(agent.name) }}
        </div>
        <div class="ma-property-card__agent-info">
          <div class="ma-property-card__agent-name">{{ agent.name }}</div>
          <div v-if="agent.company" class="ma-property-card__agent-company">{{ agent.company }}</div>
        </div>
        <button v-if="showContact" class="ma-property-card__contact-btn" @click="handleContact">
          <Phone :size="16" />
          Contact
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { MapPin, Bed, Bath, Maximize2, Heart, Star, Check, Phone } from 'lucide-vue-next'

interface Agent {
  name: string
  company?: string
  avatar?: string
  phone?: string
  email?: string
}

interface Props {
  title: string
  price: number | string
  priceFrequency?: 'month' | 'week' | 'night'
  location: string
  images: string[]
  bedrooms?: number
  bathrooms?: number
  area?: number
  areaUnit?: 'sqft' | 'sqm'
  propertyType?: string
  status?: 'For Sale' | 'For Rent' | 'Sold' | 'Pending' | 'New Listing'
  features?: string[]
  agent?: Agent
  url?: string
  variant?: 'default' | 'compact' | 'horizontal'
  featured?: boolean
  showFavorite?: boolean
  showContact?: boolean
  maxFeatures?: number
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  featured: false,
  showFavorite: true,
  showContact: true,
  maxFeatures: 3,
  areaUnit: 'sqft'
})

const emit = defineEmits<{
  click: []
  favorite: [favorited: boolean]
  contact: [agent: Agent]
}>()

const currentImageIndex = ref(0)
const isFavorited = ref(false)

const currentImage = computed(() => {
  return props.images[currentImageIndex.value] || props.images[0]
})

const displayFeatures = computed(() => {
  return props.features?.slice(0, props.maxFeatures) || []
})

const formatPrice = (price: number | string): string => {
  if (typeof price === 'string') return price
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const getAgentInitials = (name: string): string => {
  const names = name.split(' ')
  if (names.length >= 2 && names[0] && names[names.length - 1]) {
    return (names[0]?.[0] || '') + (names[names.length - 1]?.[0] || '')
  }
  return names[0]?.[0] || 'A'
}

const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value
  emit('favorite', isFavorited.value)
}

const handleClick = () => {
  emit('click')
  if (props.url) {
    window.location.href = props.url
  }
}

const handleContact = () => {
  if (props.agent) {
    emit('contact', props.agent)
  }
}
</script>

<style scoped>
.ma-property-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--ma-bg-card, #fff);
  border-radius: var(--ma-border-radius, 12px);
  border: 1px solid var(--ma-border);
  overflow: hidden;
  transition: all 0.3s ease;
}

.ma-property-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.ma-property-card--featured {
  border-color: var(--ma-warning, #f59e0b);
  border-width: 2px;
}

.ma-property-card--horizontal {
  flex-direction: row;
}

.ma-property-card--compact .ma-property-card__content {
  padding: 1rem;
}

.ma-property-card__status {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 6px 12px;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 2;
}

.ma-property-card__status--for-sale {
  background: var(--ma-success, #10b981);
  color: white;
}

.ma-property-card__status--for-rent {
  background: var(--ma-info, #3b82f6);
  color: white;
}

.ma-property-card__status--sold {
  background: var(--ma-text-secondary);
  color: white;
}

.ma-property-card__status--pending {
  background: var(--ma-warning, #f59e0b);
  color: white;
}

.ma-property-card__status--new-listing {
  background: var(--ma-danger, #ef4444);
  color: white;
}

.ma-property-card__featured-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  color: var(--ma-warning, #f59e0b);
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 2;
}

.ma-property-card__images {
  position: relative;
  width: 100%;
  height: 240px;
  background: var(--ma-bg-secondary);
}

.ma-property-card--compact .ma-property-card__images {
  height: 180px;
}

.ma-property-card--horizontal .ma-property-card__images {
  width: 320px;
  height: auto;
  flex-shrink: 0;
}

.ma-property-card__image-main {
  width: 100%;
  height: 100%;
  position: relative;
}

.ma-property-card__image-main img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ma-property-card__image-nav {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 2;
}

.ma-property-card__image-nav button {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
  position: relative;
}

.ma-property-card__image-nav button.active {
  background: white;
  width: 24px;
  border-radius: 4px;
}

.ma-property-card__image-nav button:hover {
  background: rgba(255, 255, 255, 0.8);
}

.ma-property-card__image-nav button span {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  color: white;
  font-weight: 600;
  white-space: nowrap;
}

.ma-property-card__favorite {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  border: none;
  border-radius: 50%;
  color: var(--ma-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 2;
}

.ma-property-card__favorite:hover {
  background: white;
  color: var(--ma-danger, #ef4444);
  transform: scale(1.1);
}

.ma-property-card__content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

.ma-property-card__price-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

.ma-property-card__price {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--ma-text-main);
}

.ma-property-card--compact .ma-property-card__price {
  font-size: 1.5rem;
}

.ma-property-card__price-frequency {
  font-size: 1rem;
  font-weight: 400;
  color: var(--ma-text-secondary);
}

.ma-property-card__type {
  padding: 4px 10px;
  background: var(--ma-bg-secondary);
  color: var(--ma-text-secondary);
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 500;
}

.ma-property-card__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--ma-text-main);
}

.ma-property-card--compact .ma-property-card__title {
  font-size: 1.125rem;
}

.ma-property-card__title a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.ma-property-card__title a:hover {
  color: var(--ma-primary);
}

.ma-property-card__location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--ma-text-secondary);
  font-size: 0.9375rem;
}

.ma-property-card__specs {
  display: flex;
  gap: 1.5rem;
  padding: 1rem 0;
  border-top: 1px solid var(--ma-border);
  border-bottom: 1px solid var(--ma-border);
}

.ma-property-card--compact .ma-property-card__specs {
  padding: 0.75rem 0;
  gap: 1rem;
}

.ma-property-card__spec {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--ma-text-main);
  font-weight: 500;
}

.ma-property-card__spec .spec-label {
  color: var(--ma-text-secondary);
  font-weight: 400;
}

.ma-property-card__features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.ma-property-card__feature {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: var(--ma-bg-secondary);
  color: var(--ma-text-main);
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 500;
}

.ma-property-card__feature svg {
  color: var(--ma-success, #10b981);
}

.ma-property-card__feature--more {
  background: transparent;
  border: 1px dashed var(--ma-border);
}

.ma-property-card__feature--more svg {
  display: none;
}

.ma-property-card__agent {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--ma-border);
  margin-top: auto;
}

.ma-property-card--compact .ma-property-card__agent {
  padding-top: 0.75rem;
}

.ma-property-card__agent-avatar {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--ma-border);
}

.ma-property-card__agent-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ma-property-card__agent-avatar--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ma-primary-light);
  color: var(--ma-primary);
  font-weight: 600;
  font-size: 0.875rem;
}

.ma-property-card__agent-info {
  flex: 1;
  min-width: 0;
}

.ma-property-card__agent-name {
  font-weight: 600;
  font-size: 0.9375rem;
  color: var(--ma-text-main);
}

.ma-property-card__agent-company {
  font-size: 0.8125rem;
  color: var(--ma-text-secondary);
}

.ma-property-card__contact-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--ma-primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.ma-property-card__contact-btn:hover {
  background: var(--ma-primary-hover, #2563eb);
}

/* Responsive */
@media (max-width: 768px) {
  .ma-property-card--horizontal {
    flex-direction: column;
  }

  .ma-property-card--horizontal .ma-property-card__images {
    width: 100%;
    height: 240px;
  }

  .ma-property-card__price {
    font-size: 1.5rem;
  }

  .ma-property-card__title {
    font-size: 1.125rem;
  }

  .ma-property-card__specs {
    gap: 1rem;
  }
}
</style>
