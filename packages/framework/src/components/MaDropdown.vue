<template>
  <div class="ma-dropdown" v-click-outside="close">
    <div class="ma-dropdown-trigger" @click="toggle">
      <slot name="trigger" />
    </div>
    <transition name="fade">
      <div v-if="isOpen" class="ma-dropdown-menu" :class="[`is-${align}`]">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

withDefaults(defineProps<{
  align?: 'left' | 'right'
}>(), {
  align: 'right'
})

const isOpen = ref(false)

const toggle = () => isOpen.value = !isOpen.value
const close = () => isOpen.value = false

// Simple click outside directive
const vClickOutside = {
  mounted(el: any, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: any) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
</script>

<style scoped>
.ma-dropdown {
  position: relative;
  display: inline-block;
}

.ma-dropdown-trigger {
  cursor: pointer;
}

.ma-dropdown-menu {
  position: absolute;
  top: 100%;
  margin-top: 8px;
  background: var(--ma-bg-card);
  border: 1px solid var(--ma-border);
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  min-width: 160px;
  z-index: 50;
  padding: 8px;
}

.ma-dropdown-menu.is-right {
  right: 0;
}

.ma-dropdown-menu.is-left {
  left: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
