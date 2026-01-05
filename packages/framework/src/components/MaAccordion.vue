<template>
  <div class="ma-accordion">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, toRef } from 'vue';

const props = withDefaults(defineProps<{
  modelValue?: string | number | (string | number)[];
  multiple?: boolean;
}>(), {
  multiple: false
});

const emit = defineEmits(['update:modelValue']);

const updateModel = (name: string | number) => {
  if (props.multiple) {
    const current = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
    const index = current.indexOf(name);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(name);
    }
    emit('update:modelValue', current);
  } else {
    emit('update:modelValue', props.modelValue === name ? '' : name);
  }
};

provide('ma-accordion-model', toRef(props, 'modelValue'));
provide('ma-accordion-update', updateModel);
</script>

<style scoped>
.ma-accordion {
  border-top: 1px solid var(--ma-border);
  border-bottom: 1px solid var(--ma-border);
}
</style>
