<template>
  <label 
    class="ma-switch" 
    :class="[
      `ma-switch--${size}`,
      `ma-switch--${color}`,
      { 
        'is-disabled': disabled || loading, 
        'is-checked': modelValue,
        'is-loading': loading
      }
    ]"
  >
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled || loading"
      @change="handleChange"
      @focus="focused = true"
      @blur="focused = false"
    />
    
    <span class="ma-switch-core" :class="{ 'is-focused': focused }">
      <span class="ma-switch-action">
        <svg v-if="loading" class="ma-switch-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" stroke-width="4" stroke-dasharray="30 60" />
        </svg>
      </span>
    </span>

    <span v-if="label || $slots.default || activeText || inactiveText" class="ma-switch-label">
      <slot>
        {{ modelValue ? (activeText || label) : (inactiveText || label) }}
      </slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(defineProps<{
  modelValue?: boolean;
  label?: string;
  activeText?: string;
  inactiveText?: string;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}>(), {
  modelValue: false,
  disabled: false,
  loading: false,
  size: 'medium',
  color: 'primary'
});

const emit = defineEmits(['update:modelValue', 'change']);

const focused = ref(false);

const handleChange = (event: Event) => {
  if (props.disabled || props.loading) return;
  const checked = (event.target as HTMLInputElement).checked;
  emit('update:modelValue', checked);
  emit('change', checked);
};
</script>

<style scoped>
.ma-switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  font-size: 0.875rem;
  color: var(--ma-text-main);
  position: relative;
}

.ma-switch input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  margin: 0;
}

.ma-switch-core {
  position: relative;
  display: inline-block;
  background-color: var(--ma-border);
  border-radius: 100px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
  flex-shrink: 0;
}

.ma-switch-action {
  position: absolute;
  top: 2px;
  left: 2px;
  border-radius: 50%;
  background-color: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.ma-switch.is-checked .ma-switch-core {
  background-color: currentColor;
}

.ma-switch.is-checked .ma-switch-action {
  left: 100%;
  transform: translateX(calc(-100% - 2px));
}

.ma-switch-core.is-focused {
  box-shadow: 0 0 0 3px var(--ma-primary-light);
}

.ma-switch.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Spinner */
.ma-switch-spinner {
  width: 70%;
  height: 70%;
  animation: ma-switch-spin 1s linear infinite;
  color: var(--ma-primary);
}

.ma-switch.is-checked .ma-switch-spinner {
  color: currentColor;
}

@keyframes ma-switch-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Sizes */
.ma-switch--small .ma-switch-core { width: 32px; height: 18px; }
.ma-switch--small .ma-switch-action { width: 14px; height: 14px; }
.ma-switch--small { font-size: 0.75rem; }

.ma-switch--medium .ma-switch-core { width: 44px; height: 24px; }
.ma-switch--medium .ma-switch-action { width: 20px; height: 20px; }
.ma-switch--medium { font-size: 0.875rem; }

.ma-switch--large .ma-switch-core { width: 56px; height: 30px; }
.ma-switch--large .ma-switch-action { width: 26px; height: 26px; }
.ma-switch--large { font-size: 1rem; }

/* Colors */
.ma-switch--primary { color: var(--ma-primary); }
.ma-switch--primary .ma-switch-label { color: var(--ma-text-main); }

.ma-switch--success { color: var(--ma-success); }
.ma-switch--success .ma-switch-label { color: var(--ma-text-main); }

.ma-switch--warning { color: var(--ma-warning); }
.ma-switch--warning .ma-switch-label { color: var(--ma-text-main); }

.ma-switch--danger { color: var(--ma-danger); }
.ma-switch--danger .ma-switch-label { color: var(--ma-text-main); }

.ma-switch--info { color: var(--ma-info); }
.ma-switch--info .ma-switch-label { color: var(--ma-text-main); }
</style>
