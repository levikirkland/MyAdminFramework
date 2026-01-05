<template>
  <footer :class="['ma-footer', `ma-footer--${variant}`]">
    <div class="ma-footer__container">
      <!-- Logo/Brand Section -->
      <div v-if="brand" class="ma-footer__brand">
        <div v-if="brand.logo" class="ma-footer__logo">
          <img v-if="typeof brand.logo === 'string'" :src="brand.logo" :alt="brand.name" />
          <component v-else :is="brand.logo" />
        </div>
        <h3 class="ma-footer__brand-name">{{ brand.name }}</h3>
        <p v-if="brand.description" class="ma-footer__brand-description">{{ brand.description }}</p>
        
        <!-- Social Links -->
        <div v-if="socialLinks && socialLinks.length > 0" class="ma-footer__social">
          <a
            v-for="(link, index) in socialLinks"
            :key="index"
            :href="link.url"
            :aria-label="link.platform"
            class="ma-footer__social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <component :is="getSocialIcon(link.platform)" :size="20" />
          </a>
        </div>
      </div>

      <!-- Links Sections -->
      <div v-if="sections && sections.length > 0" class="ma-footer__sections">
        <div
          v-for="(section, index) in sections"
          :key="index"
          class="ma-footer__section"
        >
          <h4 class="ma-footer__section-title">{{ section.title }}</h4>
          <ul class="ma-footer__links">
            <li v-for="(link, linkIndex) in section.links" :key="linkIndex">
              <a
                :href="link.url"
                class="ma-footer__link"
                :target="link.external ? '_blank' : undefined"
                :rel="link.external ? 'noopener noreferrer' : undefined"
              >
                {{ link.label }}
                <ExternalLink v-if="link.external" :size="14" class="ma-footer__external-icon" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div v-if="showBottom" class="ma-footer__bottom">
      <div class="ma-footer__bottom-container">
        <p class="ma-footer__copyright">{{ copyright }}</p>
        
        <div v-if="bottomLinks && bottomLinks.length > 0" class="ma-footer__bottom-links">
          <a
            v-for="(link, index) in bottomLinks"
            :key="index"
            :href="link.url"
            class="ma-footer__bottom-link"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {
  Linkedin,
  Twitter,
  Github,
  Globe,
  Facebook,
  Instagram,
  Youtube,
  ExternalLink
} from 'lucide-vue-next'

interface Link {
  label: string
  url: string
  external?: boolean
}

interface Section {
  title: string
  links: Link[]
}

interface SocialLink {
  platform: 'linkedin' | 'twitter' | 'github' | 'website' | 'facebook' | 'instagram' | 'youtube'
  url: string
}

interface Brand {
  name: string
  logo?: string | any
  description?: string
}

interface Props {
  brand?: Brand
  sections?: Section[]
  socialLinks?: SocialLink[]
  bottomLinks?: Link[]
  copyright?: string
  variant?: 'default' | 'compact' | 'minimal'
  showBottom?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  copyright: `© ${new Date().getFullYear()} All rights reserved.`,
  variant: 'default',
  showBottom: true
})

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
.ma-footer {
  background: var(--ma-bg-secondary, #fff);
  border-top: 1px solid var(--ma-border-color, #e5e7eb);
}

.ma-footer__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  display: grid;
  grid-template-columns: 1.5fr 3fr;
  gap: 3rem;
}

.ma-footer__brand {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.ma-footer__logo {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ma-footer__logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.ma-footer__brand-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--ma-text-primary, #1f2937);
  margin: 0;
}

.ma-footer__brand-description {
  font-size: 0.875rem;
  color: var(--ma-text-secondary, #6b7280);
  line-height: 1.6;
  margin: 0;
}

.ma-footer__social {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.ma-footer__social-link {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--ma-bg-tertiary, #f3f4f6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ma-text-secondary, #6b7280);
  transition: all 0.2s ease;
  text-decoration: none;
}

.ma-footer__social-link:hover {
  background: var(--ma-primary, #3b82f6);
  color: white;
  transform: translateY(-2px);
}

.ma-footer__sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
}

.ma-footer__section-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--ma-text-primary, #1f2937);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 1rem 0;
}

.ma-footer__links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ma-footer__link {
  font-size: 0.875rem;
  color: var(--ma-text-secondary, #6b7280);
  text-decoration: none;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.ma-footer__link:hover {
  color: var(--ma-primary, #3b82f6);
}

.ma-footer__external-icon {
  opacity: 0.5;
}

.ma-footer__bottom {
  border-top: 1px solid var(--ma-border-color, #e5e7eb);
  background: var(--ma-bg-tertiary, #f9fafb);
}

.ma-footer__bottom-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.ma-footer__copyright {
  font-size: 0.875rem;
  color: var(--ma-text-secondary, #6b7280);
  margin: 0;
}

.ma-footer__bottom-links {
  display: flex;
  gap: 1.5rem;
}

.ma-footer__bottom-link {
  font-size: 0.875rem;
  color: var(--ma-text-secondary, #6b7280);
  text-decoration: none;
  transition: color 0.2s ease;
}

.ma-footer__bottom-link:hover {
  color: var(--ma-primary, #3b82f6);
}

/* Compact Variant */
.ma-footer--compact .ma-footer__container {
  padding: 2rem;
  gap: 2rem;
}

.ma-footer--compact .ma-footer__sections {
  gap: 1.5rem;
}

/* Minimal Variant */
.ma-footer--minimal .ma-footer__container {
  grid-template-columns: 1fr;
  text-align: center;
  gap: 2rem;
}

.ma-footer--minimal .ma-footer__brand {
  align-items: center;
}

.ma-footer--minimal .ma-footer__social {
  justify-content: center;
}

.ma-footer--minimal .ma-footer__sections {
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
}

/* Responsive */
@media (max-width: 968px) {
  .ma-footer__container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .ma-footer__sections {
    grid-template-columns: repeat(2, 1fr);
  }

  .ma-footer__bottom-container {
    flex-direction: column;
    text-align: center;
  }

  .ma-footer__bottom-links {
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .ma-footer__container {
    padding: 2rem 1rem;
  }

  .ma-footer__sections {
    grid-template-columns: 1fr;
  }

  .ma-footer__bottom-container {
    padding: 1.5rem 1rem;
  }
}
</style>
