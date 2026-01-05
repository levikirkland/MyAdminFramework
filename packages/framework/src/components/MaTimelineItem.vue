<template>
  <div class="ma-timeline-item">
    <div class="ma-timeline-item__tail"></div>
    <div class="ma-timeline-item__dot" :class="[`ma-timeline-item__dot--${color}`]">
      <slot name="dot"></slot>
    </div>
    <div class="ma-timeline-item__wrapper">
      <div class="ma-timeline-item__timestamp" v-if="timestamp">
        {{ timestamp }}
      </div>
      <div class="ma-timeline-item__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  timestamp?: string;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'gray';
}>(), {
  color: 'primary'
});
</script>

<style scoped>
.ma-timeline-item {
  position: relative;
  padding-bottom: 20px;
}

.ma-timeline-item:last-child {
  padding-bottom: 0;
}

.ma-timeline-item__tail {
  position: absolute;
  left: 5px;
  top: 10px;
  height: 100%;
  border-left: 2px solid var(--ma-border);
}

.ma-timeline-item:last-child .ma-timeline-item__tail {
  display: none;
}

.ma-timeline-item__dot {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--ma-primary);
  left: 0;
  top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.ma-timeline-item__dot--primary { background-color: var(--ma-primary); }
.ma-timeline-item__dot--success { background-color: var(--ma-success); }
.ma-timeline-item__dot--warning { background-color: var(--ma-warning); }
.ma-timeline-item__dot--danger { background-color: var(--ma-danger); }
.ma-timeline-item__dot--info { background-color: var(--ma-info); }
.ma-timeline-item__dot--gray { background-color: var(--ma-text-muted); }

.ma-timeline-item__wrapper {
  position: relative;
  padding-left: 28px;
  top: 0;
}

.ma-timeline-item__timestamp {
  color: var(--ma-text-muted);
  font-size: 0.875rem;
  margin-bottom: 4px;
  line-height: 1;
}

.ma-timeline-item__content {
  color: var(--ma-text-main);
  font-size: 0.95rem;
}
</style>
