<template>
  <div class="ma-timepicker" :class="{ 'is-disabled': disabled, 'has-error': error }">
    <label v-if="label" class="ma-label">{{ label }}</label>
    <div class="ma-timepicker-input-wrapper">
      <MaSelect
        v-model="internalValue"
        :options="timeOptions"
        :placeholder="placeholder"
        :disabled="disabled"
        :error="error"
        :clearable="clearable"
        searchable
        class="ma-timepicker-select"
      >
        <template #prefix>
          <Clock :size="16" class="ma-timepicker-icon" />
        </template>
      </MaSelect>
    </div>
    <span v-if="error" class="ma-error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Clock } from 'lucide-vue-next'
import MaSelect from './MaSelect.vue'

interface TimePickerProps {
  modelValue?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  step?: 1 | 5 | 15 | 30 | 60;
  format?: '24h' | '12h';
  clearable?: boolean;
  minTime?: string;
  maxTime?: string;
}

const props = withDefaults(defineProps<TimePickerProps>(), {
  placeholder: 'Select time',
  step: 30,
  format: '24h',
  clearable: true
})

const emit = defineEmits(['update:modelValue'])

const internalValue = computed<string | number | (string | number)[] | null>({
  get: () => props.modelValue ?? null,
  set: (val) => emit('update:modelValue', val)
})

const timeOptions = computed(() => {
  const options = []
  const step = props.step
  
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += step) {
      const h = hour.toString().padStart(2, '0')
      const m = minute.toString().padStart(2, '0')
      const value = `${h}:${m}`
      
      // Filter by min/max time if provided
      if (props.minTime && value < props.minTime) continue
      if (props.maxTime && value > props.maxTime) continue

      let label = value
      if (props.format === '12h') {
        const period = hour >= 12 ? 'PM' : 'AM'
        const h12 = hour % 12 || 12
        label = `${h12}:${m} ${period}`
      }
      
      options.push({ label, value })
    }
  }
  return options
})
</script>

<style scoped>
.ma-timepicker {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.ma-timepicker-input-wrapper {
  position: relative;
  width: 100%;
}

.ma-timepicker-icon {
  color: var(--ma-text-muted);
  margin-right: 0.5rem;
}

:deep(.ma-timepicker-select .ma-select-trigger) {
  padding-left: 0.75rem;
}
</style>
