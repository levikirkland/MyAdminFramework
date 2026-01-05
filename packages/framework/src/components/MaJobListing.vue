<template>
  <div :class="['ma-job-listing', `ma-job-listing--${variant}`, { 'ma-job-listing--featured': featured }]">
    <!-- Featured Badge -->
    <div v-if="featured" class="ma-job-listing__featured-badge">
      <Star :size="14" fill="currentColor" />
      Featured
    </div>

    <!-- Header -->
    <div class="ma-job-listing__header">
      <div v-if="job.logo && variant !== 'compact'" class="ma-job-listing__logo">
        <img :src="job.logo" :alt="job.company" />
      </div>
      <div class="ma-job-listing__header-content">
        <h3 class="ma-job-listing__title">{{ job.title }}</h3>
        <div class="ma-job-listing__company">
          <Building2 :size="16" />
          {{ job.company }}
        </div>
      </div>
      <button 
        v-if="showBookmark"
        class="ma-job-listing__bookmark"
        :class="{ 'ma-job-listing__bookmark--active': isBookmarked }"
        @click="toggleBookmark"
        :aria-label="isBookmarked ? 'Remove bookmark' : 'Bookmark job'"
      >
        <Bookmark :size="20" :fill="isBookmarked ? 'currentColor' : 'none'" />
      </button>
    </div>

    <!-- Meta Information -->
    <div class="ma-job-listing__meta">
      <span class="ma-job-listing__meta-item">
        <MapPin :size="16" />
        {{ job.location }}
      </span>
      <span v-if="job.locationType" :class="['ma-job-listing__badge', `ma-job-listing__badge--${job.locationType.toLowerCase()}`]">
        {{ job.locationType }}
      </span>
      <span v-if="job.type" class="ma-job-listing__badge ma-job-listing__badge--type">
        {{ job.type }}
      </span>
      <span v-if="job.salary" class="ma-job-listing__meta-item">
        <DollarSign :size="16" />
        {{ job.salary }}
      </span>
      <span v-if="job.postedDate" class="ma-job-listing__meta-item ma-job-listing__posted">
        <Clock :size="16" />
        {{ formatDate(job.postedDate) }}
      </span>
    </div>

    <!-- Description (not in compact) -->
    <p v-if="variant !== 'compact' && job.description" class="ma-job-listing__description">
      {{ job.description }}
    </p>

    <!-- Skills/Tags -->
    <div v-if="job.skills && job.skills.length" class="ma-job-listing__skills">
      <span v-for="skill in displaySkills" :key="skill" class="ma-job-listing__skill-tag">
        {{ skill }}
      </span>
      <span v-if="job.skills.length > maxSkills" class="ma-job-listing__skill-tag ma-job-listing__skill-tag--more">
        +{{ job.skills.length - maxSkills }} more
      </span>
    </div>

    <!-- Footer -->
    <div class="ma-job-listing__footer">
      <div v-if="job.experienceLevel" class="ma-job-listing__experience">
        <Briefcase :size="16" />
        {{ job.experienceLevel }}
      </div>
      <button class="ma-job-listing__apply-btn" @click="handleApply">
        {{ applyButtonText }}
        <ArrowRight :size="16" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Clock, 
  Briefcase, 
  ArrowRight,
  Bookmark,
  Star
} from 'lucide-vue-next'

export interface Job {
  id: string | number
  title: string
  company: string
  location: string
  locationType?: 'Remote' | 'Hybrid' | 'Onsite'
  type?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
  salary?: string
  description?: string
  skills?: string[]
  experienceLevel?: string
  postedDate?: Date | string
  logo?: string
  applyUrl?: string
}

interface Props {
  job: Job
  variant?: 'default' | 'compact' | 'featured'
  featured?: boolean
  showBookmark?: boolean
  applyButtonText?: string
  maxSkills?: number
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  featured: false,
  showBookmark: true,
  applyButtonText: 'Apply Now',
  maxSkills: 5
})

const emit = defineEmits<{
  apply: [job: Job]
  bookmark: [job: Job, bookmarked: boolean]
}>()

const isBookmarked = ref(false)

const displaySkills = computed(() => {
  return props.job.skills?.slice(0, props.maxSkills) || []
})

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value
  emit('bookmark', props.job, isBookmarked.value)
}

