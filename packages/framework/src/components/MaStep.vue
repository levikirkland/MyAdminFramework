<template>
  <div class="ma-step" :class="[
    `is-${currentStatus}`,
    direction === 'vertical' ? 'is-vertical' : 'is-horizontal',
    { 'is-simple': simple }
  ]">
    <div class="ma-step-head">
      <div class="ma-step-line">
        <i class="ma-step-line-inner"></i>
      </div>
      <div class="ma-step-icon">
        <slot name="icon">
          <div v-if="simple" class="ma-step-icon-dot"></div>
          <template v-else>
            <div v-if="currentStatus === 'finish'" class="ma-step-icon-inner">
              <Check :size="16" />
            </div>
            <div v-else-if="currentStatus === 'error'" class="ma-step-icon-inner">
              <X :size="16" />
            </div>
            <div v-else class="ma-step-icon-inner is-text">
              {{ index + 1 }}
            </div>
          </template>
        </slot>
      </div>
    </div>
    <div class="ma-step-main">
      <div class="ma-step-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="ma-step-description" v-if="description || $slots.description">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, type Ref } from 'vue';
import { Check, X } from 'lucide-vue-next';

const props = withDefaults(defineProps<{
  title?: string;
  description?: string;
  index: number;
  status?: 'wait' | 'process' | 'finish' | 'error';
}>(), {});

const activeIndex = inject<Ref<number>>('ma-steps-active');
const direction = inject<Ref<string>>('ma-steps-direction');
const simple = inject<Ref<boolean>>('ma-steps-simple');

const currentStatus = computed(() => {
  if (props.status) return props.status;
  if (activeIndex === undefined) return 'wait';
  
  if (props.index < activeIndex.value) return 'finish';
  if (props.index === activeIndex.value) return 'process';
  return 'wait';
});
</script>

<style scoped>
.ma-step {
  display: flex;
  flex-basis: 50%;
  flex-shrink: 1;
  position: relative;
}

.ma-step:last-child {
  flex-basis: auto;
  flex-shrink: 0;
  flex-grow: 0;
}

.ma-step.is-horizontal {
  flex-direction: column;
}

.ma-step.is-vertical {
  flex-direction: row;
  flex-basis: auto;
}

/* Simple Mode Layout */
.ma-step.is-simple.is-horizontal {
  flex-direction: row;
  align-items: center;
  flex-basis: auto;
  margin-right: 16px;
}

.ma-step.is-simple.is-horizontal .ma-step-head {
  width: auto;
  padding-right: 8px;
}

.ma-step.is-simple.is-horizontal .ma-step-main {
  margin-top: 0;
  padding-right: 0;
}

.ma-step.is-simple .ma-step-line {
  display: none; /* No lines in simple mode usually, or handled differently */
}

/* Head (Icon + Line) */
.ma-step-head {
  position: relative;
  flex-grow: 0;
}

.ma-step.is-horizontal:not(.is-simple) .ma-step-head {
  width: 100%;
  display: flex;
  align-items: center;
  height: 24px;
}

.ma-step.is-vertical .ma-step-head {
  width: auto;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
}

/* Line */
.ma-step-line {
  position: absolute;
  background-color: var(--ma-border);
}

.ma-step.is-horizontal .ma-step-line {
  top: 11px;
  left: 24px;
  right: 0;
  height: 2px;
}

.ma-step.is-vertical .ma-step-line {
  top: 24px;
  bottom: 0;
  left: 11px;
  width: 2px;
  height: auto;
  right: auto;
}

.ma-step:last-child .ma-step-line {
  display: none;
}

.ma-step-line-inner {
  display: block;
  width: 0;
  height: 100%;
  background: var(--ma-primary);
  transition: width 0.3s;
}

.ma-step.is-vertical .ma-step-line-inner {
  width: 100%;
  height: 0;
  transition: height 0.3s;
}

.is-finish .ma-step-line-inner {
  width: 100%;
}

.ma-step.is-vertical.is-finish .ma-step-line-inner {
  height: 100%;
}

/* Icon */
.ma-step-icon {
  position: relative;
  z-index: 1;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  font-size: 14px;
  box-sizing: border-box;
  background: var(--ma-bg-main, #fff);
  transition: 0.3s;
  border-radius: 50%;
  border: 2px solid var(--ma-text-secondary);
  color: var(--ma-text-secondary);
  flex-shrink: 0;
}

.is-process .ma-step-icon {
  border-color: var(--ma-primary);
  background: var(--ma-primary);
  color: #fff;
}

.is-finish .ma-step-icon {
  border-color: var(--ma-primary);
  color: var(--ma-primary);
  background: var(--ma-bg-main, #fff);
}

.is-error .ma-step-icon {
  border-color: var(--ma-danger, #dc2626);
  color: var(--ma-danger, #dc2626);
  background: var(--ma-bg-main, #fff);
}

/* Simple Dot */
.ma-step-icon-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--ma-border);
  transition: all 0.3s;
}

.is-process .ma-step-icon-dot {
  background-color: var(--ma-primary);
}

.is-finish .ma-step-icon-dot {
  background-color: var(--ma-primary);
}

.is-error .ma-step-icon-dot {
  background-color: var(--ma-danger, #dc2626);
}

.ma-step.is-simple .ma-step-icon {
  width: 12px;
  height: 12px;
  border: none;
  background: transparent;
}

/* Content */
.ma-step-main {
  white-space: normal;
  text-align: left;
}

.ma-step.is-horizontal .ma-step-main {
  position: relative;
  margin-top: 8px;
  padding-right: 16px;
}

.ma-step.is-vertical .ma-step-main {
  padding-left: 12px;
  padding-bottom: 24px;
}

.ma-step-title {
  font-size: 1rem;
  line-height: 24px;
  font-weight: 600;
  color: var(--ma-text-secondary);
}

.is-process .ma-step-title,
.is-finish .ma-step-title {
  color: var(--ma-text-main, #334155);
}

.is-error .ma-step-title {
  color: var(--ma-danger, #dc2626);
}

.ma-step-description {
  font-size: 0.875rem;
  color: var(--ma-text-secondary);
  margin-top: 4px;
}
</style>
