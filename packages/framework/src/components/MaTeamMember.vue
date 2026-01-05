<template>
  <div 
    :class="[
      'ma-team-member',
      `ma-team-member--${variant}`,
      { 'ma-team-member--featured': featured }
    ]"
    @click="handleClick"
  >
    <!-- Image -->
    <div class="ma-team-member__image-wrapper">
      <img :src="image" :alt="name" class="ma-team-member__image" />
      
      <!-- Social Links Overlay -->
      <div v-if="socialLinks && socialLinks.length > 0" class="ma-team-member__social-overlay">
        <a
          v-for="(link, index) in socialLinks"
          :key="index"
          :href="link.url"
          :aria-label="link.platform"
          class="ma-team-member__social-link"
          @click.stop
          target="_blank"
          rel="noopener noreferrer"
        >
          <component :is="getSocialIcon(link.platform)" :size="18" />
        </a>
      </div>

      <!-- Status Badge -->
      <div v-if="status" :class="['ma-team-member__status', `ma-team-member__status--${status}`]">
        <div class="ma-team-member__status-dot"></div>
      </div>
    </div>

    <!-- Content -->
    <div class="ma-team-member__content">
      <h3 class="ma-team-member__name">{{ name }}</h3>
      <p class="ma-team-member__role">{{ role }}</p>
      
      <p v-if="bio && variant !== 'compact'" class="ma-team-member__bio">{{ bio }}</p>

      <!-- Skills/Expertise -->
      <div v-if="skills && skills.length > 0 && variant === 'default'" class="ma-team-member__skills">
        <span 
          v-for="(skill, index) in skills.slice(0, maxSkills)" 
          :key="index"
          class="ma-team-member__skill"
        >
          {{ skill }}
        </span>
        <span v-if="skills.length > maxSkills" class="ma-team-member__skill-more">
          +{{ skills.length - maxSkills }}
        </span>
      </div>

      <!-- Stats -->
      <div v-if="stats && variant === 'default'" class="ma-team-member__stats">
        <div v-if="stats.projects" class="ma-team-member__stat">
          <Briefcase :size="16" />
          <span>{{ stats.projects }} projects</span>
        </div>
        <div v-if="stats.experience" class="ma-team-member__stat">
          <Calendar :size="16" />
          <span>{{ stats.experience }}</span>
        </div>
      </div>

      <!-- Contact Button -->
      <button 
        v-if="showContact && (email || phone)"
        class="ma-team-member__contact-btn"
        @click.stop="handleContact"
      >
        <Mail :size="16" />
        Contact
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  Mail, 
  Briefcase, 
  Calendar,
  Linkedin,
  Twitter,
  Github,
  Globe,
  Facebook,
  Instagram,
  Youtube
} from 'lucide-vue-next'

interface SocialLink {
  platform: 'linkedin' | 'twitter' | 'github' | 'website' | 'facebook' | 'instagram' | 'youtube'
  url: string
}

interface Stats {
  projects?: number
  experience?: string
}

interface Props {
  name: string
  role: string
  image: string
  bio?: string
  email?: string
  phone?: string
  socialLinks?: SocialLink[]
  skills?: string[]
  stats?: Stats
  status?: 'online' | 'away' | 'busy'
  variant?: 'default' | 'compact' | 'horizontal' | 'minimal'
  featured?: boolean
  showContact?: boolean
  maxSkills?: number
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  featured: false,
  showContact: true,
  maxSkills: 3
})

interface Emits {
  (e: 'click'): void
  (e: 'contact', contact: { email?: string; phone?: string }): void
}

const emit = defineEmits<Emits>()

const handleClick = () => {
  emit('click')
}

const handleContact = () => {
  emit('contact', { email: props.email, phone: props.phone })
}

const getSocialIcon = (platform: string) => {
  const icons: Record<string, any> = {
    linkedin: Linkedin,
    twitter: Twitter,
    github: Github,
    website: Globe,
    facebook: Facebook,
    instagram: Instagram,
    youtube: Youtube
  }
  return icons[platform] || Globe
}
</script>

