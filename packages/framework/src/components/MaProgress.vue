<template>
  <div class="ma-progress" :class="[`ma-progress--${type}`]">
    <!-- Line Progress -->
    <div v-if="type === 'line'" class="ma-progress-line-outer" :style="{ height: `${strokeWidth}px` }">
      <div 
        class="ma-progress-line-inner"
        :style="{ 
          width: `${percentage}%`, 
          backgroundColor: color || 'var(--ma-primary)' 
        }"
      ></div>
    </div>
    <div v-if="type === 'line' && showText" class="ma-progress-text">
      {{ percentage }}%
    </div>

    <!-- Circle Progress -->
    <div v-if="type === 'circle'" class="ma-progress-circle" :style="{ width: `${width}px`, height: `${width}px` }">
      <svg :width="width" :height="width" viewBox="0 0 100 100">
        <path
          class="ma-progress-circle-trail"
          d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
          stroke-linecap="round"
          :stroke-width="strokeWidth"
          fill-opacity="0"
        ></path>
        <path
          class="ma-progress-circle-path"
          d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
          stroke-linecap="round"
          :stroke-width="strokeWidth"
          fill-opacity="0"
          :style="circlePathStyle"
        ></path>
      </svg>
      <div v-if="showText" class="ma-progress-circle-text">
        {{ percentage }}%
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  percentage: number;
  type?: 'line' | 'circle';
  strokeWidth?: number;
  color?: string;
  showText?: boolean;
  width?: number; // For circle size
}>(), {
  percentage: 0,
  type: 'line',
  strokeWidth: 6,
  showText: true,
  width: 120
});

const circlePathStyle = computed(() => {
  const radius = 45;
  const perimeter = 2 * Math.PI * radius;
  const offset = perimeter * ((100 - props.percentage) / 100);
  return {
    stroke: props.color || 'var(--ma-primary)',
    strokeDasharray: `${perimeter}px, ${perimeter}px`,
    strokeDashoffset: `${offset}px`,
    transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
  };
});
</script>

<style scoped>
.ma-progress {
  display: flex;
  align-items: center;
}

.ma-progress--line {
  width: 100%;
}

.ma-progress-line-outer {
  flex: 1;
  background-color: var(--ma-bg-secondary);
  border-radius: 100px;
  overflow: hidden;
}

.ma-progress-line-inner {
  height: 100%;
  border-radius: 100px;
  transition: width 0.6s ease;
}

.ma-progress-text {
  margin-left: 8px;
  font-size: 0.875rem;
  color: var(--ma-text-secondary);
  min-width: 35px;
}

.ma-progress--circle {
  position: relative;
  display: inline-block;
}

.ma-progress-circle-trail {
  stroke: var(--ma-bg-secondary);
}

.ma-progress-circle-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1rem;
  color: var(--ma-text-main);
}
</style>
