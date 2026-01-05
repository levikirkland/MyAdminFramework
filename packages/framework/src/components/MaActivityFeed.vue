<template>
  <div class="ma-activity-feed">
    <div v-if="title" class="ma-feed-header">
      <h3>{{ title }}</h3>
      <slot name="extra" />
    </div>
    
    <div class="ma-feed-list">
      <div v-for="(item, index) in items" :key="index" class="ma-feed-item">
        <div class="ma-feed-timeline">
          <div class="ma-feed-line" v-if="index !== items.length - 1"></div>
          <div class="ma-feed-dot" :class="item.color || 'primary'">
            <slot name="icon" :item="item">
              <div class="dot-inner"></div>
            </slot>
          </div>
        </div>
        
        <div class="ma-feed-content">
          <div class="ma-feed-top">
            <span class="ma-feed-title">{{ item.title }}</span>
            <span class="ma-feed-time">{{ item.time }}</span>
          </div>
          <div class="ma-feed-desc" v-if="item.description">{{ item.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ActivityItem {
  title: string
  description?: string
  time: string
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  icon?: any
}

defineProps<{
  title?: string
  items: ActivityItem[]
}>()
</script>

<style scoped>
.ma-activity-feed {
  background: var(--ma-bg-card);
  border-radius: 12px;
  border: 1px solid var(--ma-border);
  padding: 20px;
}

.ma-feed-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.ma-feed-header h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.ma-feed-list {
  display: flex;
  flex-direction: column;
}

.ma-feed-item {
  display: flex;
  gap: 16px;
  position: relative;
  padding-bottom: 24px;
}

.ma-feed-item:last-child {
  padding-bottom: 0;
}

.ma-feed-timeline {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 16px;
  flex-shrink: 0;
}

.ma-feed-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--ma-primary);
  border: 2px solid white;
  box-shadow: 0 0 0 2px var(--ma-primary-light);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ma-feed-dot.primary { background: var(--ma-primary); box-shadow: 0 0 0 2px var(--ma-primary-light); }
.ma-feed-dot.success { background: var(--ma-success); box-shadow: 0 0 0 2px #dcfce7; }
.ma-feed-dot.warning { background: var(--ma-warning); box-shadow: 0 0 0 2px #fef9c3; }
.ma-feed-dot.danger { background: var(--ma-danger); box-shadow: 0 0 0 2px #fee2e2; }

.ma-feed-line {
  position: absolute;
  top: 12px;
  bottom: -12px;
  left: 7px;
  width: 2px;
  background: var(--ma-border);
}

.ma-feed-content {
  flex: 1;
  padding-top: -2px;
}

.ma-feed-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
}

.ma-feed-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--ma-text-main);
}

.ma-feed-time {
  font-size: 12px;
  color: var(--ma-text-secondary);
  white-space: nowrap;
  margin-left: 8px;
}

.ma-feed-desc {
  font-size: 13px;
  color: var(--ma-text-secondary);
  line-height: 1.5;
}
</style>
