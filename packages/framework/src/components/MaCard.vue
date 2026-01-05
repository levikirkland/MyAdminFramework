<template>
  <div 
    v-if="!isRemoved"
    class="ma-card"
    :class="[
      `ma-card--shadow-${shadow}`,
      { 
        'is-bordered': bordered, 
        'is-loading': loading,
        'is-maximized': isMaximized
      }
    ]"
  >
    <!-- Header -->
    <div v-if="$slots.header || title || collapsible || removable || maximizable" class="ma-card-header">
      <div class="ma-card-header-title">
        <slot name="header">{{ title }}</slot>
      </div>
      
      <div class="ma-card-tools">
        <div v-if="$slots.extra" class="ma-card-header-extra">
          <slot name="extra" />
        </div>
        
        <button v-if="maximizable" class="ma-card-tool-btn" @click="toggleMaximize" :title="isMaximized ? 'Minimize' : 'Maximize'">
          <component :is="isMaximized ? Minimize2 : Maximize2" :size="16" />
        </button>
        
        <button v-if="collapsible" class="ma-card-tool-btn" @click="toggleCollapse" :title="isCollapsed ? 'Expand' : 'Collapse'">
          <component :is="isCollapsed ? Plus : Minus" :size="16" />
        </button>
        
        <button v-if="removable" class="ma-card-tool-btn" @click="removeCard" title="Remove">
          <X :size="16" />
        </button>
      </div>
    </div>

    <!-- Cover Image -->
    <div v-if="$slots.cover" v-show="!isCollapsed" class="ma-card-cover">
      <slot name="cover" />
    </div>

    <!-- Content -->
    <div v-show="!isCollapsed" class="ma-card-body">
      <div v-if="loading" class="ma-card-skeleton">
        <div class="ma-skeleton-title"></div>
        <div class="ma-skeleton-paragraph">
          <div class="ma-skeleton-line"></div>
          <div class="ma-skeleton-line"></div>
          <div class="ma-skeleton-line" style="width: 60%"></div>
        </div>
      </div>
      <slot v-else />
    </div>

    <!-- Actions -->
    <div v-if="$slots.actions" v-show="!isCollapsed" class="ma-card-actions">
      <slot name="actions" />
    </div>

    <!-- Footer -->
    <div v-if="$slots.footer" v-show="!isCollapsed" class="ma-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Minus, Plus, X, Maximize2, Minimize2 } from 'lucide-vue-next'

withDefaults(defineProps<{
  title?: string;
  bordered?: boolean;
  loading?: boolean;
  shadow?: 'always' | 'hover' | 'never';
  collapsible?: boolean;
  removable?: boolean;
  maximizable?: boolean;
}>(), {
  bordered: true,
  loading: false,
  shadow: 'hover',
  collapsible: false,
  removable: false,
  maximizable: false
});

const isCollapsed = ref(false)
const isRemoved = ref(false)
const isMaximized = ref(false)

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const removeCard = () => {
  isRemoved.value = true
}

const toggleMaximize = () => {
  isMaximized.value = !isMaximized.value
}
</script>

<style scoped>
.ma-card {
  background: var(--ma-bg-card);
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Borders */
.ma-card.is-bordered {
  border: 1px solid var(--ma-border);
}

/* Shadows */
.ma-card--shadow-always {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.ma-card--shadow-hover:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.ma-card--shadow-never {
  box-shadow: none;
}

/* Header */
.ma-card-header {
  padding: 16px 24px;
  border-bottom: 1px solid var(--ma-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 56px;
}

.ma-card-header-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--ma-text-main);
  flex: 1;
}

.ma-card-tools {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.ma-card-header-extra {
  font-size: 0.875rem;
  color: var(--ma-text-secondary);
  margin-right: 8px;
}

.ma-card-tool-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--ma-text-secondary);
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.ma-card-tool-btn:hover {
  background-color: var(--ma-bg-secondary);
  color: var(--ma-text-main);
}

/* Maximized State */
.ma-card.is-maximized {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  border-radius: 0;
  margin: 0;
  transform: none !important;
}

.ma-card.is-maximized .ma-card-body {
  flex: 1;
  overflow: auto;
}

/* Cover */
.ma-card-cover {
  width: 100%;
}

.ma-card-cover :deep(img) {
  width: 100%;
  display: block;
  object-fit: cover;
}

/* Body */
.ma-card-body {
  padding: 24px;
  flex: 1;
  color: var(--ma-text-main);
}

/* Actions */
.ma-card-actions {
  padding: 16px 24px;
  border-top: 1px solid var(--ma-border);
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* Footer */
.ma-card-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--ma-border);
  background-color: var(--ma-bg-secondary);
}

/* Skeleton Loading */
.ma-skeleton-title {
  width: 38%;
  height: 24px;
  background: var(--ma-border);
  margin-bottom: 24px;
  border-radius: 4px;
  animation: ma-skeleton-pulse 1.5s ease-in-out infinite;
}

.ma-skeleton-paragraph {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ma-skeleton-line {
  width: 100%;
  height: 16px;
  background: var(--ma-border);
  border-radius: 4px;
  animation: ma-skeleton-pulse 1.5s ease-in-out infinite;
}

@keyframes ma-skeleton-pulse {
  0% { opacity: 0.6; }
  50% { opacity: 0.3; }
  100% { opacity: 0.6; }
}
</style>
