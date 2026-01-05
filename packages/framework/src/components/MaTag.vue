<template>
  <span class="ma-tag" :class="classes" :style="styles">
    <slot />
    <span v-if="closable" class="ma-tag-close" @click.stop="$emit('close')">
      <X :size="iconSize" />
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { X } from 'lucide-vue-next'

interface TagProps {
  type?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
  variant?: 'light' | 'dark' | 'outline' | 'plain';
  closable?: boolean;
  round?: boolean;
  color?: string;
  bgColor?: string;
  borderColor?: string;
}

const props = withDefaults(defineProps<TagProps>(), {
  type: 'default',
  size: 'medium',
  variant: 'light',
  closable: false,
  round: false
})

defineEmits(['close'])

const classes = computed(() => {
  return [
    `ma-tag--${props.type}`,
    `ma-tag--${props.size}`,
    `ma-tag--${props.variant}`,
    {
      'ma-tag--round': props.round,
      'ma-tag--closable': props.closable
    }
  ]
})

const styles = computed(() => {
  const style: Record<string, string> = {}
  if (props.color) style.color = props.color
  if (props.bgColor) style.backgroundColor = props.bgColor
  if (props.borderColor) style.borderColor = props.borderColor
  return style
})

const iconSize = computed(() => {
  switch (props.size) {
    case 'small': return 10;
    case 'large': return 14;
    default: return 12;
  }
})
</script>

<style scoped>
.ma-tag {
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  border: 1px solid transparent;
  white-space: nowrap;
  transition: all 0.2s;
  vertical-align: middle;
  font-weight: 500;
}

.ma-tag--round {
  border-radius: 9999px;
}

.ma-tag-close {
  margin-left: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.ma-tag-close:hover {
  opacity: 1;
}

/* Sizes */
.ma-tag--small {
  padding: 0 6px;
  height: 20px;
  font-size: 12px;
  line-height: 18px;
}

.ma-tag--medium {
  padding: 0 8px;
  height: 24px;
  font-size: 12px;
  line-height: 22px;
}

.ma-tag--large {
  padding: 0 12px;
  height: 32px;
  font-size: 14px;
  line-height: 30px;
}

/* Variants & Types */

/* Light (Default) */
.ma-tag--light.ma-tag--default { background-color: var(--ma-bg-secondary, #f1f5f9); border-color: var(--ma-border); color: var(--ma-text-main, #334155); }
.ma-tag--light.ma-tag--primary { background-color: var(--ma-primary-light); border-color: var(--ma-primary-light); color: var(--ma-primary); }
.ma-tag--light.ma-tag--success { background-color: #dcfce7; border-color: #dcfce7; color: #16a34a; }
.ma-tag--light.ma-tag--warning { background-color: #fef3c7; border-color: #fef3c7; color: #d97706; }
.ma-tag--light.ma-tag--error { background-color: #fee2e2; border-color: #fee2e2; color: #dc2626; }
.ma-tag--light.ma-tag--info { background-color: #dbeafe; border-color: #dbeafe; color: #2563eb; }

/* Dark */
.ma-tag--dark.ma-tag--default { background-color: #475569; border-color: #475569; color: #fff; }
.ma-tag--dark.ma-tag--primary { background-color: var(--ma-primary); border-color: var(--ma-primary); color: #fff; }
.ma-tag--dark.ma-tag--success { background-color: #16a34a; border-color: #16a34a; color: #fff; }
.ma-tag--dark.ma-tag--warning { background-color: #d97706; border-color: #d97706; color: #fff; }
.ma-tag--dark.ma-tag--error { background-color: #dc2626; border-color: #dc2626; color: #fff; }
.ma-tag--dark.ma-tag--info { background-color: #2563eb; border-color: #2563eb; color: #fff; }

/* Outline */
.ma-tag--outline { background-color: transparent; }
.ma-tag--outline.ma-tag--default { border-color: #cbd5e1; color: #334155; }
.ma-tag--outline.ma-tag--primary { border-color: var(--ma-primary); color: var(--ma-primary); }
.ma-tag--outline.ma-tag--success { border-color: #16a34a; color: #16a34a; }
.ma-tag--outline.ma-tag--warning { border-color: #d97706; color: #d97706; }
.ma-tag--outline.ma-tag--error { border-color: #dc2626; color: #dc2626; }
.ma-tag--outline.ma-tag--info { border-color: #2563eb; color: #2563eb; }

/* Plain */
.ma-tag--plain { background-color: transparent; border-color: transparent; }
.ma-tag--plain.ma-tag--default { color: #334155; }
.ma-tag--plain.ma-tag--primary { color: var(--ma-primary); }
.ma-tag--plain.ma-tag--success { color: #16a34a; }
.ma-tag--plain.ma-tag--warning { color: #d97706; }
.ma-tag--plain.ma-tag--error { color: #dc2626; }
.ma-tag--plain.ma-tag--info { color: #2563eb; }
</style>
