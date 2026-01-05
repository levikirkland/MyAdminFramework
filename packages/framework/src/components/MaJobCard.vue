<template>
  <div class="ma-job-card" :class="{ 'is-featured': featured }">
    <div v-if="featured" class="featured-badge">
      <Star :size="14" fill="currentColor" />
      Featured
    </div>

    <div class="ma-job-card-header">
      <div v-if="logo" class="company-logo">
        <img :src="logo" :alt="company" />
      </div>
      <div class="company-info">
        <h3 class="company-name">{{ company }}</h3>
        <div class="job-title">{{ title }}</div>
      </div>
    </div>

    <div class="ma-job-card-details">
      <div class="detail-item">
        <MapPin :size="16" />
        <span>{{ location }}</span>
      </div>
      <div v-if="locationType" class="detail-item badge" :class="`badge-${locationType.toLowerCase()}`">
        {{ locationType }}
      </div>
      <div v-if="salary" class="detail-item">
        <DollarSign :size="16" />
        <span>{{ salary }}</span>
      </div>
      <div v-if="type" class="detail-item badge badge-type">
        {{ type }}
      </div>
    </div>

    <div v-if="description" class="ma-job-card-description">
      {{ description }}
    </div>

    <div v-if="benefits && benefits.length" class="ma-job-card-benefits">
      <div v-for="(benefit, index) in benefits" :key="index" class="benefit-item">
        <Check :size="16" />
        <span>{{ benefit }}</span>
      </div>
    </div>

    <div v-if="skills && skills.length" class="ma-job-card-skills">
      <span v-for="skill in displaySkills" :key="skill" class="skill-tag">
        {{ skill }}
      </span>
      <span v-if="skills.length > maxSkills" class="skill-tag skill-more">
        +{{ skills.length - maxSkills }}
      </span>
    </div>

    <div class="ma-job-card-footer">
      <div v-if="postedDate" class="posted-date">
        <Clock :size="14" />
        {{ formatDate(postedDate) }}
      </div>
      <button class="apply-btn" @click="handleApply">
        {{ buttonText }}
        <ArrowRight :size="16" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MapPin, DollarSign, Clock, Check, ArrowRight, Star } from 'lucide-vue-next'

interface Props {
  title: string
  company: string
  location: string
  locationType?: 'Remote' | 'Hybrid' | 'Onsite'
  type?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
  salary?: string
  description?: string
  benefits?: string[]
  skills?: string[]
  postedDate?: Date | string
  logo?: string
  featured?: boolean
  buttonText?: string
  maxSkills?: number
  applyUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  featured: false,
  buttonText: 'Apply Now',
  maxSkills: 4
})

const emit = defineEmits<{
  apply: []
}>()

const displaySkills = computed(() => {
  return props.skills?.slice(0, props.maxSkills) || []
})

const handleApply = () => {
  if (props.applyUrl) {
    window.open(props.applyUrl, '_blank')
  }
  emit('apply')
}

const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - d.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return `${Math.floor(diffDays / 30)} months ago`
}
</script>

<style scoped>
.ma-job-card {
  background: var(--ma-bg-card, #fff);
  border-radius: 16px;
  border: 1px solid var(--ma-border);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: all 0.3s ease;
  position: relative;
}

.ma-job-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  border-color: var(--ma-primary);
}

.ma-job-card.is-featured {
  border-color: var(--ma-warning, #f59e0b);
  border-width: 2px;
  box-shadow: 0 8px 24px rgba(245, 158, 11, 0.15);
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.03) 0%, rgba(245, 158, 11, 0) 100%);
}

.featured-badge {
  position: absolute;
  top: -1px;
  right: -1px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: var(--ma-warning, #f59e0b);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 0 16px 0 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ma-job-card-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.company-logo {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--ma-border);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.company-logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 8px;
}

.company-info {
  flex: 1;
  min-width: 0;
}

.company-name {
  margin: 0 0 8px 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--ma-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.job-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--ma-text-main);
  line-height: 1.2;
}

.ma-job-card-details {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--ma-border);
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  color: var(--ma-text-secondary);
}

.detail-item.badge {
  padding: 4px 12px;
  border-radius: 9999px;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.75rem;
}

.badge-remote {
  background: var(--ma-success-light, #d1fae5);
  color: var(--ma-success, #10b981);
}

.badge-hybrid {
  background: var(--ma-info-light, #dbeafe);
  color: var(--ma-info, #3b82f6);
}

.badge-onsite {
  background: var(--ma-bg-secondary);
  color: var(--ma-text-secondary);
}

.badge-type {
  background: var(--ma-bg-secondary);
  color: var(--ma-text-secondary);
}

.ma-job-card-description {
  font-size: 0.9375rem;
  color: var(--ma-text-secondary);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.ma-job-card-benefits {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9375rem;
  color: var(--ma-text-main, #1f2937);
}

.benefit-item svg {
  color: var(--ma-success, #10b981);
  flex-shrink: 0;
}

.ma-job-card-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  padding: 6px 12px;
  background: var(--ma-bg-secondary);
  color: var(--ma-text-main);
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 500;
}

.skill-more {
  color: var(--ma-text-secondary);
}

.ma-job-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 20px;
  border-top: 1px solid var(--ma-border);
}

.posted-date {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8125rem;
  color: var(--ma-text-secondary);
}

.apply-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: var(--ma-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.apply-btn:hover {
  background: var(--ma-primary-hover, #2563eb);
  transform: translateX(2px);
}

.is-featured .apply-btn {
  background: var(--ma-warning, #f59e0b);
}

.is-featured .apply-btn:hover {
  background: var(--ma-warning-hover, #d97706);
}

/* Responsive */
@media (max-width: 640px) {
  .ma-job-card {
    padding: 24px 16px;
  }

  .job-title {
    font-size: 1.25rem;
  }

  .ma-job-card-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .apply-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
