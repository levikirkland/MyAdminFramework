<template>
  <article class="ma-blog-card" :class="[`ma-blog-card--${variant}`, { 'ma-blog-card--featured': featured }]">
    <!-- Featured Badge -->
    <div v-if="featured" class="ma-blog-card__featured-badge">
      <Flame :size="14" fill="currentColor" />
      Featured
    </div>

    <!-- Image -->
    <div v-if="image && variant !== 'minimal'" class="ma-blog-card__image">
      <img :src="image" :alt="title" />
      <div v-if="category" class="ma-blog-card__category">
        {{ category }}
      </div>
    </div>

    <!-- Content -->
    <div class="ma-blog-card__content">
      <!-- Meta -->
      <div class="ma-blog-card__meta">
        <span class="ma-blog-card__date">
          <Calendar :size="14" />
          {{ formatDate(date) }}
        </span>
        <span v-if="readTime" class="ma-blog-card__read-time">
          <Clock :size="14" />
          {{ readTime }} min read
        </span>
      </div>

      <!-- Title -->
      <h3 class="ma-blog-card__title">
        <a v-if="url" :href="url" class="ma-blog-card__link" @click.prevent="handleClick">
          {{ title }}
        </a>
        <span v-else>{{ title }}</span>
      </h3>

      <!-- Excerpt -->
      <p v-if="excerpt && variant !== 'minimal'" class="ma-blog-card__excerpt">
        {{ excerpt }}
      </p>

      <!-- Tags -->
      <div v-if="tags && tags.length && variant !== 'minimal'" class="ma-blog-card__tags">
        <span v-for="tag in displayTags" :key="tag" class="ma-blog-card__tag">
          <Hash :size="12" />
          {{ tag }}
        </span>
        <span v-if="tags.length > maxTags" class="ma-blog-card__tag ma-blog-card__tag--more">
          +{{ tags.length - maxTags }}
        </span>
      </div>

      <!-- Author -->
      <div class="ma-blog-card__author">
        <div v-if="authorAvatar" class="ma-blog-card__author-avatar">
          <img :src="authorAvatar" :alt="author" />
        </div>
        <div v-else class="ma-blog-card__author-avatar ma-blog-card__author-avatar--placeholder">
          {{ authorInitials }}
        </div>
        <div class="ma-blog-card__author-info">
          <div class="ma-blog-card__author-name">{{ author }}</div>
          <div v-if="authorRole" class="ma-blog-card__author-role">{{ authorRole }}</div>
        </div>
        <button v-if="showBookmark" class="ma-blog-card__bookmark" @click="toggleBookmark">
          <Bookmark :size="18" :fill="isBookmarked ? 'currentColor' : 'none'" />
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Calendar, Clock, Hash, Bookmark, Flame } from 'lucide-vue-next'

interface Props {
  title: string
  excerpt?: string
  author: string
  authorRole?: string
  authorAvatar?: string
  date: Date | string
  image?: string
  category?: string
  tags?: string[]
  readTime?: number
  url?: string
  variant?: 'default' | 'compact' | 'minimal' | 'horizontal'
  featured?: boolean
  showBookmark?: boolean
  maxTags?: number
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  featured: false,
  showBookmark: true,
  maxTags: 3
})

const emit = defineEmits<{
  click: []
  bookmark: [bookmarked: boolean]
}>()

const isBookmarked = ref(false)

const authorInitials = computed(() => {
  const names = props.author.split(' ')
  if (names.length >= 2 && names[0] && names[names.length - 1]) {
    return (names[0]?.[0] || '') + (names[names.length - 1]?.[0] || '')
  }
  return names[0]?.[0] || 'U'
})

const displayTags = computed(() => {
  return props.tags?.slice(0, props.maxTags) || []
})

const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - d.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const handleClick = () => {
  emit('click')
  if (props.url) {
    window.location.href = props.url
  }
}

const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value
  emit('bookmark', isBookmarked.value)
}
</script>

