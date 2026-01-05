<template>
  <div ref="reference" class="ma-tooltip-trigger" @mouseenter="show = true" @mouseleave="show = false" @focus="show = true" @blur="show = false">
    <slot />
  </div>
  <Teleport to="body">
    <Transition name="ma-fade">
      <div 
        v-if="show" 
        ref="floating" 
        class="ma-tooltip-content" 
        :style="floatingStyles"
      >
        {{ content }}
        <div 
          ref="floatingArrow" 
          class="ma-tooltip-arrow"
          :style="{
            position: 'absolute',
            left: middlewareData.arrow?.x != null ? `${middlewareData.arrow.x}px` : '',
            top: middlewareData.arrow?.y != null ? `${middlewareData.arrow.y}px` : '',
            [staticSide]: '-4px'
          }"
        ></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useFloating, offset, flip, shift, arrow, autoUpdate } from '@floating-ui/vue';

const props = withDefaults(defineProps<{
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}>(), {
  placement: 'top'
});

const reference = ref(null);
const floating = ref(null);
const floatingArrow = ref(null);
const show = ref(false);

const { floatingStyles, middlewareData, placement: finalPlacement } = useFloating(reference, floating, {
  placement: props.placement,
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(8),
    flip(),
    shift({ padding: 5 }),
    arrow({ element: floatingArrow })
  ]
});

const staticSide = computed(() => {
  if (!finalPlacement.value) return 'bottom';
  const side = finalPlacement.value.split('-')[0];
  if (!side) return 'bottom';

  const staticSideMap: Record<string, string> = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right'
  };
  return staticSideMap[side] || 'bottom';
});
</script>

<style scoped>
.ma-tooltip-trigger {
  display: inline-block;
}

.ma-tooltip-content {
  background-color: #1e293b;
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 12px;
  z-index: 9999;
  pointer-events: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  max-width: 300px;
}

.ma-tooltip-arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: #1e293b;
  transform: rotate(45deg);
}

.ma-fade-enter-active,
.ma-fade-leave-active {
  transition: opacity 0.2s ease;
}

.ma-fade-enter-from,
.ma-fade-leave-to {
  opacity: 0;
}
</style>
