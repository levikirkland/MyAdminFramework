<template>
  <div class="ma-col" :class="classes" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'

interface ColProps {
  span?: number | string;
  offset?: number | string;
  xs?: number | { span?: number; offset?: number };
  sm?: number | { span?: number; offset?: number };
  md?: number | { span?: number; offset?: number };
  lg?: number | { span?: number; offset?: number };
  xl?: number | { span?: number; offset?: number };
}

const props = withDefaults(defineProps<ColProps>(), {
  span: 24
})

const gutter = inject<number | [number, number]>('ma-row-gutter', 0)

const style = computed(() => {
  const gutterX = Array.isArray(gutter) ? gutter[0] : gutter
  const gutterY = Array.isArray(gutter) ? gutter[1] : 0
  
  return {
    paddingLeft: `${gutterX / 2}px`,
    paddingRight: `${gutterX / 2}px`,
    paddingTop: `${gutterY / 2}px`,
    paddingBottom: `${gutterY / 2}px`
  }
})

const classes = computed(() => {
  const list = []
  
  if (props.span) list.push(`ma-col-${props.span}`)
  if (props.offset) list.push(`ma-col-offset-${props.offset}`)
  
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
  sizes.forEach(size => {
    const sizeProp = props[size]
    if (typeof sizeProp === 'number') {
      list.push(`ma-col-${size}-${sizeProp}`)
    } else if (typeof sizeProp === 'object') {
      if (sizeProp.span) list.push(`ma-col-${size}-${sizeProp.span}`)
      if (sizeProp.offset) list.push(`ma-col-${size}-offset-${sizeProp.offset}`)
    }
  })
  
  return list
})
</script>

<style scoped lang="scss">
@use "sass:math";

.ma-col {
  position: relative;
  max-width: 100%;
  box-sizing: border-box;
}

@for $i from 1 through 24 {
  .ma-col-#{$i} {
    flex: 0 0 math.percentage(math.div($i, 24));
    max-width: math.percentage(math.div($i, 24));
  }
  .ma-col-offset-#{$i} {
    margin-left: math.percentage(math.div($i, 24));
  }
}

// Responsive breakpoints
$breakpoints: (
  xs: 480px,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px
);

@each $key, $val in $breakpoints {
  @media (min-width: $val) {
    @for $i from 1 through 24 {
      .ma-col-#{$key}-#{$i} {
        flex: 0 0 math.percentage(math.div($i, 24));
        max-width: math.percentage(math.div($i, 24));
      }
      .ma-col-#{$key}-offset-#{$i} {
        margin-left: math.percentage(math.div($i, 24));
      }
    }
  }
}
</style>
