<template>
  <Transition name="ma-alert-fade">
    <div 
      v-if="visible" 
      class="ma-alert" 
      :class="[
        `ma-alert--${type}`,
        `ma-alert--${variant}`,
        { 'has-icon': showIcon, 'is-banner': banner }
      ]"
    >
      <div v-if="showIcon" class="ma-alert-icon">
        <slot name="icon">
          <component :is="iconComponent" :size="20" />
        </slot>
      </div>
      
      <div class="ma-alert-content">
        <div v-if="title || $slots.title" class="ma-alert-title">
          <slot name="title">{{ title }}</slot>
        </div>
        <div class="ma-alert-description">
          <slot />
        </div>
      </div>

      <button v-if="closable" class="ma-alert-close" @click="handleClose" type="button">
        <component :is="closeIconComponent" :size="16" />
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import * as LucideIcons from 'lucide-vue-next';

const props = withDefaults(defineProps<{
  type?: 'success' | 'warning' | 'error' | 'info';
  variant?: 'light' | 'solid' | 'outline';
  title?: string;
  closable?: boolean;
  showIcon?: boolean;
  banner?: boolean;
  icon?: string;
}>(), {
  type: 'info',
  variant: 'light',
  closable: false,
  showIcon: true,
  banner: false
});

const emit = defineEmits(['close']);

const visible = ref(true);

const iconComponent = computed(() => {
  if (props.icon) return (LucideIcons as any)[props.icon];
  
  switch (props.type) {
    case 'success': return LucideIcons.CheckCircle;
    case 'warning': return LucideIcons.AlertTriangle;
    case 'error': return LucideIcons.XCircle;
    default: return LucideIcons.Info;
  }
});

const closeIconComponent = computed(() => LucideIcons.X);

const handleClose = (e: MouseEvent) => {
  visible.value = false;
  emit('close', e);
};
</script>

<style scoped>
.ma-alert {
  display: flex;
  align-items: flex-start;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid transparent;
  position: relative;
  line-height: 1.5;
  font-size: 0.875rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 16px;
}

.ma-alert.is-banner {
  border-radius: 0;
  border-left: none;
  border-right: none;
  margin-bottom: 0;
}

/* Icon */
.ma-alert-icon {
  margin-right: 12px;
  display: flex;
  align-items: center;
  height: 24px; /* Align with title line-height */
  flex-shrink: 0;
}

/* Content */
.ma-alert-content {
  flex: 1;
  min-width: 0;
}

.ma-alert-title {
  font-weight: 600;
  margin-bottom: 4px;
  font-size: 1rem;
  line-height: 24px;
}

.ma-alert-description {
  font-size: 0.875rem;
  line-height: 22px;
}

/* Close Button */
.ma-alert-close {
  margin-left: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  opacity: 0.6;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  height: 24px;
  width: 24px;
  color: currentColor;
}

.ma-alert-close:hover {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.05);
}

/* Variants & Types */

/* Light (Default) */
.ma-alert--light.ma-alert--info { background-color: var(--ma-info-light, #eff6ff); color: var(--ma-info, #2563eb); border-color: rgba(37, 99, 235, 0.1); }
.ma-alert--light.ma-alert--success { background-color: var(--ma-success-light, #f0fdf4); color: var(--ma-success, #16a34a); border-color: rgba(22, 163, 74, 0.1); }
.ma-alert--light.ma-alert--warning { background-color: var(--ma-warning-light, #fffbeb); color: var(--ma-warning, #d97706); border-color: rgba(217, 119, 6, 0.1); }
.ma-alert--light.ma-alert--error { background-color: var(--ma-danger-light, #fef2f2); color: var(--ma-danger, #dc2626); border-color: rgba(220, 38, 38, 0.1); }

/* Solid */
.ma-alert--solid { color: white; border: none; }
.ma-alert--solid .ma-alert-close:hover { background-color: rgba(255, 255, 255, 0.2); }

.ma-alert--solid.ma-alert--info { background-color: var(--ma-info, #2563eb); }
.ma-alert--solid.ma-alert--success { background-color: var(--ma-success, #16a34a); }
.ma-alert--solid.ma-alert--warning { background-color: var(--ma-warning, #d97706); }
.ma-alert--solid.ma-alert--error { background-color: var(--ma-danger, #dc2626); }

/* Outline */
.ma-alert--outline { background-color: transparent; }

.ma-alert--outline.ma-alert--info { border-color: var(--ma-info); color: var(--ma-info); }
.ma-alert--outline.ma-alert--success { border-color: var(--ma-success); color: var(--ma-success); }
.ma-alert--outline.ma-alert--warning { border-color: var(--ma-warning); color: var(--ma-warning); }
.ma-alert--outline.ma-alert--error { border-color: var(--ma-danger); color: var(--ma-danger); }

/* Transition */
.ma-alert-fade-enter-active,
.ma-alert-fade-leave-active {
  transition: all 0.3s ease;
  max-height: 200px;
  opacity: 1;
  margin-bottom: 16px;
}

.ma-alert-fade-enter-from,
.ma-alert-fade-leave-to {
  opacity: 0;
  max-height: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
  transform: scaleY(0);
}
</style>
