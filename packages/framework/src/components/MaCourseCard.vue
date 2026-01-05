<template>
  <div 
    :class="[
      'ma-course-card',
      `ma-course-card--${variant}`,
      { 'ma-course-card--featured': featured }
    ]"
    @click="handleClick"
  >
    <!-- Featured Badge -->
    <div v-if="featured" class="ma-course-card__featured-badge">
      <Sparkles :size="14" />
      Featured
    </div>

    <!-- Thumbnail -->
    <div class="ma-course-card__thumbnail">
      <img :src="thumbnail" :alt="title" />
      
      <!-- Duration Badge -->
      <div v-if="duration" class="ma-course-card__duration">
        <Clock :size="14" />
        {{ duration }}
      </div>

      <!-- Bookmark Button -->
      <button 
        v-if="showBookmark"
        class="ma-course-card__bookmark"
        @click.stop="toggleBookmark"
        :aria-label="isBookmarked ? 'Remove bookmark' : 'Add bookmark'"
      >
        <Bookmark :size="18" :fill="isBookmarked ? 'currentColor' : 'none'" />
      </button>

      <!-- Level Badge -->
      <div v-if="level" :class="['ma-course-card__level', `ma-course-card__level--${level.toLowerCase()}`]">
        {{ level }}
      </div>

      <!-- Progress Bar (for enrolled courses) -->
      <div v-if="progress !== undefined && progress !== null" class="ma-course-card__progress-overlay">
        <div class="ma-course-card__progress-bar">
          <div class="ma-course-card__progress-fill" :style="{ width: `${progress}%` }"></div>
        </div>
        <span class="ma-course-card__progress-text">{{ progress }}% complete</span>
      </div>
    </div>

    <!-- Content -->
    <div class="ma-course-card__content">
      <!-- Category -->
      <div v-if="category" class="ma-course-card__category">
        <Hash :size="14" />
        {{ category }}
      </div>

      <!-- Title -->
      <h3 class="ma-course-card__title">{{ title }}</h3>

      <!-- Description -->
      <p v-if="description && variant !== 'compact'" class="ma-course-card__description">
        {{ description }}
      </p>

      <!-- Stats -->
      <div class="ma-course-card__stats">
        <div v-if="lessonsCount" class="ma-course-card__stat">
          <PlayCircle :size="16" />
          <span>{{ lessonsCount }} lessons</span>
        </div>
        <div v-if="studentsCount" class="ma-course-card__stat">
          <Users :size="16" />
          <span>{{ formatCount(studentsCount) }} students</span>
        </div>
        <div v-if="rating" class="ma-course-card__stat">
          <Star :size="16" :fill="'#fbbf24'" stroke="#fbbf24" />
          <span>{{ rating }} ({{ reviewsCount || 0 }})</span>
        </div>
      </div>

      <!-- Instructor -->
      <div v-if="instructor" class="ma-course-card__instructor">
        <div class="ma-course-card__instructor-avatar">
          <img v-if="instructor.avatar" :src="instructor.avatar" :alt="instructor.name" />
          <span v-else class="ma-course-card__instructor-initials">
            {{ getInstructorInitials(instructor.name) }}
          </span>
        </div>
        <div class="ma-course-card__instructor-info">
          <div class="ma-course-card__instructor-name">{{ instructor.name }}</div>
          <div v-if="instructor.title" class="ma-course-card__instructor-title">{{ instructor.title }}</div>
        </div>
      </div>

      <!-- Tags/Skills -->
      <div v-if="skills && skills.length > 0 && variant === 'default'" class="ma-course-card__skills">
        <span 
          v-for="(skill, index) in skills.slice(0, maxSkills)" 
          :key="index" 
          class="ma-course-card__skill"
        >
          {{ skill }}
        </span>
        <span v-if="skills.length > maxSkills" class="ma-course-card__skill-more">
          +{{ skills.length - maxSkills }} more
        </span>
      </div>

      <!-- Footer -->
      <div class="ma-course-card__footer">
        <div class="ma-course-card__price">
          <span v-if="price === 0 || price === '0' || price === 'Free'" class="ma-course-card__price-free">
            Free
          </span>
          <template v-else>
            <span v-if="originalPrice" class="ma-course-card__price-original">${{ originalPrice }}</span>
            <span class="ma-course-card__price-current">${{ price }}</span>
          </template>
        </div>

        <button 
          v-if="showEnroll"
          class="ma-course-card__enroll-btn"
          @click.stop="handleEnroll"
        >
          <template v-if="progress !== undefined && progress !== null">
            Continue Learning
          </template>
          <template v-else-if="isEnrolled">
            View Course
          </template>
          <template v-else>
            Enroll Now
          </template>
        </button>
      </div>

      <!-- Certificate Badge -->
      <div v-if="certificate" class="ma-course-card__certificate">
        <Award :size="14" />
        Certificate included
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  Clock, 
  Bookmark, 
  Hash, 
  PlayCircle, 
  Users, 
  Star,
  Award,
  Sparkles
} from 'lucide-vue-next'

