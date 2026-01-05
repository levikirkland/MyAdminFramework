<template>
  <div class="ma-badge-wrapper">
    <slot />
    <transition name="ma-badge-zoom">
      <sup
        v-if="showBadge"
        class="ma-badge"
        :class="[
          `ma-badge--${status || color}`,
          { 
            'is-dot': dot,
            'is-fixed': $slots.default
          }
        ]"
        :style="customStyle"
      >
        <template v-if="!dot">
          {{ displayValue }}
        </template>
      </sup>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  value?: string | number;
  max?: number;
  dot?: boolean;
  showZero?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  status?: 'success' | 'processing' | 'default' | 'error' | 'warning';
  bgColor?: string;
  textColor?: string;
}>(), {
  color: 'danger',
  dot: false,
  showZero: false,
});

const showBadge = computed(() => {
  if (props.dot) return true;
  if (props.value === 0 || props.value === '0') return props.showZero;
  return props.value !== undefined && props.value !== null && props.value !== '';
});

const displayValue = computed(() => {
  if (props.dot) return '';
  if (typeof props.value === 'number' && props.max && props.value > props.max) {
    return `${props.max}+`;
  }
  return props.value;
});

const customStyle = computed(() => {
  const style: Record<string, string> = {};
  if (props.bgColor) style.backgroundColor = props.bgColor;
  if (props.textColor) style.color = props.textColor;
  return style;
});
</script>

<style scoped>
.ma-badge-wrapper {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  flex-shrink: 0;
}

.ma-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  font-size: 12px;
  white-space: nowrap;
  color: white;
  background-color: var(--ma-danger);
  border-radius: 10px;
  height: 20px;
  padding: 0 6px;
  line-height: 1;
  font-weight: 500;
  transition: all 0.2s;
  border: 1px solid white;
}

/* Fixed position when wrapping content */
.ma-badge.is-fixed {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  transform-origin: 100% 0%;
}

/* Dot Mode */
.ma-badge.is-dot {
  height: 8px;
  width: 8px;
  padding: 0;
  border-radius: 50%;
}

/* Colors */
.ma-badge--primary { background-color: var(--ma-primary); }
.ma-badge--secondary { background-color: var(--ma-text-secondary); }
.ma-badge--success { background-color: var(--ma-success); }
.ma-badge--warning { background-color: var(--ma-warning); }
.ma-badge--danger { background-color: var(--ma-danger); }
.ma-badge--info { background-color: var(--ma-info); }

/* Status Colors (useful for standalone status dots) */
.ma-badge--processing { background-color: var(--ma-primary); }
.ma-badge--default { background-color: var(--ma-border); }

/* Animation */
.ma-badge-zoom-enter-active,
.ma-badge-zoom-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.ma-badge-zoom-enter-from,
.ma-badge-zoom-leave-to {
  transform: scale(0) translate(50%, -50%);
  opacity: 0;
}

/* If not fixed, adjust transform for animation */
.ma-badge:not(.is-fixed).ma-badge-zoom-enter-from,
.ma-badge:not(.is-fixed).ma-badge-zoom-leave-to {
  transform: scale(0);
}
</style>
