<template>
  <div class="ma-upload-container">
    <label v-if="label" class="ma-label">{{ label }}</label>
    
    <div 
      class="ma-upload-dropzone"
      :class="{ 'is-dragover': isDragOver, 'is-disabled': disabled }"
      @dragover.prevent="isDragOver = true"
      @dragleave.prevent="isDragOver = false"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        class="hidden-input"
        :multiple="multiple"
        :accept="accept"
        :disabled="disabled"
        @change="handleFileSelect"
      />
      
      <div class="upload-content">
        <div class="upload-icon">
          <UploadCloud :size="32" />
        </div>
        <div class="upload-text">
          <span class="upload-highlight">Click to upload</span> or drag and drop
        </div>
        <div class="upload-hint" v-if="hint">{{ hint }}</div>
      </div>
    </div>

    <div v-if="fileList.length > 0" class="ma-upload-list">
      <div v-for="(file, index) in fileList" :key="index" class="ma-upload-item">
        <div class="file-info">
          <FileIcon :size="16" class="file-icon" />
          <span class="file-name">{{ file.name }}</span>
          <span class="file-size">{{ formatSize(file.size) }}</span>
        </div>
        <button class="remove-btn" @click="removeFile(index)" :disabled="disabled">
          <X :size="14" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UploadCloud, File as FileIcon, X } from 'lucide-vue-next'

interface UploadProps {
  label?: string;
  multiple?: boolean;
  accept?: string;
  disabled?: boolean;
  hint?: string;
  modelValue?: File[];
}

const props = withDefaults(defineProps<UploadProps>(), {
  multiple: false,
  modelValue: () => []
})

const emit = defineEmits(['update:modelValue', 'change'])

const fileInput = ref<HTMLInputElement | null>(null)
const isDragOver = ref(false)
const fileList = ref<File[]>(props.modelValue)

const triggerFileInput = () => {
  if (!props.disabled && fileInput.value) {
    fileInput.value.click()
  }
}

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    addFiles(Array.from(input.files))
  }
}

const handleDrop = (event: DragEvent) => {
  isDragOver.value = false
  if (!props.disabled && event.dataTransfer?.files) {
    addFiles(Array.from(event.dataTransfer.files))
  }
}

const addFiles = (files: File[]) => {
  if (props.multiple) {
    fileList.value = [...fileList.value, ...files]
  } else {
    fileList.value = files.slice(0, 1)
  }
  emit('update:modelValue', fileList.value)
  emit('change', fileList.value)
}

const removeFile = (index: number) => {
  if (props.disabled) return
  fileList.value.splice(index, 1)
  emit('update:modelValue', fileList.value)
  emit('change', fileList.value)
}

const formatSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>

<style scoped>
.ma-upload-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.ma-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ma-text-main, #334155);
}

.ma-upload-dropzone {
  border: 2px dashed var(--ma-border);
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background-color: var(--ma-bg-card, #ffffff);
}

.ma-upload-dropzone:hover {
  border-color: var(--ma-primary);
  background-color: var(--ma-bg-secondary, #f8fafc);
}

.ma-upload-dropzone.is-dragover {
  border-color: var(--ma-primary);
  background-color: var(--ma-primary-light);
}

.ma-upload-dropzone.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: var(--ma-bg-secondary, #f1f5f9);
}

.hidden-input {
  display: none;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.upload-icon {
  color: var(--ma-text-muted, #94a3b8);
  margin-bottom: 4px;
}

.upload-text {
  font-size: 0.875rem;
  color: var(--ma-text-main, #334155);
}

.upload-highlight {
  color: var(--ma-primary);
  font-weight: 500;
}

.upload-hint {
  font-size: 0.75rem;
  color: var(--ma-text-muted, #94a3b8);
}

.ma-upload-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
}

.ma-upload-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: var(--ma-bg-secondary, #f8fafc);
  border-radius: 6px;
  font-size: 0.875rem;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
}

.file-icon {
  color: var(--ma-text-muted, #94a3b8);
  flex-shrink: 0;
}

.file-name {
  color: var(--ma-text-main, #334155);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-size {
  color: var(--ma-text-muted, #94a3b8);
  font-size: 0.75rem;
  flex-shrink: 0;
}

.remove-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--ma-text-muted, #94a3b8);
  padding: 4px;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.remove-btn:hover {
  color: var(--ma-danger, #dc2626);
}
</style>
