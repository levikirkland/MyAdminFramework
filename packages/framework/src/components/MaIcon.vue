<template>
  <component 
    :is="iconComponent" 
    :size="size" 
    :color="color" 
    :stroke-width="strokeWidth"
    class="ma-icon"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import * as LucideIcons from 'lucide-vue-next';

const props = withDefaults(defineProps<{
  name: string;
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
}>(), {
  size: 24,
  strokeWidth: 2
});

const iconComponent = computed(() => {
  // @ts-ignore
  const icon = LucideIcons[props.name];
  if (!icon) {
    console.warn(`Icon "${props.name}" not found in lucide-vue-next`);
    // Return a fallback or null. Returning null might cause a warning if <component> tries to render it.
    // Let's return a simple placeholder or the HelpCircle icon if not found.
    return LucideIcons.HelpCircle; 
  }
  return icon;
});
</script>

<style scoped>
.ma-icon {
  display: inline-block;
  vertical-align: middle;
}
</style>