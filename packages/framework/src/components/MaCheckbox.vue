<template>
  <label 
    class="ma-checkbox" 
    :class="[
      `ma-checkbox--${size}`,
      `ma-checkbox--${color}`,
      { 'is-disabled': disabled, 'is-checked': isChecked }
    ]"
  >
    <input
      type="checkbox"
      class="ma-checkbox-input"
      :checked="isChecked"
      :value="value"
      :disabled="disabled"
      @change="handleChange"
      @focus="focused = true"
      @blur="focused = false"
    />
    <span 
      class="ma-checkbox-box" 
      :class="{ 'is-indeterminate': indeterminate, 'is-focused': focused }"
    >
      <svg v-if="isChecked && !indeterminate" viewBox="0 0 24 24" class="check-icon" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <svg v-if="indeterminate" viewBox="0 0 24 24" class="check-icon" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </span>
    <span v-if="label || $slots.default" class="ma-checkbox-label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  modelValue?: boolean | any[];
  value?: any;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}>(), {
  modelValue: false,
  disabled: false,
  indeterminate: false,
  size: 'medium',
  color: 'primary'
})

const emit = defineEmits(['update:modelValue', 'change'])

const focused = ref(false)

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value)
  }
  return props.modelValue
})

const handleChange = (event: Event) => {
  if (props.disabled) return
  
  const target = event.target as HTMLInputElement
  const checked = target.checked

  let newValue: boolean | any[]

  if (Array.isArray(props.modelValue)) {
    newValue = [...props.modelValue]
    if (checked) {
      newValue.push(props.value)
    } else {
      const index = newValue.indexOf(props.value)
      if (index > -1) newValue.splice(index, 1)
    }
  } else {
    newValue = checked
  }
  
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<style scoped>
.ma-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
  user-select: none;
  position: relative;
  font-size: 0.875rem;
  color: var(--ma-text-main);
}

.ma-checkbox.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.ma-checkbox-input {
  position: absolute;
  opacity: 0;
  z-index: -1;
  width: 0;
  height: 0;
}

.ma-checkbox-box {
  border: 2px solid var(--ma-border);
  border-radius: 4px;
  background: var(--ma-bg-page);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.ma-checkbox-box.is-focused {
  box-shadow: 0 0 0 3px var(--ma-primary-light);
  border-color: var(--checkbox-color);
}

.ma-checkbox.is-checked .ma-checkbox-box,
.ma-checkbox-box.is-indeterminate {
  border-color: var(--checkbox-color);
  background-color: var(--checkbox-color);
  color: white;
}

.check-icon {
  width: 100%;
  height: 100%;
  padding: 2px;
}

/* Sizes */
.ma-checkbox--small .ma-checkbox-box { width: 16px; height: 16px; }
.ma-checkbox--small { font-size: 0.75rem; }

.ma-checkbox--medium .ma-checkbox-box { width: 20px; height: 20px; }
.ma-checkbox--medium { font-size: 0.875rem; }

.ma-checkbox--large .ma-checkbox-box { width: 24px; height: 24px; }
.ma-checkbox--large { font-size: 1rem; }

/* Colors */
.ma-checkbox--primary { --checkbox-color: var(--ma-primary); }
.ma-checkbox--success { --checkbox-color: var(--ma-success); }
.ma-checkbox--warning { --checkbox-color: var(--ma-warning); }
.ma-checkbox--danger { --checkbox-color: var(--ma-danger); }
.ma-checkbox--info { --checkbox-color: var(--ma-info); }
</style>
