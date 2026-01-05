<template>
  <button 
    class="ma-button"
    :class="[
      `ma-button--${variant}`,
      `ma-button--${color}`,
      `ma-button--${size}`,
      { 
        'is-loading': loading,
        'is-block': block,
        'is-icon-only': !hasContent && (icon || loading || $slots.icon)
      }
    ]" 
    :disabled="disabled || loading"
    :aria-label="ariaLabel || (icon ? `${icon} button` : undefined)"
    @click="handleClick"
  >
    <span v-if="loading" class="ma-button-loader"></span>
    <span v-else-if="$slots.icon" class="ma-button-icon">
      <slot name="icon" />
    </span>
    <component v-else-if="icon" :is="iconComponent" class="ma-button-icon" :size="iconSize" />
    <span v-if="hasContent" class="ma-button-content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import * as LucideIcons from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  variant?: 'solid' | 'outline' | 'ghost' | 'text';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'small' | 'medium' | 'large';
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  ariaLabel?: string;
}>(), {
  variant: 'solid',
  color: 'primary',
  size: 'medium',
  block: false,
  loading: false,
  disabled: false
});

const emit = defineEmits(['click']);
const slots = useSlots();

const hasContent = computed(() => !!slots.default);

const iconComponent = computed(() => {
  if (!props.icon) return null;
  return (LucideIcons as any)[props.icon];
});

const iconSize = computed(() => {
  switch (props.size) {
    case 'small': return 14;
    case 'large': return 20;
    default: return 16;
  }
});

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script>

<style scoped>
.ma-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  font-weight: 500;
  font-family: inherit;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  gap: 8px;
  outline: none;
  position: relative;
  white-space: nowrap;
  user-select: none;
}

.ma-button:active:not(:disabled) {
  transform: scale(0.98);
}

.ma-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.ma-button.is-block {
  width: 100%;
  display: flex;
}

/* Sizes */
.ma-button--small {
  height: 32px;
  padding: 0 12px;
  font-size: 0.75rem;
}

.ma-button--medium {
  height: 40px;
  padding: 0 16px;
  font-size: 0.875rem;
}

.ma-button--large {
  height: 48px;
  padding: 0 24px;
  font-size: 1rem;
}

.ma-button.is-icon-only.ma-button--small { width: 32px; padding: 0; }
.ma-button.is-icon-only.ma-button--medium { width: 40px; padding: 0; }
.ma-button.is-icon-only.ma-button--large { width: 48px; padding: 0; }

/* Loader */
.ma-button-loader {
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: ma-button-spin 1s linear infinite;
}

@keyframes ma-button-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Variants & Colors */

/* Solid (Default) */
.ma-button--solid.ma-button--primary {
  background-color: var(--ma-primary);
  color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.ma-button--solid.ma-button--primary:hover:not(:disabled) { background-color: var(--ma-primary-hover); }

.ma-button--solid.ma-button--secondary {
  background-color: var(--ma-bg-secondary);
  color: var(--ma-text-main);
}
.ma-button--solid.ma-button--secondary:hover:not(:disabled) { filter: brightness(0.95); }

.ma-button--solid.ma-button--success { background-color: var(--ma-success); color: white; }
.ma-button--solid.ma-button--success:hover:not(:disabled) { filter: brightness(0.9); }

.ma-button--solid.ma-button--warning { background-color: var(--ma-warning); color: white; }
.ma-button--solid.ma-button--warning:hover:not(:disabled) { filter: brightness(0.9); }

.ma-button--solid.ma-button--danger { background-color: var(--ma-danger); color: white; }
.ma-button--solid.ma-button--danger:hover:not(:disabled) { filter: brightness(0.9); }

/* Outline */
.ma-button--outline {
  background-color: transparent;
  border-color: currentColor;
}

.ma-button--outline.ma-button--primary { color: var(--ma-primary); border-color: var(--ma-primary); }
.ma-button--outline.ma-button--primary:hover:not(:disabled) { background-color: var(--ma-primary-light); }

.ma-button--outline.ma-button--secondary { color: var(--ma-text-main); border-color: var(--ma-border); }
.ma-button--outline.ma-button--secondary:hover:not(:disabled) { background-color: var(--ma-bg-secondary); }

.ma-button--outline.ma-button--danger { color: var(--ma-danger); border-color: var(--ma-danger); }
.ma-button--outline.ma-button--danger:hover:not(:disabled) { background-color: rgba(220, 38, 38, 0.1); }

/* Ghost */
.ma-button--ghost {
  background-color: transparent;
  color: var(--ma-text-main);
}
.ma-button--ghost:hover:not(:disabled) { background-color: var(--ma-bg-secondary); }

.ma-button--ghost.ma-button--primary { color: var(--ma-primary); }
.ma-button--ghost.ma-button--primary:hover:not(:disabled) { background-color: var(--ma-primary-light); }

.ma-button--ghost.ma-button--danger { color: var(--ma-danger); }
.ma-button--ghost.ma-button--danger:hover:not(:disabled) { background-color: rgba(220, 38, 38, 0.1); }

/* Text */
.ma-button--text {
  background-color: transparent;
  padding: 0;
  height: auto;
  min-height: 0;
}
.ma-button--text:hover:not(:disabled) { text-decoration: underline; }

.ma-button--text.ma-button--primary { color: var(--ma-primary); }
.ma-button--text.ma-button--secondary { color: var(--ma-text-secondary); }
.ma-button--text.ma-button--danger { color: var(--ma-danger); }
</style>
