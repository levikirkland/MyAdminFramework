<template>
  <div class="ai-chat-container">
    <MaAiChat 
      :fill-container="true"
      :suggestions="suggestions"
      :models="models"
      @send-to-timeline="handleSendToTimeline"
      @send-to-research="handleSendToResearch"
    />

    <!-- Timeline Modal -->
    <MaModal v-model="timelineModalVisible" title="Add to Timeline" size="medium">
      <div v-if="selectedMessage" style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <label style="font-weight: 600; margin-bottom: 8px; display: block;">Date</label>
          <MaInput v-model="timelineForm.date" type="date" placeholder="Select date" />
        </div>
        <div>
          <label style="font-weight: 600; margin-bottom: 8px; display: block;">Title</label>
          <MaInput v-model="timelineForm.title" placeholder="Event title" />
        </div>
        <div>
          <label style="font-weight: 600; margin-bottom: 8px; display: block;">Description</label>
          <MaInput v-model="timelineForm.description" type="textarea" placeholder="Event description" />
        </div>
        <div>
          <label style="font-weight: 600; margin-bottom: 8px; display: block;">Color</label>
          <MaSelect 
            v-model="timelineForm.color" 
            :options="colorOptions"
            placeholder="Select color"
          />
        </div>
      </div>
      <template #footer>
        <MaButton @click="timelineModalVisible = false" variant="outline">Cancel</MaButton>
        <MaButton @click="addToTimeline" color="primary">Add to Timeline</MaButton>
      </template>
    </MaModal>

    <!-- Research Table Modal -->
    <MaModal v-model="researchModalVisible" title="Add to Research" size="large">
      <div v-if="selectedMessage" style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <label style="font-weight: 600; margin-bottom: 8px; display: block;">Category</label>
          <MaSelect 
            v-model="researchForm.category" 
            :options="researchCategories"
            placeholder="Select category"
          />
        </div>
        <div>
          <label style="font-weight: 600; margin-bottom: 8px; display: block;">Key Findings</label>
          <MaInput v-model="researchForm.findings" type="textarea" placeholder="Summarize key findings" />
        </div>
        <div style="padding: 12px; background-color: var(--ma-bg-secondary); border-radius: 8px; max-height: 200px; overflow-y: auto;">
          <div style="font-weight: 600; margin-bottom: 8px;">Source Content:</div>
          <div style="font-size: 12px; color: var(--ma-text-secondary); white-space: pre-wrap; word-break: break-word;">{{ selectedMessage.content }}</div>
        </div>
      </div>
      <template #footer>
        <MaButton @click="researchModalVisible = false" variant="outline">Cancel</MaButton>
        <MaButton @click="addToResearch" color="primary">Add to Research Table</MaButton>
      </template>
    </MaModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MaAiChat, MaModal, MaInput, MaSelect, MaButton } from 'my-admin-framework'

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

const colorOptions = [
  { label: 'Primary', value: 'primary' },
  { label: 'Success', value: 'success' },
  { label: 'Warning', value: 'warning' },
  { label: 'Danger', value: 'danger' },
  { label: 'Info', value: 'info' }
]

const researchCategories = [
  { label: 'Technical Research', value: 'technical' },
  { label: 'Business Analysis', value: 'business' },
  { label: 'Market Research', value: 'market' },
  { label: 'Competitor Analysis', value: 'competitor' },
  { label: 'User Research', value: 'user' }
]

const timelineModalVisible = ref(false)
const researchModalVisible = ref(false)
const selectedMessage = ref<any>(null)

const timelineForm = ref({
  date: '',
  title: '',
  description: '',
  color: 'primary'
})

const researchForm = ref({
  category: '',
  findings: ''
})

const researchData = ref<any[]>([])

const handleSendToTimeline = (message: any) => {
  selectedMessage.value = message
  timelineForm.value = {
    date: new Date().toISOString().split('T')[0] ?? '',
    title: '',
    description: '',
    color: 'primary'
  }
  timelineModalVisible.value = true
}

const handleSendToResearch = (message: any) => {
  selectedMessage.value = message
  researchForm.value = {
    category: '',
    findings: ''
  }
  researchModalVisible.value = true
}

const addToTimeline = () => {
  // Emit event or call parent function to add to timeline
  console.log('Adding to timeline:', timelineForm.value)
  timelineModalVisible.value = false
}

const addToResearch = () => {
  // Add to research table
  const newRow = {
    id: researchData.value.length + 1,
    category: researchForm.value.category,
    findings: researchForm.value.findings,
    source: selectedMessage.value.content.substring(0, 100) + '...',
    dateAdded: new Date().toLocaleDateString()
  }
  researchData.value.push(newRow)
  console.log('Adding to research:', newRow)
  researchModalVisible.value = false
}
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
