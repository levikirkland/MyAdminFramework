<template>
  <div 
    class="ma-avatar" 
    :class="[
      `ma-avatar--${shape}`,
      typeof size === 'string' ? `ma-avatar--${size}` : '',
      { 'ma-avatar--icon': !hasImage && (icon || $slots.icon) }
    ]" 
    :style="styles"
  >
    <!-- Image -->
    <img 
      v-if="hasImage" 
      :src="src" 
      :alt="alt" 
      class="ma-avatar-img" 
      @error="handleImageError"
    />
    
    <!-- Text / Initials -->
    <span v-else-if="text || $slots.default" class="ma-avatar-text">
      <slot>{{ text }}</slot>
    </span>

    <!-- Icon -->
    <span v-else class="ma-avatar-icon">
      <slot name="icon">
        <component :is="iconComponent" :size="iconSize" />
      </slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import * as LucideIcons from 'lucide-vue-next';

const props = withDefaults(defineProps<{
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large' | number;
  shape?: 'circle' | 'square';
  text?: string;
  icon?: string;
  bgColor?: string;
  color?: string;
}>(), {
  size: 'medium',
  shape: 'circle',
  alt: 'Avatar'
});

const imageLoadError = ref(false);

const hasImage = computed(() => {
  return props.src && !imageLoadError.value;
});

const iconComponent = computed(() => {
  if (props.icon) return (LucideIcons as any)[props.icon];
  return LucideIcons.User;
});

const styles = computed(() => {
  const style: Record<string, string> = {};
  
  if (typeof props.size === 'number') {
    style.width = `${props.size}px`;
    style.height = `${props.size}px`;
    style.fontSize = `${props.size / 2.5}px`;
  }
  
  if (props.bgColor) style.backgroundColor = props.bgColor;
  if (props.color) style.color = props.color;
  
  return style;
});

const iconSize = computed(() => {
  if (typeof props.size === 'number') return props.size / 2;
  switch (props.size) {
    case 'small': return 14;
    case 'large': return 24;
    default: return 20;
  }
});

const handleImageError = () => {
  imageLoadError.value = true;
};

watch(() => props.src, () => {
  imageLoadError.value = false;
});
</script>

<style scoped>
.ma-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--ma-bg-secondary, #e2e8f0);
  color: var(--ma-text-secondary, #64748b);
  overflow: hidden;
  vertical-align: middle;
  font-weight: 600;
  text-transform: uppercase;
  user-select: none;
  flex-shrink: 0;
  line-height: 1;
}

.ma-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.ma-avatar-text {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.ma-avatar-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Shapes */
.ma-avatar--circle { border-radius: 50%; }
.ma-avatar--square { border-radius: 8px; }

/* Sizes */
.ma-avatar--small {
  width: 32px;
  height: 32px;
  font-size: 12px;
}

.ma-avatar--medium {
  width: 40px;
  height: 40px;
  font-size: 16px;
}

.ma-avatar--large {
  width: 56px;
  height: 56px;
  font-size: 20px;
}
</style>
