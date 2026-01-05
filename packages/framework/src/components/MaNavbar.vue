<template>
  <nav class="ma-navbar">
    <div class="ma-navbar__container">
      <div class="ma-navbar__logo">
        <slot name="logo">
          <span class="ma-navbar__brand">Brand</span>
        </slot>
      </div>

      <!-- Desktop Menu -->
      <div class="ma-navbar__menu is-desktop">
        <template v-for="item in items" :key="item.key || item.label">
          <router-link 
            v-if="item.to" 
            :to="item.to" 
            custom 
            v-slot="{ navigate, href, isActive }"
          >
            <a 
              :href="href" 
              @click="navigate" 
              class="ma-navbar__link"
              :class="{ 'is-active': isActive }"
            >
              {{ item.label }}
            </a>
          </router-link>
          <a 
            v-else 
            :href="item.href || '#'" 
            class="ma-navbar__link"
          >
            {{ item.label }}
          </a>
        </template>
      </div>

      <div class="ma-navbar__actions is-desktop">
        <slot name="actions" />
      </div>

      <!-- Mobile Toggle -->
      <button class="ma-navbar__toggle is-mobile" @click="isOpen = !isOpen">
        <Menu v-if="!isOpen" />
        <X v-else />
      </button>
    </div>

    <!-- Mobile Menu -->
    <div class="ma-navbar__mobile-menu" v-if="isOpen">
      <template v-for="item in items" :key="item.key || item.label">
        <router-link 
          v-if="item.to" 
          :to="item.to" 
          custom 
          v-slot="{ navigate, href, isActive }"
        >
          <a 
            :href="href" 
            @click="navigate; isOpen = false" 
            class="ma-navbar__mobile-link"
            :class="{ 'is-active': isActive }"
          >
            {{ item.label }}
          </a>
        </router-link>
        <a 
          v-else 
          :href="item.href || '#'" 
          class="ma-navbar__mobile-link"
          @click="isOpen = false"
        >
          {{ item.label }}
        </a>
      </template>
      <div class="ma-navbar__mobile-actions">
        <slot name="actions" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'

export interface NavbarItem {
  label: string
  to?: string
  href?: string
  key?: string
}

defineProps<{
  items?: NavbarItem[]
}>()

const isOpen = ref(false)
</script>

<style scoped lang="scss">
.ma-navbar {
  background: var(--ma-bg-header, #fff);
  border-bottom: 1px solid var(--ma-border, #e5e7eb);
  position: sticky;
  top: 0;
  z-index: 50;
  height: 64px;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__logo {
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--ma-primary);
  }

  &__menu {
    display: flex;
    gap: 32px;
    align-items: center;
  }

  &__link {
    color: var(--ma-text-secondary, #6b7280);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;

    &:hover {
      color: var(--ma-primary);
    }

    &.is-active {
      color: var(--ma-primary);
    }
  }

  &__actions {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  &__toggle {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--ma-text-main);
    padding: 4px;
  }

  &__mobile-menu {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: var(--ma-bg-header, #fff);
    border-bottom: 1px solid var(--ma-border, #e5e7eb);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  &__mobile-link {
    display: block;
    padding: 8px 0;
    color: var(--ma-text-main);
    text-decoration: none;
    font-weight: 500;

    &.is-active {
      color: var(--ma-primary);
    }
  }

  &__mobile-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--ma-border);
  }
}

.is-desktop {
  display: none;
}

.is-mobile {
  display: block;
}

@media (min-width: 768px) {
  .is-desktop {
    display: flex;
  }

  .is-mobile {
    display: none;
  }
}
</style>
