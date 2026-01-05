<template>
  <header class="ma-header">
    <div class="ma-header__left">
      <button 
        v-if="sidebarState?.layout !== 'top-nav'"
        class="hamburger" 
        @click="sidebarState?.toggle()"
      >
        <Menu :size="24" />
      </button>
      <div class="ma-header__title">
        <slot name="title" />
      </div>
    </div>
    <div class="ma-header__nav">
      <slot name="nav" />
    </div>
    <div class="ma-header__actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { Menu } from 'lucide-vue-next'

const sidebarState = inject<{ 
  isOpen: { value: boolean }, 
  toggle: () => void,
  layout?: 'sidebar' | 'top-nav'
}>('sidebarState')
</script>

<style scoped lang="scss">
.ma-header {
  height: 64px;
  background: var(--ma-bg-header);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  border-bottom: 1px solid var(--ma-border);
  position: sticky;
  top: 0;
  z-index: 10;
  transition: all 0.3s ease;

  &__left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .hamburger {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: var(--ma-text-main);

    @media (max-width: 1024px) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--ma-text-main);
  }

  &__nav {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 24px;
    overflow-x: auto;
    
    @media (max-width: 768px) {
      display: none;
    }
  }

  &__actions {
    display: flex;
    gap: 12px;
  }

  @media (max-width: 768px) {
    padding: 0 16px;
  }
}
</style>
