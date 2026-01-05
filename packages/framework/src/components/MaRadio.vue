<template>
  <label 
    class="ma-radio" 
    :class="[
      `ma-radio--${size}`,
      `ma-radio--${color}`,
      { 'is-disabled': disabled, 'is-checked': isChecked }
    ]"
  >
    <input
      type="radio"
      class="ma-radio-input"
      :name="name"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      @change="handleChange"
      @focus="focused = true"
      @blur="focused = false"
    />
    <span 
      class="ma-radio-circle"
      :class="{ 'is-focused': focused }"
    ></span>
    <span v-if="label || $slots.default" class="ma-radio-label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  modelValue?: any;
  value?: any;
  name?: string;
  label?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}>(), {
  disabled: false,
  size: 'medium',
  color: 'primary'
})

const emit = defineEmits(['update:modelValue', 'change'])

const focused = ref(false)

const isChecked = computed(() => props.modelValue === props.value)

const handleChange = () => {
  if (props.disabled) return
  emit('update:modelValue', props.value)
  emit('change', props.value)
}
</script>

<style scoped>
.ma-radio {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  user-select: none;
  position: relative;
  font-size: 0.875rem;
  color: var(--ma-text-main);
}

.ma-radio.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.ma-radio-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  z-index: -1;
}

.ma-radio-circle {
  border: 2px solid var(--ma-border);
  border-radius: 50%;
  background: var(--ma-bg-page);
  position: relative;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.ma-radio-circle::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 50%;
  height: 50%;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.ma-radio.is-checked .ma-radio-circle {
  background: currentColor;
  border-color: currentColor;
}

.ma-radio.is-checked .ma-radio-circle::after {
  transform: translate(-50%, -50%) scale(1);
}

.ma-radio-circle.is-focused {
  box-shadow: 0 0 0 3px var(--ma-primary-light);
  border-color: var(--ma-primary);
}

/* Sizes */
.ma-radio--small .ma-radio-circle { width: 16px; height: 16px; }
.ma-radio--small { font-size: 0.75rem; }

.ma-radio--medium .ma-radio-circle { width: 20px; height: 20px; }
.ma-radio--medium { font-size: 0.875rem; }

.ma-radio--large .ma-radio-circle { width: 24px; height: 24px; }
.ma-radio--large { font-size: 1rem; }

/* Colors */
.ma-radio--primary { color: var(--ma-primary); }
.ma-radio--primary .ma-radio-label { color: var(--ma-text-main); }

.ma-radio--success { color: var(--ma-success); }
.ma-radio--success .ma-radio-label { color: var(--ma-text-main); }

.ma-radio--warning { color: var(--ma-warning); }
.ma-radio--warning .ma-radio-label { color: var(--ma-text-main); }

.ma-radio--danger { color: var(--ma-danger); }
.ma-radio--danger .ma-radio-label { color: var(--ma-text-main); }

.ma-radio--info { color: var(--ma-info); }
.ma-radio--info .ma-radio-label { color: var(--ma-text-main); }
</style>
