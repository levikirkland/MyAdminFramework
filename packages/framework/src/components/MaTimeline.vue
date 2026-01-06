<template>
  <div 
    class="ma-timeline" 
    :class="[
      `ma-timeline--${direction}`,
      `ma-timeline--${alignment}`,
      { 'ma-timeline--pending': pending }
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  /** Timeline direction: vertical or horizontal */
  direction?: 'vertical' | 'horizontal'
  /** Item alignment: alternate (left/right), left, right, or center */
  alignment?: 'alternate' | 'left' | 'right' | 'center'
  /** Show pending indicator on last item */
  pending?: boolean
  /** Line color */
  lineColor?: string
  /** Line width in pixels */
  lineWidth?: number
}>(), {
  direction: 'vertical',
  alignment: 'alternate',
  pending: false,
  lineWidth: 2
})

// Index counter for alternating items
const itemIndex = ref(0)

// Provide context to child items
provide('timeline-direction', computed(() => props.direction))
provide('timeline-alignment', computed(() => props.alignment))
provide('timeline-line-color', computed(() => props.lineColor))
provide('timeline-line-width', computed(() => props.lineWidth))
provide('timeline-index-provider', {
  getNextIndex: () => itemIndex.value++
})
</script>

<style scoped>
.ma-timeline {
  position: relative;
  padding: 0;
  margin: 0;
  list-style: none;
}

/* Vertical timeline */
.ma-timeline--vertical {
  display: flex;
  flex-direction: column;
}

.ma-timeline--vertical.ma-timeline--alternate {
  padding-left: 0;
}

.ma-timeline--vertical.ma-timeline--left {
  padding-left: 0;
}

.ma-timeline--vertical.ma-timeline--right {
  padding-right: 0;
}

.ma-timeline--vertical.ma-timeline--center {
  padding-left: 28px;
}

/* Center line for alternate mode */
.ma-timeline--vertical.ma-timeline--alternate::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  bottom: 0;
  width: v-bind('`${lineWidth}px`');
  background: v-bind('lineColor || "var(--ma-border)"');
}

/* Left alignment line */
.ma-timeline--vertical.ma-timeline--left::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 0;
  bottom: 0;
  width: v-bind('`${lineWidth}px`');
  background: v-bind('lineColor || "var(--ma-border)"');
}

/* Right alignment line */
.ma-timeline--vertical.ma-timeline--right::before {
  content: '';
  position: absolute;
  right: 6px;
  top: 0;
  bottom: 0;
  width: v-bind('`${lineWidth}px`');
  background: v-bind('lineColor || "var(--ma-border)"');
}

/* Horizontal timeline */
.ma-timeline--horizontal {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  padding: 60px 40px;
  position: relative;
  min-height: 160px;
}

.ma-timeline--horizontal::before {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 20px;
  right: 20px;
  height: v-bind('`${lineWidth}px`');
  background: v-bind('lineColor || "var(--ma-border)"');
}

/* Arrow at the end of horizontal timeline */
.ma-timeline--horizontal::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 12px solid v-bind('lineColor || "var(--ma-primary)"');
}

.ma-timeline--horizontal.ma-timeline--alternate::before {
  top: 50%;
}

/* Responsive: collapse alternate to left on mobile */
@media (max-width: 768px) {
  .ma-timeline--vertical.ma-timeline--alternate::before {
    left: 6px;
    transform: none;
  }
}
</style>