interface Instructor {
  name: string
  title?: string
  avatar?: string
}

interface Props {
  title: string
  description?: string
  thumbnail: string
  instructor: Instructor
  price: number | string
  originalPrice?: number | string
  category?: string
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'
  duration?: string
  lessonsCount?: number
  studentsCount?: number
  rating?: number
  reviewsCount?: number
  skills?: string[]
  progress?: number
  isEnrolled?: boolean
  certificate?: boolean
  url?: string
  variant?: 'default' | 'compact' | 'horizontal' | 'grid'
  featured?: boolean
  showBookmark?: boolean
  showEnroll?: boolean
  maxSkills?: number
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  featured: false,
  showBookmark: true,
  showEnroll: true,
  maxSkills: 3,
  certificate: false,
  isEnrolled: false
})

interface Emits {
  (e: 'click'): void
  (e: 'bookmark', bookmarked: boolean): void
  (e: 'enroll'): void
}

const emit = defineEmits<Emits>()

const isBookmarked = ref(false)

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value
  emit('bookmark', isBookmarked.value)
}

const handleClick = () => {
  emit('click')
}

const handleEnroll = () => {
  emit('enroll')
}

const formatCount = (count: number): string => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M'
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K'
  }
  return count.toString()
}

const getInstructorInitials = (name: string): string => {
  const names = name.split(' ')
  if (names.length >= 2 && names[0] && names[names.length - 1]) {
    return (names[0]?.[0] || '') + (names[names.length - 1]?.[0] || '')
  }
  return names[0]?.[0] || 'I'
}
</script>

