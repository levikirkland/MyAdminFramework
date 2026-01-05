<template>
  <div class="ma-stat-widget" :class="{ 'is-loading': loading }">
    <div class="ma-stat-main">
      <div class="ma-stat-content">
        <div class="ma-stat-value">{{ value }}</div>
        <div class="ma-stat-label">{{ title }}</div>
        
        <div v-if="trend" class="ma-stat-trend" :class="trendDirection">
          <span class="trend-icon">
            <svg v-if="trendDirection === 'up'" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
            <svg v-else-if="trendDirection === 'down'" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
            <span v-else>-</span>
          </span>
          <span class="trend-value">{{ trend }}</span>
        </div>
      </div>
      
      <div v-if="icon || $slots.icon" class="ma-stat-icon" :class="color">
        <slot name="icon">
          <component :is="icon" v-if="typeof icon === 'object'" />
          <MaIcon :name="icon" v-else-if="typeof icon === 'string'" />
        </slot>
      </div>
    </div>
    
    <div v-if="$slots.footer" class="ma-stat-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MaIcon from './MaIcon.vue'

withDefaults(defineProps<{
  title: string
  value: string | number
  icon?: any
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary'
  trend?: string
  trendDirection?: 'up' | 'down' | 'neutral'
  loading?: boolean
}>(), {
  color: 'primary',
  trendDirection: 'neutral',
  loading: false
})
</script>

<style scoped>
.ma-stat-widget {
  background: var(--ma-bg-card);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid var(--ma-border);
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.2s;
}

.ma-stat-widget:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.ma-stat-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.ma-stat-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ma-stat-value {
  font-size: 24px;
  font-weight: 700;
  color: var(--ma-text-main);
  line-height: 1.2;
}

.ma-stat-label {
  font-size: 14px;
  color: var(--ma-text-secondary);
  font-weight: 500;
}

.ma-stat-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 500;
  margin-top: 4px;
}

.ma-stat-trend.up { color: var(--ma-success); }
.ma-stat-trend.down { color: var(--ma-danger); }
.ma-stat-trend.neutral { color: var(--ma-text-secondary); }

.ma-stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.ma-stat-icon.primary { background: var(--ma-primary-light); color: var(--ma-primary); }
.ma-stat-icon.success { background: #dcfce7; color: #16a34a; }
.ma-stat-icon.warning { background: #fef9c3; color: #ca8a04; }
.ma-stat-icon.danger { background: #fee2e2; color: #dc2626; }
.ma-stat-icon.info { background: #e0f2fe; color: #0284c7; }
.ma-stat-icon.secondary { background: #f3f4f6; color: #4b5563; }

.ma-stat-footer {
  padding-top: 16px;
  border-top: 1px solid var(--ma-border);
  font-size: 13px;
  color: var(--ma-text-secondary);
}

/* Loading State */
.ma-stat-widget.is-loading .ma-stat-value,
.ma-stat-widget.is-loading .ma-stat-label,
.ma-stat-widget.is-loading .ma-stat-trend {
  color: transparent;
  background: #e5e7eb;
  border-radius: 4px;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.ma-stat-widget.is-loading .ma-stat-value { width: 80px; height: 28px; margin-bottom: 4px; }
.ma-stat-widget.is-loading .ma-stat-label { width: 120px; height: 16px; }
.ma-stat-widget.is-loading .ma-stat-trend { width: 60px; height: 16px; margin-top: 8px; }
.ma-stat-widget.is-loading .ma-stat-icon { background: #e5e7eb; color: transparent; }

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}
</style>
