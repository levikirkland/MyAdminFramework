<template>
  <div class="ma-empty">
    <div class="ma-empty-image">
      <slot name="image">
        <Inbox :size="64" stroke-width="1" />
      </slot>
    </div>
    <div class="ma-empty-description">
      <slot name="description">{{ description }}</slot>
    </div>
    <div class="ma-empty-footer" v-if="$slots.default">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Inbox } from 'lucide-vue-next';

withDefaults(defineProps<{
  description?: string;
}>(), {
  description: 'No Data'
});
</script>

<style scoped>
.ma-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
  color: var(--ma-text-muted);
}

.ma-empty-image {
  margin-bottom: 16px;
  color: var(--ma-border); /* Lighter color for the icon */
}

.dark .ma-empty-image {
  color: var(--ma-bg-secondary);
}

.ma-empty-description {
  font-size: 0.875rem;
  margin-bottom: 16px;
}
</style>
