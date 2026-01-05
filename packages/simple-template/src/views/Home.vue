<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            Build faster with <span class="gradient-text">MyAdmin Framework</span>
          </h1>
          <p class="hero-subtitle">
            A comprehensive Vue 3 component library designed for building modern admin interfaces and data-rich applications with ease.
          </p>
          <div class="hero-actions">
            <MaButton size="large" @click="$router.push('/components')">
              Browse Components
              <template #icon><ArrowRight /></template>
            </MaButton>
            <MaButton size="large" variant="outline" @click="openGithub">
              View on GitHub
              <template #icon><Github /></template>
            </MaButton>
          </div>
        </div>
        <div class="hero-image">
          <div class="placeholder-ui">
            <div class="ui-header">
              <div class="dots">
                <span></span><span></span><span></span>
              </div>
            </div>
            <div class="ui-body">
              <div class="ui-sidebar"></div>
              <div class="ui-content">
                <div class="ui-skeleton-header"></div>
                <div class="ui-skeleton-row"></div>
                <div class="ui-skeleton-row"></div>
                <div class="ui-skeleton-row"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features">
      <div class="container">
        <div class="section-header">
          <h2>Everything you need</h2>
          <p>From e-commerce to recipes, we've got you covered with beautiful, production-ready components.</p>
        </div>
        
        <div class="features-grid">
          <div v-for="feature in features" :key="feature.title" class="feature-card">
            <div class="feature-icon">
              <component :is="feature.icon" size="24" />
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Showcase Section -->
    <section class="showcase">
      <div class="container">
        <div class="section-header">
          <h2>Built for Every Use Case</h2>
          <p>See what you can build with MyAdmin Framework</p>
        </div>
        
        <div class="showcase-grid">
          <div class="showcase-item">
            <div class="showcase-label">E-Commerce</div>
            <h3>🛒 Shopping Cart & Checkout</h3>
            <p>Complete cart management with checkout flow, promo codes, and order tracking</p>
          </div>
          <div class="showcase-item">
            <div class="showcase-label">Content</div>
            <h3>📝 Blog & Articles</h3>
            <p>Beautiful blog cards with featured images, tags, read time, and rich author info</p>
          </div>
          <div class="showcase-item">
            <div class="showcase-label">Careers</div>
            <h3>💼 Job Listings & Cards</h3>
            <p>Showcase opportunities with filterable job boards, location badges, and apply forms</p>
          </div>
          <div class="showcase-item">
            <div class="showcase-label">Social Proof</div>
            <h3>⭐ Testimonials</h3>
            <p>Build trust with customer reviews, star ratings, and company logos</p>
          </div>
          <div class="showcase-item">
            <div class="showcase-label">Recipes</div>
            <h3>🧑‍🍳 Recipe Cards</h3>
            <p>Display recipes with ingredients, instructions, and nutrition information</p>
          </div>
          <div class="showcase-item">
            <div class="showcase-label">Pricing</div>
            <h3>💳 Pricing Cards</h3>
            <p>Convert visitors with stunning pricing tables and comparison features</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to get started?</h2>
          <p>Join thousands of developers building with MyAdmin Framework.</p>
          <MaButton size="large" variant="solid" color="primary">Start Building Now</MaButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Github, Zap, Palette, Box, Layout, Shield, Globe } from 'lucide-vue-next'
import { MaButton } from 'my-admin-framework'

const features = [
  {
    title: 'Vue 3 & TypeScript',
    description: 'Built with the latest technology stack for best performance and developer experience.',
    icon: Zap
  },
  {
    title: 'Customizable Theme',
    description: 'Easily customize colors, typography, and spacing to match your brand identity.',
    icon: Palette
  },
  {
    title: '50+ Components',
    description: 'A rich collection of pre-built components ready to use out of the box.',
    icon: Box
  },
  {
    title: 'Responsive Layouts',
    description: 'Flexible layout system that works perfectly on any device size.',
    icon: Layout
  },
  {
    title: 'Enterprise Ready',
    description: 'Includes advanced features like ACL, i18n, and accessibility support.',
    icon: Shield
  },
  {
    title: 'Modern Tooling',
    description: 'Powered by Vite for lightning fast development and build times.',
    icon: Globe
  }
]

