<template>
  <div class="ma-testimonial" :class="[`ma-testimonial--${variant}`, { 'ma-testimonial--featured': featured }]">
    <!-- Rating -->
    <div v-if="rating && variant !== 'minimal'" class="ma-testimonial__rating">
      <Star
        v-for="star in 5"
        :key="star"
        :size="variant === 'compact' ? 14 : 16"
        :fill="star <= rating ? 'currentColor' : 'none'"
        :class="{ 'filled': star <= rating }"
      />
    </div>

    <!-- Quote -->
    <div class="ma-testimonial__content">
      <Quote v-if="variant === 'default'" class="ma-testimonial__quote-icon" :size="32" />
      <p class="ma-testimonial__text">{{ quote }}</p>
    </div>

    <!-- Author -->
    <div class="ma-testimonial__author">
      <div v-if="avatar" class="ma-testimonial__avatar">
        <img :src="avatar" :alt="name" />
      </div>
      <div v-else class="ma-testimonial__avatar ma-testimonial__avatar--placeholder">
        {{ initials }}
      </div>
      <div class="ma-testimonial__author-info">
        <div class="ma-testimonial__name">{{ name }}</div>
        <div v-if="role" class="ma-testimonial__role">{{ role }}</div>
        <div v-if="company" class="ma-testimonial__company">{{ company }}</div>
      </div>
      <div v-if="logo" class="ma-testimonial__logo">
        <img :src="logo" :alt="company" />
      </div>
    </div>

    <!-- Date (optional) -->
    <div v-if="date" class="ma-testimonial__date">
      <Calendar :size="14" />
      {{ formatDate(date) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Star, Quote, Calendar } from 'lucide-vue-next'

interface Props {
  quote: string
  name: string
  role?: string
  company?: string
  avatar?: string
  logo?: string
  rating?: number
  date?: Date | string
  variant?: 'default' | 'compact' | 'minimal' | 'card'
  featured?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  featured: false,
  rating: 5
})

const initials = computed(() => {
  const names = props.name.split(' ')
  if (names.length >= 2 && names[0] && names[names.length - 1]) {
    return (names[0]?.[0] || '') + (names[names.length - 1]?.[0] || '')
  }
  return names[0]?.[0] || 'U'
})

const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<style scoped>
.ma-testimonial {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--ma-bg-card, #fff);
  border-radius: var(--ma-border-radius, 12px);
  border: 1px solid var(--ma-border);
  transition: all 0.3s ease;
}

.ma-testimonial:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.ma-testimonial--featured {
  border-color: var(--ma-primary);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0) 100%);
}

.ma-testimonial--card {
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.ma-testimonial--compact {
  padding: 1rem;
  gap: 0.75rem;
}

.ma-testimonial--minimal {
  border: none;
  padding: 1rem 0;
  background: transparent;
}

.ma-testimonial__rating {
  display: flex;
  gap: 0.25rem;
  color: var(--ma-text-secondary);
}

.ma-testimonial__rating svg.filled {
  color: var(--ma-warning, #f59e0b);
}

.ma-testimonial__content {
  position: relative;
  flex: 1;
}

.ma-testimonial__quote-icon {
  position: absolute;
  top: -8px;
  left: -8px;
  color: var(--ma-primary-light);
  opacity: 0.5;
}

.ma-testimonial__text {
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--ma-text-main);
  font-style: italic;
}

.ma-testimonial--compact .ma-testimonial__text {
  font-size: 0.9375rem;
  line-height: 1.5;
}

.ma-testimonial--card .ma-testimonial__text {
  font-size: 1.125rem;
  line-height: 1.7;
}

.ma-testimonial__author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.ma-testimonial__avatar {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--ma-border);
}

.ma-testimonial--compact .ma-testimonial__avatar {
  width: 40px;
  height: 40px;
}

.ma-testimonial--card .ma-testimonial__avatar {
  width: 56px;
  height: 56px;
}

.ma-testimonial__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ma-testimonial__avatar--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ma-primary-light);
  color: var(--ma-primary);
  font-weight: 600;
  font-size: 1rem;
}

.ma-testimonial__author-info {
  flex: 1;
  min-width: 0;
}

.ma-testimonial__name {
  font-weight: 600;
  font-size: 1rem;
  color: var(--ma-text-main);
}

.ma-testimonial--compact .ma-testimonial__name {
  font-size: 0.9375rem;
}

.ma-testimonial__role {
  font-size: 0.875rem;
  color: var(--ma-text-secondary);
}

.ma-testimonial__company {
  font-size: 0.875rem;
  color: var(--ma-text-secondary);
}

.ma-testimonial--compact .ma-testimonial__role,
.ma-testimonial--compact .ma-testimonial__company {
  font-size: 0.8125rem;
}

.ma-testimonial__logo {
  flex-shrink: 0;
  width: 64px;
  height: 32px;
  opacity: 0.6;
}

.ma-testimonial__logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.ma-testimonial__date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: var(--ma-text-secondary);
  padding-top: 0.5rem;
  border-top: 1px solid var(--ma-border);
}

/* Responsive */
@media (max-width: 640px) {
  .ma-testimonial {
    padding: 1rem;
  }

  .ma-testimonial--card {
    padding: 1.5rem;
  }

  .ma-testimonial__text {
    font-size: 0.9375rem;
  }
}
</style>
