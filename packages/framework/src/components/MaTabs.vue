<template>
  <div class="ma-tabs" :class="{ 'is-vertical': vertical }">
    <div class="ma-tabs-header" :class="{ 'is-vertical': vertical }">
      <div
        v-for="tab in items"
        :key="tab.value"
        class="ma-tab-item"
        :class="{ 'is-active': modelValue === tab.value }"
        @click="$emit('update:modelValue', tab.value)"
      >
        {{ tab.label }}
      </div>
    </div>
    <div class="ma-tabs-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface TabItem {
  label: string;
  value: string | number;
}

defineProps<{
  modelValue: string | number;
  items: TabItem[];
  vertical?: boolean;
}>()

defineEmits(['update:modelValue'])
</script>

<style scoped>
.ma-tabs {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.ma-tabs.is-vertical {
  flex-direction: row;
}

.ma-tabs-header {
  display: flex;
  border-bottom: 1px solid var(--ma-border);
  margin-bottom: 24px;
  overflow-x: auto;
}

.ma-tabs-header.is-vertical {
  flex-direction: column;
  border-bottom: none;
  border-right: 1px solid var(--ma-border);
  margin-bottom: 0;
  margin-right: 24px;
  min-width: 200px;
}

.ma-tab-item {
  padding: 12px 24px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ma-text-muted);
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  white-space: nowrap;
}

.ma-tabs-header.is-vertical .ma-tab-item {
  border-bottom: none;
  border-right: 2px solid transparent;
  padding: 12px 16px;
  text-align: left;
  border-radius: 6px 0 0 6px;
}

.ma-tab-item:hover {
  color: var(--ma-primary);
  background-color: var(--ma-bg-page);
}

.ma-tab-item.is-active {
  color: var(--ma-primary);
  border-bottom-color: var(--ma-primary);
}

.ma-tabs-header.is-vertical .ma-tab-item.is-active {
  border-bottom-color: transparent;
  border-right-color: var(--ma-primary);
  background-color: rgba(var(--ma-primary-rgb), 0.05);
}

.ma-tabs-content {
  flex: 1;
}
</style>