<style scoped>
.ma-course-card {
  background: var(--ma-bg-secondary, #fff);
  border: 1px solid var(--ma-border-color, #e5e7eb);
  border-radius: var(--ma-border-radius, 12px);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
}

.ma-course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-color: var(--ma-primary, #3b82f6);
}

.ma-course-card--featured {
  border: 2px solid var(--ma-primary, #3b82f6);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.ma-course-card__featured-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--ma-primary, #3b82f6);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.ma-course-card__thumbnail {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
  background: var(--ma-bg-tertiary, #f3f4f6);
}

.ma-course-card__thumbnail img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.ma-course-card:hover .ma-course-card__thumbnail img {
  transform: scale(1.05);
}

.ma-course-card__duration {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  backdrop-filter: blur(4px);
}

.ma-course-card__bookmark {
  position: absolute;
  top: 12px;
  left: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--ma-text-secondary, #6b7280);
  z-index: 2;
  backdrop-filter: blur(4px);
}

.ma-course-card__bookmark:hover {
  background: white;
  color: var(--ma-primary, #3b82f6);
  transform: scale(1.1);
}

.ma-course-card__level {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  backdrop-filter: blur(4px);
}

.ma-course-card__level--beginner {
  background: rgba(34, 197, 94, 0.9);
  color: white;
}

.ma-course-card__level--intermediate {
  background: rgba(59, 130, 246, 0.9);
  color: white;
}

.ma-course-card__level--advanced {
  background: rgba(168, 85, 247, 0.9);
  color: white;
}

.ma-course-card__level--all.levels {
  background: rgba(100, 116, 139, 0.9);
  color: white;
}

.ma-course-card__progress-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.ma-course-card__progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  overflow: hidden;
}

.ma-course-card__progress-fill {
  height: 100%;
  background: var(--ma-success, #22c55e);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.ma-course-card__progress-text {
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;
}

.ma-course-card__content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
}

.ma-course-card__category {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: var(--ma-primary, #3b82f6);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ma-course-card__title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--ma-text-primary, #1f2937);
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.ma-course-card__description {
  font-size: 0.875rem;
  color: var(--ma-text-secondary, #6b7280);
  margin: 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.ma-course-card__stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.ma-course-card__stat {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: var(--ma-text-secondary, #6b7280);
  font-size: 0.8125rem;
}

.ma-course-card__instructor {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--ma-bg-tertiary, #f9fafb);
  border-radius: 8px;
}

.ma-course-card__instructor-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--ma-primary-light, #dbeafe);
}

.ma-course-card__instructor-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ma-course-card__instructor-initials {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: var(--ma-primary, #3b82f6);
  font-size: 0.875rem;
}

.ma-course-card__instructor-info {
  flex: 1;
  min-width: 0;
}

.ma-course-card__instructor-name {
  font-weight: 600;
  color: var(--ma-text-primary, #1f2937);
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ma-course-card__instructor-title {
  font-size: 0.75rem;
  color: var(--ma-text-secondary, #6b7280);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ma-course-card__skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.ma-course-card__skill {
  padding: 0.25rem 0.625rem;
  background: var(--ma-bg-tertiary, #f3f4f6);
  color: var(--ma-text-secondary, #6b7280);
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.ma-course-card__skill-more {
  padding: 0.25rem 0.625rem;
  background: var(--ma-primary-light, #dbeafe);
  color: var(--ma-primary, #3b82f6);
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.ma-course-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid var(--ma-border-color, #e5e7eb);
}

.ma-course-card__price {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ma-course-card__price-free {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--ma-success, #22c55e);
}

.ma-course-card__price-original {
  font-size: 0.875rem;
  color: var(--ma-text-tertiary, #9ca3af);
  text-decoration: line-through;
}

.ma-course-card__price-current {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--ma-text-primary, #1f2937);
}

.ma-course-card__enroll-btn {
  padding: 0.625rem 1.25rem;
  background: var(--ma-primary, #3b82f6);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.ma-course-card__enroll-btn:hover {
  background: var(--ma-primary-dark, #2563eb);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.ma-course-card__certificate {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: var(--ma-warning, #f59e0b);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.5rem;
  background: var(--ma-warning-light, #fef3c7);
  border-radius: 6px;
  margin-top: 0.5rem;
}

/* Compact Variant */
.ma-course-card--compact {
  max-width: 320px;
}

.ma-course-card--compact .ma-course-card__content {
  padding: 1rem;
  gap: 0.5rem;
}

.ma-course-card--compact .ma-course-card__title {
  font-size: 1rem;
  -webkit-line-clamp: 2;
}

.ma-course-card--compact .ma-course-card__stats {
  gap: 0.5rem;
}

.ma-course-card--compact .ma-course-card__instructor {
  padding: 0.5rem;
}

.ma-course-card--compact .ma-course-card__instructor-avatar {
  width: 32px;
  height: 32px;
}

.ma-course-card--compact .ma-course-card__footer {
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;
}

.ma-course-card--compact .ma-course-card__price {
  justify-content: center;
}

.ma-course-card--compact .ma-course-card__enroll-btn {
  width: 100%;
}

/* Horizontal Variant */
.ma-course-card--horizontal {
  flex-direction: row;
  max-width: 100%;
}

.ma-course-card--horizontal .ma-course-card__thumbnail {
  width: 300px;
  padding-top: 0;
  height: auto;
  min-height: 200px;
  flex-shrink: 0;
}

.ma-course-card--horizontal .ma-course-card__thumbnail img {
  position: static;
}

.ma-course-card--horizontal .ma-course-card__content {
  flex: 1;
}

/* Grid Variant */
.ma-course-card--grid .ma-course-card__content {
  padding: 1rem;
}

.ma-course-card--grid .ma-course-card__title {
  font-size: 1rem;
  -webkit-line-clamp: 2;
}

.ma-course-card--grid .ma-course-card__description {
  font-size: 0.8125rem;
  -webkit-line-clamp: 2;
}

/* Responsive */
@media (max-width: 768px) {
  .ma-course-card--horizontal {
    flex-direction: column;
  }

  .ma-course-card--horizontal .ma-course-card__thumbnail {
    width: 100%;
    padding-top: 56.25%;
    min-height: 0;
  }

  .ma-course-card--horizontal .ma-course-card__thumbnail img {
    position: absolute;
  }

  .ma-course-card__footer {
    flex-direction: column;
    align-items: stretch;
  }

  .ma-course-card__price {
    justify-content: center;
  }

  .ma-course-card__enroll-btn {
    width: 100%;
  }
}
</style>
