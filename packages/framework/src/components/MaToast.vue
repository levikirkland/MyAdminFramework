<template>
  <Teleport to="body">
    <div class="ma-toast-container">
      <TransitionGroup name="toast-list">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="ma-toast"
          :class="[`ma-toast--${toast.type}`]"
        >
          <span class="ma-toast-icon">
            <CheckCircle v-if="toast.type === 'success'" :size="20" />
            <XCircle v-else-if="toast.type === 'error'" :size="20" />
            <Info v-else :size="20" />
          </span>
          <div class="ma-toast-content">
            <div v-if="toast.title" class="ma-toast-title">{{ toast.title }}</div>
            <div class="ma-toast-message">{{ toast.message }}</div>
          </div>
          <button class="ma-toast-close" @click="remove(toast.id)">
            <X :size="16" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CheckCircle, XCircle, Info, X } from 'lucide-vue-next'

interface Toast {
  id: number;
  title?: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

const toasts = ref<Toast[]>([]);
let nextId = 0;

const add = (toast: Omit<Toast, 'id'>) => {
  const id = nextId++;
  const newToast = { ...toast, id };
  toasts.value.push(newToast);

  if (toast.duration !== 0) {
    setTimeout(() => remove(id), toast.duration || 3000);
  }
};

const remove = (id: number) => {
  toasts.value = toasts.value.filter(t => t.id !== id);
};

defineExpose({ add });
</script>

<style scoped>
.ma-toast-container {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;
}

.ma-toast {
  pointer-events: auto;
  width: 320px;
  background: var(--ma-bg-card);
  border: 1px solid var(--ma-border);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.ma-toast--success { border-left: 4px solid var(--ma-success, #16a34a); }
.ma-toast--error { border-left: 4px solid var(--ma-danger, #dc2626); }
.ma-toast--info { border-left: 4px solid var(--ma-info, #2563eb); }

.ma-toast-icon {
  font-size: 1.25rem;
}

.ma-toast-content {
  flex: 1;
}

.ma-toast-title {
  font-weight: 700;
  font-size: 0.875rem;
  color: var(--ma-text-main);
  margin-bottom: 4px;
}

.ma-toast-message {
  font-size: 0.875rem;
  color: var(--ma-text-muted);
}

.ma-toast-close {
  background: none;
  border: none;
  color: var(--ma-text-muted);
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0;
  line-height: 1;
}

/* Transitions */
.toast-list-enter-active, .toast-list-leave-active {
  transition: all 0.3s ease;
}
.toast-list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.toast-list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
