<template>
  <div class="ma-accordion-item" :class="{ 'is-active': isActive }">
    <div class="ma-accordion-header" @click="toggle">
      <span class="ma-accordion-title">
        <slot name="title">{{ title }}</slot>
      </span>
      <span class="ma-accordion-icon">
        <ChevronDown :size="16" />
      </span>
    </div>
    <div v-show="isActive" class="ma-accordion-content">
      <div class="ma-accordion-content-box">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, type Ref } from 'vue';
import { ChevronDown } from 'lucide-vue-next';

const props = defineProps<{
  title?: string;
  name: string | number;
}>();

const modelValue = inject<Ref<string | number | (string | number)[]>>('ma-accordion-model');
const updateModel = inject<(name: string | number) => void>('ma-accordion-update');

const isActive = computed(() => {
  if (Array.isArray(modelValue?.value)) {
    return modelValue.value.includes(props.name);
  }
  return modelValue?.value === props.name;
});

const toggle = () => {
  updateModel?.(props.name);
};
</script>

<style scoped>
.ma-accordion-item {
  border-bottom: 1px solid var(--ma-border);
}

.ma-accordion-item:last-child {
  border-bottom: none;
}

.ma-accordion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  background-color: var(--ma-bg-card);
  color: var(--ma-text-main);
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s;
}

.ma-accordion-header:hover {
  color: var(--ma-primary);
}

.ma-accordion-icon {
  transition: transform 0.3s;
}

.is-active .ma-accordion-icon {
  transform: rotate(180deg);
}

.ma-accordion-content {
  background-color: var(--ma-bg-card);
  color: var(--ma-text-main);
  font-size: 0.875rem;
  overflow: hidden;
}

.ma-accordion-content-box {
  padding-bottom: 16px;
}
</style>
