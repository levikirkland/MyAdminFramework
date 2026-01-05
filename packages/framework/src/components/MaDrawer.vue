<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="modelValue" class="ma-drawer-overlay" @click.self="close">
        <Transition :name="`slide-${placement}`">
          <div v-if="modelValue" class="ma-drawer" :class="[`is-${placement}`]" :style="{ width }">
            <div class="ma-drawer-header">
              <h3 class="ma-drawer-title">
                <slot name="title">{{ title }}</slot>
              </h3>
              <button class="ma-drawer-close" @click="close">
                <X :size="20" />
              </button>
            </div>
            
            <div class="ma-drawer-body">
              <slot></slot>
            </div>

            <div v-if="$slots.footer" class="ma-drawer-footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'

withDefaults(defineProps<{
  modelValue: boolean;
  title?: string;
  width?: string;
  placement?: 'right' | 'left';
}>(), {
  width: '400px',
  placement: 'right'
});

const emit = defineEmits(['update:modelValue', 'close']);

const close = () => {
  emit('update:modelValue', false);
  emit('close');
};
</script>

<style scoped>
.ma-drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: flex-end; /* Default for right placement */
}

.ma-drawer-overlay:has(.is-left) {
  justify-content: flex-start;
}

.ma-drawer {
  height: 100%;
  background: var(--ma-bg-card);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  max-width: 100%;
}

.ma-drawer-header {
  padding: 16px 24px;
  border-bottom: 1px solid var(--ma-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ma-drawer-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--ma-text-main);
  flex: 1;
  min-width: 0;
}

.ma-drawer-close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--ma-text-muted);
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ma-drawer-close:hover {
  background: var(--ma-bg-secondary);
  color: var(--ma-text-main);
}

.ma-drawer-body {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  color: var(--ma-text-main);
}

.ma-drawer-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--ma-border);
  background: var(--ma-bg-secondary);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}
</style>
