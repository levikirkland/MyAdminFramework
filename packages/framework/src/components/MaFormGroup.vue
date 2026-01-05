<template>
  <div 
    class="ma-form-group" 
    :class="[
      `ma-form-group--${direction}`,
      status ? `is-${status}` : '',
      { 'has-error': error }
    ]"
  >
    <label 
      v-if="label || $slots.label" 
      class="ma-label"
      :style="{ width: labelWidth }"
    >
      <slot name="label">{{ label }}</slot>
      <span v-if="required" class="required-mark">*</span>
    </label>
    
    <div class="ma-control-container">
      <div class="ma-control-wrapper">
        <slot />
      </div>
      
      <div v-if="error" class="ma-error-message">
        <slot name="error">{{ error }}</slot>
      </div>
      
      <div v-else-if="help || hint || $slots.help" class="ma-help-text">
        <slot name="help">{{ help || hint }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  label?: string;
  error?: string;
  hint?: string;
  help?: string;
  required?: boolean;
  status?: 'success' | 'warning' | 'error';
  direction?: 'vertical' | 'horizontal';
  labelWidth?: string;
}>(), {
  direction: 'vertical'
});
</script>

<style scoped>
.ma-form-group {
  display: flex;
  margin-bottom: 20px;
}

.ma-form-group--vertical {
  flex-direction: column;
  gap: 8px;
}

.ma-form-group--horizontal {
  flex-direction: row;
  align-items: flex-start;
  gap: 16px;
}

.ma-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ma-text-main, #334155);
  line-height: 32px; /* Align with input height */
  flex-shrink: 0;
}

.ma-form-group--vertical .ma-label {
  line-height: 1.5;
}

.required-mark {
  color: var(--ma-danger, #dc2626);
  margin-left: 4px;
}

.ma-control-container {
  flex-grow: 1;
  min-width: 0; /* Prevent overflow */
}

.ma-control-wrapper {
  position: relative;
}

.ma-error-message {
  font-size: 0.75rem;
  color: var(--ma-danger, #dc2626);
  margin-top: 4px;
  min-height: 18px;
}

.ma-help-text {
  font-size: 0.75rem;
  color: var(--ma-text-secondary);
  margin-top: 4px;
  min-height: 18px;
}

/* Status Colors */
.is-success .ma-label { color: var(--ma-success, #16a34a); }
.is-warning .ma-label { color: var(--ma-warning, #d97706); }
.is-error .ma-label { color: var(--ma-danger, #dc2626); }

.has-error :deep(input),
.has-error :deep(select),
.has-error :deep(textarea) {
  border-color: var(--ma-danger, #dc2626);
}

.has-error :deep(input:focus),
.has-error :deep(select:focus),
.has-error :deep(textarea:focus) {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
</style>
