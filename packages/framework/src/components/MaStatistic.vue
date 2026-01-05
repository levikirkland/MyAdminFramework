<template>
  <div class="ma-statistic">
    <div class="ma-statistic-title" v-if="title || $slots.title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="ma-statistic-content" :style="contentStyle">
      <span class="ma-statistic-prefix" v-if="prefix || $slots.prefix">
        <slot name="prefix">{{ prefix }}</slot>
      </span>
      <span class="ma-statistic-value">
        {{ formattedValue }}
      </span>
      <span class="ma-statistic-suffix" v-if="suffix || $slots.suffix">
        <slot name="suffix">{{ suffix }}</slot>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  title?: string;
  value?: string | number;
  precision?: number;
  prefix?: string;
  suffix?: string;
  valueStyle?: Record<string, string>;
}>(), {
  value: 0
});

const formattedValue = computed(() => {
  if (typeof props.value === 'number' && typeof props.precision === 'number') {
    return props.value.toFixed(props.precision);
  }
  return props.value;
});

const contentStyle = computed(() => {
  return {
    color: 'var(--ma-text-main)',
    ...props.valueStyle
  };
});
</script>

<style scoped>
.ma-statistic {
  display: flex;
  flex-direction: column;
}

.ma-statistic-title {
  margin-bottom: 4px;
  color: var(--ma-text-secondary);
  font-size: 0.875rem;
}

.ma-statistic-content {
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: baseline;
}

.ma-statistic-prefix {
  margin-right: 4px;
  font-size: 1rem;
}

.ma-statistic-suffix {
  margin-left: 4px;
  font-size: 1rem;
  color: var(--ma-text-secondary);
}
</style>
