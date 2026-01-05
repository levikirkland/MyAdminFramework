<template>
  <div class="features-page">
    <div class="page-header">
      <h1>Powerful Features</h1>
      <p>Everything you need to build world-class applications.</p>
    </div>

    <div class="features-tabs">
      <MaTabs v-model="activeTab" :items="tabItems">
        <div v-if="activeTab === 'performance'" class="tab-content">
          <div class="feature-block">
            <div class="feature-content">
              <div class="feature-icon">
                <Zap />
              </div>
              <h2>Lightning Fast Performance</h2>
              <p>
                Built on top of Vite and Vue 3, our framework delivers exceptional performance. 
                Optimized bundle sizes and efficient rendering ensure your application loads instantly.
              </p>
              <ul class="feature-list">
                <li><Check /> Zero-config build setup</li>
                <li><Check /> Tree-shakable components</li>
                <li><Check /> Optimized for Core Web Vitals</li>
              </ul>
            </div>
            <div class="feature-image">
              <div class="placeholder-ui code-window">
                <div class="window-header">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>
                <div class="window-body">
                  <pre><code>import { createApp } from 'vue'
import App from './App.vue'
import MyAdmin from 'my-admin-framework'

const app = createApp(App)
app.use(MyAdmin)
app.mount('#app')</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'theming'" class="tab-content">
          <div class="feature-block">
            <div class="feature-content">
              <div class="feature-icon">
                <Palette />
              </div>
              <h2>Beautifully Themed</h2>
              <p>
                Customize every aspect of your application with our flexible theming system. 
                Support for dark mode, custom color palettes, and typography comes standard.
              </p>
              <ul class="feature-list">
                <li><Check /> CSS Variables support</li>
                <li><Check /> Dark mode ready</li>
                <li><Check /> Tailwind-compatible utility classes</li>
              </ul>
            </div>
            <div class="feature-image">
              <div class="placeholder-ui theme-preview">
                <div class="color-swatch primary"></div>
                <div class="color-swatch secondary"></div>
                <div class="color-swatch accent"></div>
                <div class="typography-preview">
                  <div class="line title"></div>
                  <div class="line body"></div>
                  <div class="line body"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'security'" class="tab-content">
          <div class="feature-block">
            <div class="feature-content">
              <div class="feature-icon">
                <Shield />
              </div>
              <h2>Enterprise Grade Security</h2>
              <p>
                Security is not an afterthought. We include built-in protection against common vulnerabilities
                and provide robust access control mechanisms.
              </p>
              <ul class="feature-list">
                <li><Check /> Role-based Access Control (RBAC)</li>
                <li><Check /> XSS protection</li>
                <li><Check /> Secure authentication flows</li>
              </ul>
            </div>
            <div class="feature-image">
              <div class="placeholder-ui security-shield">
                <Shield size="64" />
              </div>
            </div>
          </div>
        </div>
      </MaTabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Zap, Palette, Shield, Check } from 'lucide-vue-next'

const activeTab = ref('performance')

const tabItems = [
  { label: 'Performance', value: 'performance' },
  { label: 'Theming', value: 'theming' },
  { label: 'Security', value: 'security' }
]
</script>

<style scoped>
.features-page {
  padding: 80px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 60px;
}

.features-tabs {
  margin-top: 40px;
}

.tab-content {
  padding: 40px 0;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ... existing styles ... */

.feature-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.feature-block.reversed {
  direction: rtl;
}

.feature-block.reversed .feature-content {
  direction: ltr;
}

.feature-icon {
  width: 48px;
  height: 48px;
  background: var(--ma-primary-light);
  color: var(--ma-primary);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.feature-content h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--ma-text-main);
}

.feature-content p {
  font-size: 1.125rem;
  color: var(--ma-text-secondary);
  line-height: 1.7;
  margin-bottom: 32px;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  color: var(--ma-text-main);
}

.feature-list li svg {
  width: 20px;
  height: 20px;
  color: var(--ma-success);
}

/* Placeholder UIs */
.feature-image {
  position: relative;
}

.placeholder-ui {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--ma-border);
  overflow: hidden;
  aspect-ratio: 4/3;
  display: flex;
  align-items: center;
  justify-content: center;
}

.code-window {
  background: #1e1e1e;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.window-header {
  width: 100%;
  height: 40px;
  background: #2d2d2d;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.dot.red { background: #ff5f56; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #27c93f; }

.window-body {
  padding: 24px;
  width: 100%;
}

.window-body pre {
  margin: 0;
  color: #d4d4d4;
  font-family: monospace;
  font-size: 0.9rem;
}

.theme-preview {
  flex-direction: column;
  padding: 32px;
  gap: 24px;
  background: #f9fafb;
}

.color-swatch {
  width: 100%;
  height: 60px;
  border-radius: 8px;
}
.color-swatch.primary { background: var(--ma-primary); }
.color-swatch.secondary { background: #a855f7; }
.color-swatch.accent { background: #ec4899; }

.typography-preview {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.line {
  height: 12px;
  background: #e5e7eb;
  border-radius: 6px;
}
.line.title { width: 60%; height: 24px; margin-bottom: 8px; }
.line.body { width: 100%; }

.security-shield {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  color: var(--ma-primary);
}

@media (max-width: 992px) {
  .feature-block {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .feature-block.reversed {
    direction: ltr;
  }
}
</style>
