<template>
  <div class="ma-row" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'

const props = withDefaults(defineProps<{
  gutter?: number | [number, number];
  align?: 'top' | 'middle' | 'bottom';
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
}>(), {
  gutter: 0,
  justify: 'start',
  align: 'top'
})

const style = computed(() => {
  const gutterX = Array.isArray(props.gutter) ? props.gutter[0] : props.gutter
  const gutterY = Array.isArray(props.gutter) ? props.gutter[1] : 0
  
  return {
    marginLeft: `-${gutterX / 2}px`,
    marginRight: `-${gutterX / 2}px`,
    marginTop: `-${gutterY / 2}px`,
    marginBottom: `-${gutterY / 2}px`,
    alignItems: props.align === 'top' ? 'flex-start' : props.align === 'bottom' ? 'flex-end' : 'center',
    justifyContent: props.justify
  }
})

provide('ma-row-gutter', props.gutter)
</script>

<style scoped>
.ma-row {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
</style>
