<template>
  <div class="ma-datepicker-container" :class="{ 'has-error': error, 'is-disabled': disabled }">
    <label v-if="label" class="ma-label">{{ label }}</label>
    
    <!-- Single Date Mode -->
    <div v-if="!range" class="datepicker-wrapper-group">
      <div class="datepicker-wrapper">
        <input
          type="date"
          class="ma-datepicker"
          :value="datePart"
          :disabled="disabled"
          :min="min"
          :max="max"
          @input="updateDatePart($event)"
        />
        <div class="datepicker-icon">
          <Calendar :size="16" />
        </div>
      </div>

      <MaTimePicker
        v-if="showTime"
        :model-value="timePart"
        :disabled="disabled"
        :step="timeStep"
        :format="timeFormat"
        class="datepicker-time-picker"
        @update:model-value="updateTimePart"
      />
    </div>

    <!-- Range Date Mode -->
    <div v-else class="datepicker-range-wrapper">
      <div class="datepicker-wrapper">
        <input
          type="date"
          class="ma-datepicker"
          :value="rangeStart"
          :disabled="disabled"
          :min="min"
          :max="rangeEnd || max"
          placeholder="Start"
          @input="updateRangeStart($event)"
        />
        <div class="datepicker-icon">
          <Calendar :size="16" />
        </div>
      </div>
      <span class="range-separator">to</span>
      <div class="datepicker-wrapper">
        <input
          type="date"
          class="ma-datepicker"
          :value="rangeEnd"
          :disabled="disabled"
          :min="rangeStart || min"
          :max="max"
          placeholder="End"
          @input="updateRangeEnd($event)"
        />
        <div class="datepicker-icon">
          <Calendar :size="16" />
        </div>
      </div>
    </div>

    <span v-if="error" class="ma-error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Calendar } from 'lucide-vue-next'
import MaTimePicker from './MaTimePicker.vue'

interface DatePickerProps {
  modelValue?: string | [string, string];
  label?: string;
  error?: string;
  disabled?: boolean;
  min?: string;
  max?: string;
  range?: boolean;
  showTime?: boolean;
  timeStep?: 1 | 5 | 15 | 30 | 60;
  timeFormat?: '24h' | '12h';
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  timeStep: 30,
  timeFormat: '24h'
})
const emit = defineEmits(['update:modelValue'])

const datePart = computed(() => {
  if (typeof props.modelValue === 'string') {
    return props.modelValue.split(' ')[0] || ''
  }
  return ''
})

const timePart = computed(() => {
  if (typeof props.modelValue === 'string') {
    return props.modelValue.split(' ')[1] || ''
  }
  return ''
})

const rangeStart = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue[0] || ''
  }
  return ''
})

const rangeEnd = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue[1] || ''
  }
  return ''
})

const updateDatePart = (event: Event) => {
  const date = (event.target as HTMLInputElement).value
  if (props.showTime) {
    const time = timePart.value || '00:00'
    emit('update:modelValue', `${date} ${time}`)
  } else {
    emit('update:modelValue', date)
  }
}

const updateTimePart = (time: string) => {
  const date = datePart.value || new Date().toISOString().split('T')[0]
  emit('update:modelValue', `${date} ${time}`)
}

const updateRangeStart = (event: Event) => {
  const val = (event.target as HTMLInputElement).value
  const currentEnd = Array.isArray(props.modelValue) ? props.modelValue[1] : ''
  emit('update:modelValue', [val, currentEnd])
}

const updateRangeEnd = (event: Event) => {
  const val = (event.target as HTMLInputElement).value
  const currentStart = Array.isArray(props.modelValue) ? props.modelValue[0] : ''
  emit('update:modelValue', [currentStart, val])
}
</script>

<style scoped>
.ma-datepicker-container {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

.ma-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ma-text-main, #334155);
}

.datepicker-wrapper-group {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.datepicker-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
}

.datepicker-time-picker {
  flex: 0 0 140px;
}

.datepicker-range-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.range-separator {
  font-size: 0.875rem;
  color: var(--ma-text-muted, #94a3b8);
}

.ma-datepicker {
  width: 100%;
  padding: 8px 12px;
  padding-right: 36px; /* Space for icon */
  font-size: 0.875rem;
  border: 1px solid var(--ma-border, #e2e8f0);
  border-radius: 6px;
  background-color: var(--ma-bg-card, #ffffff);
  color: var(--ma-text-main, #334155);
  transition: all 0.2s;
  font-family: inherit;
  appearance: none; /* Remove default styling in some browsers */
}

.ma-datepicker::-webkit-calendar-picker-indicator {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0; /* Hide default icon but keep clickable */
  width: 20px;
  height: 20px;
  cursor: pointer;
  z-index: 2;
}

.datepicker-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--ma-text-muted, #94a3b8);
  pointer-events: none;
  z-index: 1;
  display: flex;
  align-items: center;
}

.ma-datepicker:focus {
  outline: none;
  border-color: var(--ma-primary, #0284c7);
  box-shadow: 0 0 0 3px var(--ma-primary-light, #e0f2fe);
}

.is-disabled .ma-datepicker {
  background-color: var(--ma-bg-secondary, #f1f5f9);
  cursor: not-allowed;
  opacity: 0.7;
}

.has-error .ma-datepicker {
  border-color: var(--ma-danger, #dc2626);
}

.has-error .ma-datepicker:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.ma-error {
  font-size: 0.75rem;
  color: var(--ma-danger, #dc2626);
}
</style>
