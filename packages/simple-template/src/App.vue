<template>
  <div class="app-layout">
    <MaNavbar :items="navItems">
      <template #logo>
        <div class="logo">
          <span class="logo-text">Simple Template</span>
        </div>
      </template>
      <template #actions>
        <MaButton variant="ghost" size="small">Log In</MaButton>
        <MaButton size="small">Get Started</MaButton>
      </template>
    </MaNavbar>

    <main class="main-content">
      <router-view />
    </main>

    <AppFooter />
    
    <MaThemeCustomizer />
    <MaAiAssistant title="Help Bot" />
    <MaToast ref="toastRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import AppFooter from './components/AppFooter.vue'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/features' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Documentation', to: '/components' }
]

const toastRef = ref()

provide('toast', (options: any) => {
  toastRef.value?.add(options)
})
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--ma-bg-page, #f9fafb);
}

.main-content {
  flex: 1;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--ma-primary);
}
</style>
