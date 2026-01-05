<template>
  <nav class="ma-breadcrumb" aria-label="Breadcrumb">
    <ol class="ma-breadcrumb-list">
      <li v-for="(item, index) in items" :key="index" class="ma-breadcrumb-item">
        <!-- Item Icon -->
        <span v-if="item.icon || $slots['item-icon']" class="ma-breadcrumb-icon">
          <slot name="item-icon" :item="item">
            <component :is="getIcon(item.icon)" :size="16" />
          </slot>
        </span>

        <!-- Item Link/Text -->
        <component
          :is="item.to ? 'router-link' : 'span'"
          :to="item.to"
          class="ma-breadcrumb-link"
          :class="{ 'is-active': !item.to }"
          :aria-current="!item.to ? 'page' : undefined"
        >
          {{ item.label }}
        </component>

        <!-- Separator -->
        <span v-if="index < items.length - 1" class="ma-breadcrumb-separator">
          <slot name="separator">
            <component v-if="separatorIcon" :is="getIcon(separatorIcon)" :size="14" />
            <span v-else>{{ separator }}</span>
          </slot>
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import * as LucideIcons from 'lucide-vue-next';

interface BreadcrumbItem {
  label: string;
  to?: string | object;
  icon?: string;
}

withDefaults(defineProps<{
  items: BreadcrumbItem[];
  separator?: string;
  separatorIcon?: string;
}>(), {
  separator: '/',
  separatorIcon: 'ChevronRight'
});

const getIcon = (name?: string) => {
  if (!name) return null;
  return (LucideIcons as any)[name] || LucideIcons.ChevronRight;
};
</script>

<style scoped>
.ma-breadcrumb {
  margin-bottom: 16px;
}

.ma-breadcrumb-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
  align-items: center;
}

.ma-breadcrumb-item {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: var(--ma-text-muted);
}

.ma-breadcrumb-icon {
  margin-right: 6px;
  display: flex;
  align-items: center;
  color: inherit;
}

.ma-breadcrumb-link {
  color: var(--ma-text-muted);
  text-decoration: none;
  transition: color 0.2s;
  display: flex;
  align-items: center;
}

.ma-breadcrumb-link:hover:not(.is-active) {
  color: var(--ma-primary);
  text-decoration: underline;
}

.ma-breadcrumb-link.is-active {
  color: var(--ma-text-main);
  font-weight: 500;
  cursor: default;
}

.ma-breadcrumb-separator {
  margin: 0 8px;
  color: var(--ma-text-muted);
  opacity: 0.5;
  display: flex;
  align-items: center;
}
</style>
