<template>
  <div class="ai-chat-container">
    <MaAiChat :fill-container="true" />
  </div>
</template>

<script setup lang="ts">
import { MaAiChat } from 'my-admin-framework'
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
