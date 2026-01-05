<template>
  <aside class="ma-sidebar" :class="{ 'is-open': sidebarState?.isOpen.value }">
    <div class="ma-sidebar__logo">
      <slot name="logo">MyAdmin</slot>
      <button class="mobile-close" @click="sidebarState?.toggle()">
        <X :size="24" />
      </button>
    </div>
    <nav class="ma-sidebar__nav">
      <slot />
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { X } from 'lucide-vue-next'

const sidebarState = inject<{ isOpen: { value: boolean }, toggle: () => void }>('sidebarState')
</script>

<style scoped lang="scss">
.ma-sidebar {
  width: 280px;
  background-color: var(--ma-bg-sidebar);
  border-right: 1px solid transparent; /* Keep border for layout but transparent */
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.02);
  color: var(--ma-text-main);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  transition: all 0.3s ease;
  z-index: 100;

  &__logo {
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--ma-primary);
  }

  .mobile-close {
    display: none;
    background: none;
    border: none;
    font-size: 24px;
    color: var(--ma-text-muted);
    cursor: pointer;
  }

  &__nav {
    padding: 24px 16px;
    flex: 1;
    overflow-y: auto;
  }

  @media (max-width: 1024px) {
    position: fixed;
    left: -280px;
    top: 0;
    bottom: 0;

    &.is-open {
      left: 0;
    }

    .mobile-close {
      display: block;
    }
  }
}
</style>