<style scoped>
.ma-team-member {
  background: var(--ma-bg-secondary, #fff);
  border: 1px solid var(--ma-border-color, #e5e7eb);
  border-radius: var(--ma-border-radius, 12px);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.ma-team-member:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  border-color: var(--ma-primary, #3b82f6);
}

.ma-team-member--featured {
  border: 2px solid var(--ma-primary, #3b82f6);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.ma-team-member__image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
  background: var(--ma-bg-tertiary, #f3f4f6);
}

.ma-team-member__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.ma-team-member:hover .ma-team-member__image {
  transform: scale(1.05);
}

.ma-team-member__social-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.ma-team-member:hover .ma-team-member__social-overlay {
  opacity: 1;
}

.ma-team-member__social-link {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ma-text-primary, #1f2937);
  transition: all 0.2s ease;
  text-decoration: none;
}

.ma-team-member__social-link:hover {
  background: var(--ma-primary, #3b82f6);
  color: white;
  transform: translateY(-2px);
}

.ma-team-member__status {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.ma-team-member__status-dot {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.ma-team-member__status--online .ma-team-member__status-dot {
  background: var(--ma-success, #22c55e);
}

.ma-team-member__status--away .ma-team-member__status-dot {
  background: var(--ma-warning, #f59e0b);
}

.ma-team-member__status--busy .ma-team-member__status-dot {
  background: var(--ma-danger, #ef4444);
}

.ma-team-member__content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
}

.ma-team-member__name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--ma-text-primary, #1f2937);
  margin: 0;
}

.ma-team-member__role {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--ma-primary, #3b82f6);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.ma-team-member__bio {
  font-size: 0.875rem;
  color: var(--ma-text-secondary, #6b7280);
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.ma-team-member__skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.ma-team-member__skill {
  padding: 0.25rem 0.625rem;
  background: var(--ma-bg-tertiary, #f3f4f6);
  color: var(--ma-text-secondary, #6b7280);
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.ma-team-member__skill-more {
  padding: 0.25rem 0.625rem;
  background: var(--ma-primary-light, #dbeafe);
  color: var(--ma-primary, #3b82f6);
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.ma-team-member__stats {
  display: flex;
  gap: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--ma-border-color, #e5e7eb);
}

.ma-team-member__stat {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: var(--ma-text-secondary, #6b7280);
  font-size: 0.8125rem;
}

.ma-team-member__contact-btn {
  margin-top: auto;
  padding: 0.625rem 1rem;
  background: var(--ma-primary, #3b82f6);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.ma-team-member__contact-btn:hover {
  background: var(--ma-primary-dark, #2563eb);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* Compact Variant */
.ma-team-member--compact {
  max-width: 280px;
}

.ma-team-member--compact .ma-team-member__content {
  padding: 1rem;
  gap: 0.5rem;
}

.ma-team-member--compact .ma-team-member__name {
  font-size: 1rem;
}

.ma-team-member--compact .ma-team-member__role {
  font-size: 0.75rem;
}

/* Horizontal Variant */
.ma-team-member--horizontal {
  flex-direction: row;
  max-width: 100%;
}

.ma-team-member--horizontal .ma-team-member__image-wrapper {
  width: 200px;
  padding-top: 0;
  height: auto;
  min-height: 200px;
  flex-shrink: 0;
}

.ma-team-member--horizontal .ma-team-member__image {
  position: static;
  height: 100%;
}

.ma-team-member--horizontal .ma-team-member__content {
  flex: 1;
}

/* Minimal Variant */
.ma-team-member--minimal {
  border: none;
  background: transparent;
  text-align: center;
}

.ma-team-member--minimal:hover {
  transform: none;
  box-shadow: none;
}

.ma-team-member--minimal .ma-team-member__image-wrapper {
  width: 120px;
  height: 120px;
  padding-top: 0;
  border-radius: 50%;
  margin: 0 auto 1rem;
  border: 3px solid var(--ma-border-color, #e5e7eb);
}

.ma-team-member--minimal:hover .ma-team-member__image-wrapper {
  border-color: var(--ma-primary, #3b82f6);
}

.ma-team-member--minimal .ma-team-member__image {
  position: static;
}

.ma-team-member--minimal .ma-team-member__content {
  padding: 0;
}

.ma-team-member--minimal .ma-team-member__social-overlay {
  position: static;
  opacity: 1;
  background: none;
  padding: 0;
  margin-top: 0.75rem;
}

.ma-team-member--minimal .ma-team-member__social-link {
  background: var(--ma-bg-tertiary, #f3f4f6);
  color: var(--ma-text-secondary, #6b7280);
}

/* Responsive */
@media (max-width: 768px) {
  .ma-team-member--horizontal {
    flex-direction: column;
  }

  .ma-team-member--horizontal .ma-team-member__image-wrapper {
    width: 100%;
    padding-top: 100%;
    min-height: 0;
  }

  .ma-team-member--horizontal .ma-team-member__image {
    position: absolute;
  }
}
</style>
