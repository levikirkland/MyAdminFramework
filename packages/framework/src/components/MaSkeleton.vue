<template>
  <div 
    class="ma-skeleton" 
    :class="[`ma-skeleton--${variant}`, `ma-skeleton--${animation}`]"
    :style="{ width, height }"
  ></div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  width?: string;
  height?: string;
  variant?: 'text' | 'circle' | 'rect';
  animation?: 'pulse' | 'wave' | 'none';
}>(), {
  variant: 'text',
  animation: 'pulse'
});
</script>

<style scoped>
.ma-skeleton {
  background-color: var(--ma-bg-secondary);
  border-radius: 4px;
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.ma-skeleton--text {
  height: 1em;
  width: 100%;
  margin-bottom: 0.5em;
}

.ma-skeleton--circle {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.ma-skeleton--rect {
  width: 100%;
  height: 200px;
}

/* Animations */
.ma-skeleton--pulse {
  animation: ma-skeleton-pulse 1.5s ease-in-out 0.5s infinite;
}

@keyframes ma-skeleton-pulse {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}

.ma-skeleton--wave::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: ma-skeleton-wave 1.6s infinite;
}

.dark .ma-skeleton--wave::after {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.05),
    transparent
  );
}

@keyframes ma-skeleton-wave {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>
