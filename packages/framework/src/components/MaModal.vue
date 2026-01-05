<template>
  <Teleport to="body">
    <Transition name="ma-modal-fade">
      <div 
        v-if="modelValue" 
        class="ma-modal-overlay" 
        :class="{ 'is-centered': centered }"
        @click.self="handleMaskClick"
      >
        <Transition name="ma-modal-slide">
          <div 
            v-if="modelValue" 
            class="ma-modal" 
            :class="[`ma-modal--${size}`]"
            :style="customStyle"
          >
            <div class="ma-modal-header">
              <h3 class="ma-modal-title">
                <slot name="title">{{ title }}</slot>
              </h3>
              <button v-if="closable" class="ma-modal-close" @click="close">
                <X :size="20" />
              </button>
            </div>
            
            <div class="ma-modal-body">
              <slot></slot>
            </div>

            <div v-if="$slots.footer" class="ma-modal-footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { X } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  modelValue: boolean;
  title?: string;
  width?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
  centered?: boolean;
  closable?: boolean;
  maskClosable?: boolean;
}>(), {
  size: 'medium',
  centered: true,
  closable: true,
  maskClosable: true
});

const emit = defineEmits(['update:modelValue', 'close']);

const close = () => {
  emit('update:modelValue', false);
  emit('close');
};

const handleMaskClick = () => {
  if (props.maskClosable) {
    close();
  }
};

const customStyle = computed(() => {
  if (props.width) {
    return { maxWidth: props.width, width: '100%' };
  }
  return {};
});
</script>

<style scoped>
.ma-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  z-index: 1000;
  backdrop-filter: blur(4px);
  overflow-y: auto;
  padding: 20px;
}

.ma-modal-overlay.is-centered {
  align-items: center;
  justify-content: center;
}

.ma-modal-overlay:not(.is-centered) {
  align-items: flex-start;
  justify-content: center;
  padding-top: 100px;
}

.ma-modal {
  background: var(--ma-bg-card);
  border-radius: 12px;
  width: 100%;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 40px);
  position: relative;
  margin: auto;
}

/* Sizes */
.ma-modal--small { max-width: 400px; }
.ma-modal--medium { max-width: 600px; }
.ma-modal--large { max-width: 800px; }
.ma-modal--full { 
  max-width: 100%; 
  height: 100%; 
  max-height: 100%; 
  border-radius: 0;
  margin: 0;
}

.ma-modal-header {
  padding: 16px 24px;
  border-bottom: 1px solid var(--ma-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.ma-modal-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--ma-text-main);
  flex: 1;
  min-width: 0;
}

.ma-modal-close {
  background: none;
  border: none;
  color: var(--ma-text-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ma-modal-close:hover {
  background: var(--ma-bg-page);
  color: var(--ma-text-main);
}

.ma-modal-body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
  color: var(--ma-text-main);
}

.ma-modal-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--ma-border);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex-shrink: 0;
  background: var(--ma-bg-card);
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

/* Transitions */
.ma-modal-fade-enter-active,
.ma-modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.ma-modal-fade-enter-from,
.ma-modal-fade-leave-to {
  opacity: 0;
}

.ma-modal-slide-enter-active,
.ma-modal-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.ma-modal-slide-enter-from,
.ma-modal-slide-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-20px);
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
