<template>
  <MaModal 
    v-model="visible" 
    :title="title" 
    size="small" 
    :closable="false"
    :mask-closable="false"
  >
    <div class="ma-confirm-body">
      <div v-if="type" class="ma-confirm-icon" :class="`is-${type}`">
        <component :is="iconComponent" :size="24" />
      </div>
      <div class="ma-confirm-content">{{ content }}</div>
    </div>
    <template #footer>
      <div class="ma-confirm-footer">
        <MaButton variant="outline" @click="handleCancel">{{ cancelText }}</MaButton>
        <MaButton :color="confirmColor" @click="handleConfirm" :loading="loading">{{ confirmText }}</MaButton>
      </div>
    </template>
  </MaModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import MaModal from './MaModal.vue';
import MaButton from './MaButton.vue';
import { AlertTriangle, CheckCircle, Info, XCircle, HelpCircle } from 'lucide-vue-next';

const props = withDefaults(defineProps<{
  title?: string;
  content: string;
  type?: 'info' | 'success' | 'warning' | 'error' | 'confirm';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => Promise<void> | void;
  onCancel?: () => void;
}>(), {
  title: 'Confirm',
  type: 'confirm',
  confirmText: 'Confirm',
  cancelText: 'Cancel'
});

const visible = ref(true);
const loading = ref(false);

const iconComponent = computed(() => {
  switch (props.type) {
    case 'success': return CheckCircle;
    case 'warning': return AlertTriangle;
    case 'error': return XCircle;
    case 'info': return Info;
    default: return HelpCircle;
  }
});

const confirmColor = computed(() => {
  switch (props.type) {
    case 'success': return 'success';
    case 'warning': return 'warning';
    case 'error': return 'danger';
    default: return 'primary';
  }
});

const handleConfirm = async () => {
  if (props.onConfirm) {
    const result = props.onConfirm();
    if (result instanceof Promise) {
      loading.value = true;
      try {
        await result;
        visible.value = false;
      } catch (e) {
        console.error(e);
      } finally {
        loading.value = false;
      }
    } else {
      visible.value = false;
    }
  } else {
    visible.value = false;
  }
};

const handleCancel = () => {
  if (props.onCancel) {
    props.onCancel();
  }
  visible.value = false;
};
</script>

<style scoped>
.ma-confirm-body {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 8px 0;
}

.ma-confirm-icon {
  flex-shrink: 0;
}

.ma-confirm-icon.is-warning { color: var(--ma-warning, #d97706); }
.ma-confirm-icon.is-error { color: var(--ma-danger, #dc2626); }
.ma-confirm-icon.is-success { color: var(--ma-success, #16a34a); }
.ma-confirm-icon.is-info { color: var(--ma-info, #2563eb); }
.ma-confirm-icon.is-confirm { color: var(--ma-primary); }

.ma-confirm-content {
  flex: 1;
  font-size: 14px;
  line-height: 1.5;
  color: var(--ma-text-main);
}

.ma-confirm-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>