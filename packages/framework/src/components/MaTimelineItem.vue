<template>
  <div 
    class="ma-timeline-item" 
    :class="[
      `ma-timeline-item--${direction}`,
      `ma-timeline-item--${computedPosition}`,
      `ma-timeline-item--${color}`,
      { 'ma-timeline-item--card': cardStyle, 'ma-timeline-item--clickable': clickable }
    ]"
    @click="handleClick"
  >
    <!-- Dot/marker on the timeline -->
    <div class="ma-timeline-item__marker">
      <div class="ma-timeline-item__dot" :class="[`ma-timeline-item__dot--${color}`]">
        <slot name="dot">
          <span v-if="icon" class="ma-timeline-item__icon">
            <component :is="icon" v-if="typeof icon === 'object'" />
            <span v-else>{{ icon }}</span>
          </span>
        </slot>
      </div>
      <div v-if="label" class="ma-timeline-item__label">{{ label }}</div>
    </div>

    <!-- Content wrapper -->
    <div class="ma-timeline-item__wrapper" :class="{ 'ma-timeline-item__wrapper--card': cardStyle }">
      <!-- Arrow pointing to timeline -->
      <div v-if="cardStyle" class="ma-timeline-item__arrow"></div>
      
      <div class="ma-timeline-item__content">
        <!-- Timestamp/date -->
        <div v-if="$slots.timestamp || timestamp" class="ma-timeline-item__timestamp">
          <slot name="timestamp">{{ timestamp }}</slot>
        </div>
        
        <!-- Title -->
        <div v-if="$slots.title || title" class="ma-timeline-item__title">
          <slot name="title">{{ title }}</slot>
        </div>
        
        <!-- Main content -->
        <div v-if="$slots.default || description" class="ma-timeline-item__body">
          <slot>{{ description }}</slot>
        </div>
        
        <!-- Footer slot -->
        <div v-if="$slots.footer" class="ma-timeline-item__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, computed, type ComputedRef, type Component } from 'vue'

const props = withDefaults(defineProps<{
  /** Timestamp or date string */
  timestamp?: string
  /** Item title */
  title?: string
  /** Item description/content */
  description?: string
  /** Label shown next to the dot (e.g., year) */
  label?: string
  /** Dot/marker color */
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'gray'
  /** Icon in the dot - can be string or component */
  icon?: string | Component
  /** Use card-style with arrow */
  cardStyle?: boolean
  /** Override position: left or right (for alternate mode) */
  position?: 'left' | 'right' | 'auto'
  /** Make item clickable */
  clickable?: boolean
  /** Photo/image URL for detail view */
  photo?: string
  /** Full body text for detail view */
  body?: string
  /** Footer/citations for detail view */
  footer?: string
}>(), {
  color: 'primary',
  cardStyle: true,
  position: 'auto',
  clickable: false
})

const emit = defineEmits<{
  (e: 'click', data: { 
    timestamp?: string
    title?: string
    description?: string
    photo?: string
    body?: string
    footer?: string
  }): void
}>()

const handleClick = () => {
  if (!props.clickable) return
  emit('click', {
    timestamp: props.timestamp,
    title: props.title,
    description: props.description,
    photo: props.photo,
    body: props.body,
    footer: props.footer
  })
}

// Inject timeline context
const direction = inject<ComputedRef<'vertical' | 'horizontal'>>('timeline-direction', computed(() => 'vertical'))
const alignment = inject<ComputedRef<'alternate' | 'left' | 'right' | 'center'>>('timeline-alignment', computed(() => 'alternate'))

// Track item index for alternating
let itemIndex = 0
const parentEl = inject<{ getNextIndex: () => number }>('timeline-index-provider', {
  getNextIndex: () => itemIndex++
})

const currentIndex = parentEl.getNextIndex()

// Compute position based on alignment and index
const computedPosition = computed(() => {
  if (props.position !== 'auto') return props.position
  
  if (alignment.value === 'alternate') {
    return currentIndex % 2 === 0 ? 'left' : 'right'
  }
  return alignment.value === 'right' ? 'right' : 'left'
})
</script>

<style scoped>
.ma-timeline-item {
  position: relative;
  display: flex;
  padding-bottom: 24px;
}

.ma-timeline-item:last-child {
  padding-bottom: 0;
}

/* =====================
   VERTICAL TIMELINE
   ===================== */

/* Alternate layout - items on left and right */
.ma-timeline-item--vertical.ma-timeline-item--left {
  flex-direction: row-reverse;
  text-align: right;
}

