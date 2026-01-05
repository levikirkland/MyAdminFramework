<template>
  <div 
    class="ma-layout" 
    :class="{ 
      'is-sidebar-open': isSidebarOpen,
      'ma-layout--top-nav': layout === 'top-nav'
    }"
  >
    <div class="ma-layout__sidebar-overlay" @click="isSidebarOpen = false"></div>
    <slot name="sidebar" :is-open="isSidebarOpen" v-if="layout === 'sidebar'" />
    <div class="ma-layout__main">
      <slot name="header" :toggle-sidebar="toggleSidebar" :layout="layout" />
      <main class="ma-layout__content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'

const props = withDefaults(defineProps<{
  layout?: 'sidebar' | 'top-nav'
}>(), {
  layout: 'sidebar'
})

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

provide('sidebarState', {
  isOpen: isSidebarOpen,
  toggle: toggleSidebar,
  layout: props.layout
})
</script>

<style scoped lang="scss">
.ma-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--ma-bg-page);
  color: var(--ma-text-main);
  transition: all 0.3s ease;
  position: relative;

  &__sidebar-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 90;
    backdrop-filter: blur(2px);
  }

  &__main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0; // Prevent flex items from overflowing
  }

  &__content {
    padding: 32px;
    flex: 1;
    width: 100%;
    margin: 0;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 0;

    @media (max-width: 768px) {
      padding: 16px;
    }
  }

  @media (max-width: 1024px) {
    &.is-sidebar-open .ma-layout__sidebar-overlay {
      display: block;
    }
  }
}
</style>
