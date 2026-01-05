<template>
  <div class="ma-spinner" :style="spinnerStyle"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  size?: number | string;
  color?: string;
  thickness?: number;
}>(), {
  size: 24,
  thickness: 3
});

const spinnerStyle = computed(() => {
  const sizeVal = typeof props.size === 'number' ? `${props.size}px` : props.size;
  return {
    width: sizeVal,
    height: sizeVal,
    borderWidth: `${props.thickness}px`,
    borderTopColor: props.color || 'var(--ma-primary)',
    borderRightColor: 'transparent',
    borderBottomColor: props.color || 'var(--ma-primary)',
    borderLeftColor: 'transparent'
  };
});
</script>

<style scoped>
.ma-spinner {
  display: inline-block;
  border-style: solid;
  border-radius: 50%;
  animation: ma-spin 1s linear infinite;
}

@keyframes ma-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
