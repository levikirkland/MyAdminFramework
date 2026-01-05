<template>
  <div class="media-view">
    <MaRow :gutter="[24, 24]">
      <MaCol :span="24">
        <MaCard title="Video Thumbnail Generator" collapsible>
          <p>Generates a thumbnail from a video URL at a specific timestamp (client-side).</p>
          
          <MaRow :gutter="[24, 24]">
            <MaCol :span="12">
              <label style="display: block; margin-bottom: 8px; font-weight: 500;">Remote MP4 (at 5s)</label>
              <MaVideoThumbnail 
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
                :time="5"
              />
            </MaCol>
            <MaCol :span="12">
              <label style="display: block; margin-bottom: 8px; font-weight: 500;">Remote MP4 (at 60s)</label>
              <MaVideoThumbnail 
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" 
                :time="60"
              />
            </MaCol>
          </MaRow>
        </MaCard>
      </MaCol>

      <MaCol :span="24">
        <MaCard title="Rich Text Editor (Pro)">
          <div style="margin-bottom: 16px; display: flex; gap: 16px;">
            <MaCheckbox v-model="spellcheckEnabled">Enable Spellcheck</MaCheckbox>
            <MaCheckbox v-model="aiEnabled">Enable AI</MaCheckbox>
          </div>
          <MaRichTextEditor 
            v-model="richTextContent" 
            placeholder="Start typing..." 
            :spellcheck="spellcheckEnabled"
            :ai-enabled="aiEnabled"
          />
          <div style="margin-top: 16px; padding: 16px; background: var(--ma-bg-secondary); border-radius: 4px;">
            <strong>Preview:</strong>
            <div v-html="richTextContent"></div>
          </div>
        </MaCard>
      </MaCol>
    </MaRow>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const spellcheckEnabled = ref(true)
const aiEnabled = ref(true)
const richTextContent = ref('<p>Hello <strong>World</strong>! This is the media editor.</p>')
</script>

<style scoped>
.media-view {
  padding: 24px;
}
</style>
