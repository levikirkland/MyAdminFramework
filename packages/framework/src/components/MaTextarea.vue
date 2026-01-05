<template>
  <div class="ma-textarea-group" :class="{ 'has-error': error }">
    <label v-if="label" class="ma-label">{{ label }}</label>
    <textarea
      class="ma-textarea"
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    ></textarea>
    <span v-if="error" class="ma-error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue: string;
  label?: string;
  placeholder?: string;
  error?: string;
  rows?: number;
  disabled?: boolean;
}>(), {
  rows: 4
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.ma-textarea-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.ma-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--ma-text-main);
}

.ma-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--ma-border);
  background: var(--ma-bg-page);
  color: var(--ma-text-main);
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s;
  outline: none;
  resize: vertical;
  font-family: inherit;
}

.ma-textarea:focus {
  border-color: var(--ma-primary);
  box-shadow: 0 0 0 3px var(--ma-primary-light);
}

.ma-textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: rgba(0,0,0,0.05);
}

.ma-error {
  font-size: 0.75rem;
  color: var(--ma-danger, #dc2626);
}

.has-error .ma-textarea {
  border-color: var(--ma-danger, #dc2626);
}

.has-error .ma-textarea:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}
</style>