.ma-timeline-item--vertical.ma-timeline-item--right {
  flex-direction: row;
  text-align: left;
}

/* Marker positioning for alternate */
.ma-timeline-item--vertical .ma-timeline-item__marker {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
}

/* Content wrapper for alternate */
.ma-timeline-item--vertical .ma-timeline-item__wrapper {
  width: calc(50% - 30px);
  position: relative;
}

.ma-timeline-item--vertical.ma-timeline-item--left .ma-timeline-item__wrapper {
  margin-right: auto;
  padding-right: 20px;
}

.ma-timeline-item--vertical.ma-timeline-item--right .ma-timeline-item__wrapper {
  margin-left: auto;
  padding-left: 20px;
}

/* Dot styling */
.ma-timeline-item__dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: var(--ma-primary);
  border: 3px solid var(--ma-bg-card);
  box-shadow: 0 0 0 2px var(--ma-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  flex-shrink: 0;
}

.ma-timeline-item__dot--primary { 
  background-color: var(--ma-primary); 
  box-shadow: 0 0 0 2px var(--ma-primary);
}
.ma-timeline-item__dot--success { 
  background-color: var(--ma-success); 
  box-shadow: 0 0 0 2px var(--ma-success);
}
.ma-timeline-item__dot--warning { 
  background-color: var(--ma-warning); 
  box-shadow: 0 0 0 2px var(--ma-warning);
}
.ma-timeline-item__dot--danger { 
  background-color: var(--ma-danger); 
  box-shadow: 0 0 0 2px var(--ma-danger);
}
.ma-timeline-item__dot--info { 
  background-color: var(--ma-info); 
  box-shadow: 0 0 0 2px var(--ma-info);
}
.ma-timeline-item__dot--gray { 
  background-color: var(--ma-text-muted); 
  box-shadow: 0 0 0 2px var(--ma-text-muted);
}

.ma-timeline-item__icon {
  font-size: 10px;
  color: white;
  line-height: 1;
}

.ma-timeline-item__label {
  font-size: 12px;
  font-weight: 600;
  color: var(--ma-text-secondary);
  margin-top: 4px;
  white-space: nowrap;
}

/* Card styling */
.ma-timeline-item__wrapper--card .ma-timeline-item__content {
  background: var(--ma-bg-card);
  border: 1px solid var(--ma-border);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s, transform 0.2s;
}

.ma-timeline-item__wrapper--card .ma-timeline-item__content:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

/* Arrow for cards */
.ma-timeline-item__arrow {
  position: absolute;
  top: 16px;
  width: 12px;
  height: 12px;
  background: var(--ma-bg-card);
  border: 1px solid var(--ma-border);
  transform: rotate(45deg);
}

.ma-timeline-item--left .ma-timeline-item__arrow {
  right: 14px;
  border-left: none;
  border-bottom: none;
}

.ma-timeline-item--right .ma-timeline-item__arrow {
  left: 14px;
  border-right: none;
  border-top: none;
}

/* Content elements */
.ma-timeline-item__timestamp {
  font-size: 12px;
  color: var(--ma-text-muted);
  margin-bottom: 4px;
}

.ma-timeline-item__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--ma-text-main);
  margin-bottom: 8px;
  line-height: 1.4;
}

.ma-timeline-item__body {
  font-size: 14px;
  color: var(--ma-text-secondary);
  line-height: 1.6;
}

.ma-timeline-item__footer {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--ma-border);
}

/* =====================
   HORIZONTAL TIMELINE
   ===================== */

.ma-timeline-item--horizontal {
  flex-direction: column;
  align-items: center;
  padding-bottom: 0;
  padding-right: 0;
  min-width: 120px;
  flex: 1;
  position: relative;
}

.ma-timeline-item--horizontal:last-child {
  padding-right: 0;
}

.ma-timeline-item--horizontal .ma-timeline-item__marker {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  z-index: 2;
}

.ma-timeline-item--horizontal .ma-timeline-item__dot {
  width: 10px;
  height: 10px;
  background: var(--ma-bg-card);
  border: 2px solid var(--ma-border);
  box-shadow: none;
}

.ma-timeline-item--horizontal .ma-timeline-item__wrapper {
  width: 100%;
  padding: 0 4px;
  text-align: left;
}