<style scoped>
.ma-blog-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--ma-bg-card, #fff);
  border-radius: var(--ma-border-radius, 12px);
  border: 1px solid var(--ma-border);
  overflow: hidden;
  transition: all 0.3s ease;
}

.ma-blog-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transform: translateY(-4px);
}

.ma-blog-card--featured {
  border-color: var(--ma-danger, #ef4444);
  border-width: 2px;
}

.ma-blog-card--horizontal {
  flex-direction: row;
}

.ma-blog-card--minimal {
  border: none;
  border-bottom: 1px solid var(--ma-border);
  border-radius: 0;
  padding: 1rem 0;
}

.ma-blog-card--minimal:hover {
  transform: none;
  box-shadow: none;
  background: var(--ma-bg-hover, #f9fafb);
}

.ma-blog-card__featured-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: var(--ma-danger, #ef4444);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 1;
}

.ma-blog-card__image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: var(--ma-bg-secondary);
}

.ma-blog-card--compact .ma-blog-card__image {
  height: 150px;
}

.ma-blog-card--horizontal .ma-blog-card__image {
  width: 280px;
  height: auto;
  flex-shrink: 0;
}

.ma-blog-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.ma-blog-card:hover .ma-blog-card__image img {
  transform: scale(1.05);
}

.ma-blog-card__category {
  position: absolute;
  bottom: 12px;
  left: 12px;
  padding: 6px 12px;
  background: var(--ma-primary);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ma-blog-card__content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  flex: 1;
}

.ma-blog-card--compact .ma-blog-card__content {
  padding: 1rem;
  gap: 0.75rem;
}

.ma-blog-card--minimal .ma-blog-card__content {
  padding: 0;
}

.ma-blog-card__meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.8125rem;
  color: var(--ma-text-secondary);
}

.ma-blog-card__date,
.ma-blog-card__read-time {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.ma-blog-card__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--ma-text-main);
}

.ma-blog-card--compact .ma-blog-card__title {
  font-size: 1.125rem;
}

.ma-blog-card--minimal .ma-blog-card__title {
  font-size: 1rem;
  font-weight: 600;
}

.ma-blog-card__link {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.ma-blog-card__link:hover {
  color: var(--ma-primary);
}

.ma-blog-card__excerpt {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--ma-text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.ma-blog-card--compact .ma-blog-card__excerpt {
  -webkit-line-clamp: 2;
  font-size: 0.875rem;
}

.ma-blog-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.ma-blog-card__tag {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  background: var(--ma-bg-secondary);
  color: var(--ma-text-secondary);
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 500;
}

.ma-blog-card__tag--more {
  background: transparent;
  border: 1px dashed var(--ma-border);
}

.ma-blog-card__author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--ma-border);
  margin-top: auto;
}

.ma-blog-card--minimal .ma-blog-card__author {
  border-top: none;
  padding-top: 0;
}

.ma-blog-card__author-avatar {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--ma-border);
}

.ma-blog-card__author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ma-blog-card__author-avatar--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ma-primary-light);
  color: var(--ma-primary);
  font-weight: 600;
  font-size: 0.875rem;
}

.ma-blog-card__author-info {
  flex: 1;
  min-width: 0;
}

.ma-blog-card__author-name {
  font-weight: 600;
  font-size: 0.9375rem;
  color: var(--ma-text-main);
}

.ma-blog-card__author-role {
  font-size: 0.8125rem;
  color: var(--ma-text-secondary);
}

.ma-blog-card__bookmark {
  flex-shrink: 0;
  padding: 0.5rem;
  background: transparent;
  border: none;
  color: var(--ma-text-secondary);
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.ma-blog-card__bookmark:hover {
  background: var(--ma-bg-hover, #f3f4f6);
  color: var(--ma-primary);
}

/* Responsive */
@media (max-width: 768px) {
  .ma-blog-card--horizontal {
    flex-direction: column;
  }

  .ma-blog-card--horizontal .ma-blog-card__image {
    width: 100%;
    height: 200px;
  }

  .ma-blog-card__title {
    font-size: 1.125rem;
  }
}
</style>