const handleApply = () => {
  if (props.job.applyUrl) {
    window.open(props.job.applyUrl, '_blank')
  }
  emit('apply', props.job)
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
.ma-job-listing {
  position: relative;
  padding: 1.5rem;
  background: var(--ma-bg-secondary, #fff);
  border: 1px solid var(--ma-border-color, #e5e7eb);
  border-radius: var(--ma-border-radius, 8px);
  transition: all 0.2s ease;
}

.ma-job-listing:hover {
  box-shadow: var(--ma-shadow-md, 0 4px 6px -1px rgb(0 0 0 / 0.1));
  border-color: var(--ma-primary, #3b82f6);
}

.ma-job-listing--featured {
  border-color: var(--ma-warning, #f59e0b);
  border-width: 2px;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(245, 158, 11, 0) 100%);
}

.ma-job-listing--compact {
  padding: 1rem;
}

.ma-job-listing--compact .ma-job-listing__description {
  display: none;
}

.ma-job-listing__featured-badge {
  position: absolute;
  top: -1px;
  right: -1px;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background: var(--ma-warning, #f59e0b);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 0 var(--ma-border-radius, 8px) 0 var(--ma-border-radius, 8px);
}

.ma-job-listing__header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.ma-job-listing__logo {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: var(--ma-border-radius, 8px);
  overflow: hidden;
  border: 1px solid var(--ma-border-color, #e5e7eb);
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ma-job-listing--compact .ma-job-listing__logo {
  width: 40px;
  height: 40px;
}

.ma-job-listing__logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 0.25rem;
}

.ma-job-listing__header-content {
  flex: 1;
  min-width: 0;
}

.ma-job-listing__title {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ma-text-primary, #1f2937);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ma-job-listing--compact .ma-job-listing__title {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.ma-job-listing__company {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--ma-text-secondary, #6b7280);
  font-size: 0.95rem;
}

.ma-job-listing__bookmark {
  flex-shrink: 0;
  padding: 0.5rem;
  background: transparent;
  border: none;
  color: var(--ma-text-secondary, #6b7280);
  cursor: pointer;
  border-radius: var(--ma-border-radius, 8px);
  transition: all 0.2s ease;
}

.ma-job-listing__bookmark:hover {
  background: var(--ma-bg-hover, #f3f4f6);
  color: var(--ma-primary, #3b82f6);
}

.ma-job-listing__bookmark--active {
  color: var(--ma-primary, #3b82f6);
}

.ma-job-listing__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.ma-job-listing--compact .ma-job-listing__meta {
  font-size: 0.8125rem;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.ma-job-listing__meta-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: var(--ma-text-secondary, #6b7280);
}

.ma-job-listing__posted {
  margin-left: auto;
  font-size: 0.8125rem;
}

.ma-job-listing__badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.ma-job-listing__badge--remote {
  background: var(--ma-success-light, #d1fae5);
  color: var(--ma-success, #10b981);
}

.ma-job-listing__badge--hybrid {
  background: var(--ma-info-light, #dbeafe);
  color: var(--ma-info, #3b82f6);
}

.ma-job-listing__badge--onsite {
  background: var(--ma-bg-tertiary, #f3f4f6);
  color: var(--ma-text-secondary, #6b7280);
}

.ma-job-listing__badge--type {
  background: var(--ma-bg-tertiary, #f3f4f6);
  color: var(--ma-text-secondary, #6b7280);
}

.ma-job-listing__description {
  margin: 0 0 1rem 0;
  color: var(--ma-text-secondary, #6b7280);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.ma-job-listing__skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.ma-job-listing--compact .ma-job-listing__skills {
  margin-bottom: 0.75rem;
}

.ma-job-listing__skill-tag {
  padding: 0.375rem 0.75rem;
  background: var(--ma-bg-tertiary, #f3f4f6);
  color: var(--ma-text-primary, #1f2937);
  border-radius: var(--ma-border-radius, 8px);
  font-size: 0.8125rem;
  font-weight: 500;
}

.ma-job-listing__skill-tag--more {
  color: var(--ma-text-secondary, #6b7280);
}

.ma-job-listing__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--ma-border-color, #e5e7eb);
}

.ma-job-listing--compact .ma-job-listing__footer {
  padding-top: 0.75rem;
}

.ma-job-listing__experience {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--ma-text-secondary, #6b7280);
  font-size: 0.875rem;
}

.ma-job-listing__apply-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: var(--ma-primary, #3b82f6);
  color: white;
  border: none;
  border-radius: var(--ma-border-radius, 8px);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.ma-job-listing--compact .ma-job-listing__apply-btn {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.ma-job-listing__apply-btn:hover {
  background: var(--ma-primary-dark, #2563eb);
  transform: translateY(-1px);
}

.ma-job-listing__apply-btn:active {
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 640px) {
  .ma-job-listing__meta {
    font-size: 0.8125rem;
  }
  
  .ma-job-listing__title {
    font-size: 1.125rem;
  }
  
  .ma-job-listing__footer {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .ma-job-listing__apply-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
