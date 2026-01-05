<template>
  <div 
    class="ma-steps" 
    :class="[
      `ma-steps--${direction}`,
      { 'ma-steps--simple': simple }
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, toRef } from 'vue';

const props = withDefaults(defineProps<{
  active: number;
  direction?: 'horizontal' | 'vertical';
  simple?: boolean;
}>(), {
  active: 0,
  direction: 'horizontal',
  simple: false
});

provide('ma-steps-active', toRef(props, 'active'));
provide('ma-steps-direction', toRef(props, 'direction'));
provide('ma-steps-simple', toRef(props, 'simple'));
</script>

<style scoped>
.ma-steps {
  display: flex;
  width: 100%;
}

.ma-steps--horizontal {
  flex-direction: row;
}

.ma-steps--vertical {
  flex-direction: column;
}

.ma-steps--simple.ma-steps--horizontal {
  align-items: center;
}
</style>
