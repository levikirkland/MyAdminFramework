<template>
  <div class="ma-faq">
    <div 
      v-for="(item, index) in items" 
      :key="index"
      :class="['ma-faq__item', { 'ma-faq__item--active': activeIndex === index }]"
    >
      <button
        class="ma-faq__question"
        @click="toggle(index)"
        :aria-expanded="activeIndex === index"
      >
        <span class="ma-faq__question-text">{{ item.question }}</span>
        <ChevronDown 
          :size="20" 
          class="ma-faq__icon"
          :class="{ 'ma-faq__icon--rotated': activeIndex === index }"
        />
      </button>
      
      <transition name="ma-faq-slide">
        <div v-show="activeIndex === index" class="ma-faq__answer-wrapper">
          <div class="ma-faq__answer">
            <p v-if="typeof item.answer === 'string'">{{ item.answer }}</p>
            <div v-else v-html="item.answer"></div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

interface FaqItem {
  question: string
  answer: string
}

interface Props {
  items: FaqItem[]
  defaultOpen?: number | null
}

const props = withDefaults(defineProps<Props>(), {
  defaultOpen: null
})

interface Emits {
  (e: 'toggle', index: number, isOpen: boolean): void
}

const emit = defineEmits<Emits>()

const activeIndex = ref<number | null>(props.defaultOpen)

const toggle = (index: number) => {
  const newValue = activeIndex.value === index ? null : index
  activeIndex.value = newValue
  emit('toggle', index, newValue === index)
}
</script>

<style scoped>
.ma-faq {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ma-faq__item {
  background: var(--ma-bg-secondary, #fff);
  border: 1px solid var(--ma-border-color, #e5e7eb);
  border-radius: var(--ma-border-radius, 8px);
  overflow: hidden;
  transition: all 0.2s ease;
}

.ma-faq__item:hover {
  border-color: var(--ma-primary, #3b82f6);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
}

.ma-faq__item--active {
  border-color: var(--ma-primary, #3b82f6);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.ma-faq__question {
  width: 100%;
  padding: 1.25rem 1.5rem;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.2s ease;
}

.ma-faq__question:hover {
  background: var(--ma-bg-tertiary, #f9fafb);
}

.ma-faq__item--active .ma-faq__question {
  background: var(--ma-primary-light, #eff6ff);
}

.ma-faq__question-text {
  font-size: 1rem;
  font-weight: 600;
  color: var(--ma-text-primary, #1f2937);
  line-height: 1.5;
}

.ma-faq__icon {
  flex-shrink: 0;
  color: var(--ma-text-secondary, #6b7280);
  transition: transform 0.3s ease;
}

.ma-faq__icon--rotated {
  transform: rotate(180deg);
}

.ma-faq__item--active .ma-faq__icon {
  color: var(--ma-primary, #3b82f6);
}

.ma-faq__answer-wrapper {
  overflow: hidden;
}

.ma-faq__answer {
  padding: 0 1.5rem 1.25rem;
  color: var(--ma-text-secondary, #6b7280);
  font-size: 0.9375rem;
  line-height: 1.7;
}

.ma-faq__answer p {
  margin: 0;
}

.ma-faq__answer :deep(ul),
.ma-faq__answer :deep(ol) {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.ma-faq__answer :deep(li) {
  margin: 0.25rem 0;
}

.ma-faq__answer :deep(a) {
  color: var(--ma-primary, #3b82f6);
  text-decoration: none;
}

.ma-faq__answer :deep(a:hover) {
  text-decoration: underline;
}

/* Slide Animation */
.ma-faq-slide-enter-active,
.ma-faq-slide-leave-active {
  transition: all 0.3s ease;
}

.ma-faq-slide-enter-from,
.ma-faq-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
