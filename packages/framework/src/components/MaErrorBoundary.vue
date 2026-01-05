<template>
  <div class="ma-error-boundary">
    <slot v-if="!error" />
    <div v-else class="ma-error-fallback">
      <div class="ma-error-content">
        <h3 class="ma-error-title">Something went wrong</h3>
        <p class="ma-error-message">{{ error.message }}</p>
        <button class="ma-error-retry" @click="resetError">Try Again</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'

const error = ref<Error | null>(null)

onErrorCaptured((err) => {
  error.value = err as Error
  return false // Prevent error from propagating
})

const resetError = () => {
  error.value = null
}
</script>

<style scoped>
.ma-error-boundary {
  width: 100%;
  height: 100%;
}

.ma-error-fallback {
  padding: 24px;
  background-color: #fef2f2;
  border: 1px solid #fee2e2;
  border-radius: 8px;
  color: #991b1b;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.ma-error-content {
  text-align: center;
}

.ma-error-title {
  margin: 0 0 8px;
  font-size: 1.125rem;
  font-weight: 600;
}

.ma-error-message {
  margin: 0 0 16px;
  font-size: 0.875rem;
  opacity: 0.9;
}

.ma-error-retry {
  padding: 8px 16px;
  background-color: #fff;
  border: 1px solid #fca5a5;
  color: #b91c1c;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
}

.ma-error-retry:hover {
  background-color: #fef2f2;
  border-color: #ef4444;
}
</style>