/* Alternate: left = above the line, right = below the line */
.ma-timeline-item--horizontal.ma-timeline-item--left {
  flex-direction: column-reverse;
  justify-content: flex-end;
  align-items: flex-start;
}

.ma-timeline-item--horizontal.ma-timeline-item--left .ma-timeline-item__wrapper {
  position: absolute;
  bottom: calc(50% + 8px);
  left: 0;
  right: 0;
}

.ma-timeline-item--horizontal.ma-timeline-item--right {
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.ma-timeline-item--horizontal.ma-timeline-item--right .ma-timeline-item__wrapper {
  position: absolute;
  top: calc(50% + 8px);
  left: 0;
  right: 0;
}

/* Connection line from dot to content */
.ma-timeline-item--horizontal.ma-timeline-item--left::before {
  content: '';
  position: absolute;
  left: 4px;
  top: calc(50% - 8px);
  width: 1px;
  height: 8px;
  border-left: 1px dashed var(--ma-border);
}

.ma-timeline-item--horizontal.ma-timeline-item--right::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 50%;
  width: 1px;
  height: 8px;
  border-left: 1px dashed var(--ma-border);
}

/* Horizontal timestamp styling - prominent */
.ma-timeline-item--horizontal .ma-timeline-item__timestamp {
  font-size: 14px;
  font-weight: 700;
  color: var(--ma-primary);
  margin-bottom: 4px;
}

.ma-timeline-item--horizontal .ma-timeline-item__title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 2px;
}

.ma-timeline-item--horizontal .ma-timeline-item__body {
  font-size: 12px;
  line-height: 1.4;
  color: var(--ma-text-secondary);
}

/* No card style for horizontal by default */
.ma-timeline-item--horizontal .ma-timeline-item__wrapper--card .ma-timeline-item__content {
  background: transparent;
  border: none;
  padding: 0;
  box-shadow: none;
}

.ma-timeline-item--horizontal .ma-timeline-item__wrapper--card .ma-timeline-item__content:hover {
  box-shadow: none;
  transform: none;
}

.ma-timeline-item--horizontal .ma-timeline-item__arrow {
  display: none;
}

/* =====================
   LEFT/RIGHT ALIGNMENT (non-alternate)
   ===================== */

/* When timeline alignment is 'left' - all content on right */
:deep(.ma-timeline--left) .ma-timeline-item--vertical .ma-timeline-item__marker {
  position: relative;
  left: 0;
  transform: none;
  margin-right: 16px;
}

:deep(.ma-timeline--left) .ma-timeline-item--vertical .ma-timeline-item__wrapper {
  width: auto;
  flex: 1;
  padding-left: 0;
  margin-left: 0;
}

:deep(.ma-timeline--left) .ma-timeline-item--vertical {
  flex-direction: row;
  text-align: left;
}

/* When timeline alignment is 'right' - all content on left */
:deep(.ma-timeline--right) .ma-timeline-item--vertical .ma-timeline-item__marker {
  position: relative;
  left: auto;
  right: 0;
  transform: none;
  margin-left: 16px;
}

:deep(.ma-timeline--right) .ma-timeline-item--vertical .ma-timeline-item__wrapper {
  width: auto;
  flex: 1;
  padding-right: 0;
  margin-right: 0;
}

:deep(.ma-timeline--right) .ma-timeline-item--vertical {
  flex-direction: row-reverse;
  text-align: right;
}

/* =====================
   RESPONSIVE
   ===================== */

@media (max-width: 768px) {
  /* Collapse alternate to left-aligned on mobile */
  .ma-timeline-item--vertical .ma-timeline-item__marker {
    position: relative;
    left: 0;
    transform: none;
    margin-right: 16px;
  }

  .ma-timeline-item--vertical .ma-timeline-item__wrapper {
    width: auto;
    flex: 1;
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    margin-right: 0;
  }

  .ma-timeline-item--vertical.ma-timeline-item--left,
  .ma-timeline-item--vertical.ma-timeline-item--right {
    flex-direction: row;
    text-align: left;
  }

  .ma-timeline-item__arrow {
    display: none;
  }

  /* Horizontal timeline scrolls */
  .ma-timeline-item--horizontal {
    min-width: 160px;
    padding-right: 24px;
  }
}

/* Clickable state */
.ma-timeline-item--clickable {
  cursor: pointer;
}

.ma-timeline-item--clickable .ma-timeline-item__content {
  transition: all 0.2s ease;
}

.ma-timeline-item--clickable:hover .ma-timeline-item__content {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}
</style>
