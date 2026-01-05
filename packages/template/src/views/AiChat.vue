<template>
  <div class="ai-chat-container">
    <MaAiChat 
      :fill-container="true"
      :suggestions="suggestions"
      :models="models"
    />
  </div>
</template>

<script setup lang="ts">
import { MaAiChat } from 'my-admin-framework'

const suggestions = [
  'Explain quantum computing',
  'Write a Python function',
  'What are the benefits of Vue.js?',
  'Help me debug my code'
]

const models = [
  { label: 'Llama 3.2', value: 'llama3.2' },
  { label: 'Mistral', value: 'mistral' },
  { label: 'Codellama', value: 'codellama' }
]
</script>

<style scoped>
.ai-chat-container {
  flex: 1;
  display: flex;
  position: relative;
  min-height: 0;
  height: calc(100vh - 130px);
}
</style>