const openGithub = () => {
  window.open('https://github.com', '_blank')
}
</script>

<style scoped>
.home-page {
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Hero Section */
.hero {
  padding: 80px 0;
  background: linear-gradient(to bottom, var(--ma-bg-page), #fff);
  overflow: hidden;
}

.hero .container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.hero-content {
  max-width: 600px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
  color: var(--ma-text-main);
}

.gradient-text {
  background: linear-gradient(135deg, var(--ma-primary) 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--ma-text-secondary);
  margin-bottom: 32px;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 16px;
}

/* Hero Image / Placeholder UI */
.hero-image {
  position: relative;
}

.placeholder-ui {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--ma-border);
  overflow: hidden;
  aspect-ratio: 16/10;
  display: flex;
  flex-direction: column;
  transform: perspective(1000px) rotateY(-5deg) rotateX(5deg);
  transition: transform 0.3s ease;
}

.placeholder-ui:hover {
  transform: perspective(1000px) rotateY(0) rotateX(0);
}

.ui-header {
  height: 40px;
  background: #f3f4f6;
  border-bottom: 1px solid var(--ma-border);
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.dots {
  display: flex;
  gap: 6px;
}

.dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #d1d5db;
}

.dots span:nth-child(1) { background: #ef4444; }
.dots span:nth-child(2) { background: #f59e0b; }
.dots span:nth-child(3) { background: #10b981; }

.ui-body {
  flex: 1;
  display: flex;
}

.ui-sidebar {
  width: 20%;
  background: #f9fafb;
  border-right: 1px solid var(--ma-border);
}

.ui-content {
  flex: 1;
  padding: 24px;
}

.ui-skeleton-header {
  height: 32px;
  width: 40%;
  background: #e5e7eb;
  border-radius: 4px;
  margin-bottom: 24px;
}

.ui-skeleton-row {
  height: 16px;
  background: #f3f4f6;
  border-radius: 4px;
  margin-bottom: 12px;
}

.ui-skeleton-row:nth-child(3) { width: 80%; }
.ui-skeleton-row:nth-child(4) { width: 60%; }

/* Features Section */
.features {
  padding: 100px 0;
  background: #fff;
}

.section-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 64px;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--ma-text-main);
}

.section-header p {
  font-size: 1.125rem;
  color: var(--ma-text-secondary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.feature-card {
  padding: 32px;
  border-radius: 16px;
  background: #f9fafb;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  background: #fff;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 48px;
  height: 48px;
  background: var(--ma-primary-light, #e0e7ff);
  color: var(--ma-primary);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--ma-text-main);
}

.feature-card p {
  color: var(--ma-text-secondary);
  line-height: 1.6;
}

/* Showcase Section */
.showcase {
  padding: 80px 0;
  background: linear-gradient(to bottom, #fff, var(--ma-bg-page));
}

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 48px;
}

.showcase-item {
  padding: 32px;
  background: #fff;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.showcase-item:hover {
  border-color: var(--ma-primary);
  box-shadow: 0 10px 30px -10px rgba(59, 130, 246, 0.2);
  transform: translateY(-2px);
}

.showcase-label {
  display: inline-block;
  padding: 4px 12px;
  background: var(--ma-primary-light, #e0e7ff);
  color: var(--ma-primary);
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.showcase-item h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--ma-text-main);
}

.showcase-item p {
  color: var(--ma-text-secondary);
  line-height: 1.6;
}

/* CTA Section */
.cta {
  padding: 100px 0;
  background: var(--ma-bg-page);
  text-align: center;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  padding: 64px;
  border-radius: 24px;
  color: #fff;
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #fff;
}

.cta-content p {
  font-size: 1.25rem;
  color: #a5b4fc;
  margin-bottom: 32px;
}

/* Responsive */
@media (max-width: 992px) {
  .hero .container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-content {
    margin: 0 auto;
  }

  .hero-actions {
    justify-content: center;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .showcase-grid {
    grid-template-columns: 1fr;
  }

  .cta-content {
    padding: 40px 24px;
  }
}
</style>
