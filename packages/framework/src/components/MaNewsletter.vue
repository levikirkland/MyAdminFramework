<template>
  <div :class="['ma-newsletter', `ma-newsletter--${variant}`]">
    <div class="ma-newsletter__content">
      <div v-if="icon" class="ma-newsletter__icon">
        <Mail :size="iconSize" />
      </div>
      
      <div class="ma-newsletter__text">
        <h3 v-if="title" class="ma-newsletter__title">{{ title }}</h3>
        <p v-if="description" class="ma-newsletter__description">{{ description }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="ma-newsletter__form">
        <div class="ma-newsletter__input-group">
          <Mail v-if="variant !== 'inline'" :size="18" class="ma-newsletter__input-icon" />
          <input
            v-model="email"
            type="email"
            :placeholder="placeholder"
            :required="required"
            class="ma-newsletter__input"
            :disabled="isSubmitting"
          />
          <button
            type="submit"
            :disabled="isSubmitting || !email"
            class="ma-newsletter__submit"
          >
            <Loader v-if="isSubmitting" :size="18" class="ma-newsletter__spinner" />
            <template v-else>{{ buttonText }}</template>
          </button>
        </div>

        <p v-if="helperText" class="ma-newsletter__helper">{{ helperText }}</p>
      </form>

      <div v-if="showPrivacy" class="ma-newsletter__privacy">
        <Shield :size="14" />
        <span>We respect your privacy. Unsubscribe anytime.</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Mail, Shield, Loader } from 'lucide-vue-next'

interface Props {
  title?: string
  description?: string
  placeholder?: string
  buttonText?: string
  helperText?: string
  variant?: 'default' | 'compact' | 'inline' | 'centered'
  icon?: boolean
  iconSize?: number
  showPrivacy?: boolean
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Enter your email',
  buttonText: 'Subscribe',
  variant: 'default',
  icon: true,
  iconSize: 32,
  showPrivacy: true,
  required: true
})

interface Emits {
  (e: 'submit', email: string): void
}

const emit = defineEmits<Emits>()

const email = ref('')
const isSubmitting = ref(false)

const handleSubmit = async () => {
  if (!email.value || isSubmitting.value) return
  
  isSubmitting.value = true
  emit('submit', email.value)
  
  // Simulate API call
  setTimeout(() => {
    isSubmitting.value = false
    email.value = ''
  }, 1000)
}
</script>

<style scoped>
.ma-newsletter {
  background: var(--ma-bg-secondary, #fff);
  border: 1px solid var(--ma-border-color, #e5e7eb);
  border-radius: var(--ma-border-radius, 12px);
  padding: 2rem;
}

.ma-newsletter__content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.ma-newsletter__icon {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background: var(--ma-primary-light, #eff6ff);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ma-primary, #3b82f6);
}

.ma-newsletter__text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.ma-newsletter__title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--ma-text-primary, #1f2937);
  margin: 0;
}

.ma-newsletter__description {
  font-size: 0.9375rem;
  color: var(--ma-text-secondary, #6b7280);
  line-height: 1.6;
  margin: 0;
}

.ma-newsletter__form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ma-newsletter__input-group {
  position: relative;
  display: flex;
  gap: 0.5rem;
}

.ma-newsletter__input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--ma-text-tertiary, #9ca3af);
  pointer-events: none;
}

.ma-newsletter__input {
  flex: 1;
  padding: 0.875rem 1rem;
  padding-left: 3rem;
  border: 1px solid var(--ma-border-color, #e5e7eb);
  border-radius: 8px;
  font-size: 0.9375rem;
  color: var(--ma-text-primary, #1f2937);
  background: var(--ma-bg-secondary, #fff);
  transition: all 0.2s ease;
}

.ma-newsletter__input:focus {
  outline: none;
  border-color: var(--ma-primary, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.ma-newsletter__input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.ma-newsletter__submit {
  padding: 0.875rem 1.5rem;
  background: var(--ma-primary, #3b82f6);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.ma-newsletter__submit:hover:not(:disabled) {
  background: var(--ma-primary-dark, #2563eb);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.ma-newsletter__submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.ma-newsletter__spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.ma-newsletter__helper {
  font-size: 0.8125rem;
  color: var(--ma-text-tertiary, #9ca3af);
  margin: 0;
}

.ma-newsletter__privacy {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: var(--ma-text-tertiary, #9ca3af);
  padding-top: 1rem;
  border-top: 1px solid var(--ma-border-color, #e5e7eb);
}

/* Compact Variant */
.ma-newsletter--compact {
  padding: 1.5rem;
}

.ma-newsletter--compact .ma-newsletter__content {
  gap: 1rem;
}

.ma-newsletter--compact .ma-newsletter__icon {
  width: 48px;
  height: 48px;
}

.ma-newsletter--compact .ma-newsletter__title {
  font-size: 1.25rem;
}

.ma-newsletter--compact .ma-newsletter__input-group {
  flex-direction: column;
}

/* Inline Variant */
.ma-newsletter--inline {
  padding: 1.5rem;
}

.ma-newsletter--inline .ma-newsletter__content {
  gap: 1rem;
}

.ma-newsletter--inline .ma-newsletter__input {
  padding-left: 1rem;
}

.ma-newsletter--inline .ma-newsletter__privacy {
  padding-top: 0.75rem;
  border-top: none;
}

/* Centered Variant */
.ma-newsletter--centered {
  text-align: center;
}

.ma-newsletter--centered .ma-newsletter__icon {
  margin: 0 auto;
}

.ma-newsletter--centered .ma-newsletter__input-group {
  max-width: 500px;
  margin: 0 auto;
}

.ma-newsletter--centered .ma-newsletter__privacy {
  justify-content: center;
}

/* Responsive */
@media (max-width: 768px) {
  .ma-newsletter {
    padding: 1.5rem;
  }

  .ma-newsletter__title {
    font-size: 1.25rem;
  }

  .ma-newsletter__input-group {
    flex-direction: column;
  }

  .ma-newsletter__input {
    padding-left: 3rem;
  }

  .ma-newsletter__submit {
    width: 100%;
  }
}
</style>
