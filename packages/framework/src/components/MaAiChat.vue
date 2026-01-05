<template>
  <div class="ai-chat-screen" :class="{ 'fill-container': fillContainer }">
    <!-- Sidebar with chat sessions -->
    <div class="ai-chat-sidebar" :class="{ 'collapsed': sidebarCollapsed }">
      <div class="sidebar-header">
        <MaButton 
          v-if="!sidebarCollapsed"
          variant="solid" 
          color="primary" 
          @click="createNewChat"
          class="new-chat-btn"
        >
          <MaIcon name="Plus" size="16" />
          <span style="margin-left: 8px;">New Chat</span>
        </MaButton>
        <MaButton 
          variant="ghost" 
          size="small"
          @click="toggleSidebar"
          class="toggle-sidebar-btn"
        >
          <MaIcon :name="sidebarCollapsed ? 'ChevronRight' : 'ChevronLeft'" size="16" />
        </MaButton>
      </div>

      <div v-if="!sidebarCollapsed" class="chat-sessions">
        <div class="sessions-group">
          <div class="group-label">Today</div>
          <div 
            v-for="session in todaySessions" 
            :key="session.id"
            class="session-item"
            :class="{ active: session.id === activeSessionId }"
            @click="switchSession(session.id)"
          >
            <MaIcon name="MessageSquare" size="16" />
            <span class="session-title">{{ session.title }}</span>
            <MaButton 
              variant="ghost" 
              size="small"
              @click.stop="deleteSession(session.id)"
              class="delete-btn"
            >
              <MaIcon name="Trash2" size="14" />
            </MaButton>
          </div>
        </div>

        <div v-if="yesterdaySessions.length" class="sessions-group">
          <div class="group-label">Yesterday</div>
          <div 
            v-for="session in yesterdaySessions" 
            :key="session.id"
            class="session-item"
            :class="{ active: session.id === activeSessionId }"
            @click="switchSession(session.id)"
          >
            <MaIcon name="MessageSquare" size="16" />
            <span class="session-title">{{ session.title }}</span>
            <MaButton 
              variant="ghost" 
              size="small"
              @click.stop="deleteSession(session.id)"
              class="delete-btn"
            >
              <MaIcon name="Trash2" size="14" />
            </MaButton>
          </div>
        </div>

        <div v-if="olderSessions.length" class="sessions-group">
          <div class="group-label">Previous 7 Days</div>
          <div 
            v-for="session in olderSessions" 
            :key="session.id"
            class="session-item"
            :class="{ active: session.id === activeSessionId }"
            @click="switchSession(session.id)"
          >
            <MaIcon name="MessageSquare" size="16" />
            <span class="session-title">{{ session.title }}</span>
            <MaButton 
              variant="ghost" 
              size="small"
              @click.stop="deleteSession(session.id)"
              class="delete-btn"
            >
              <MaIcon name="Trash2" size="14" />
            </MaButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Main chat area -->
    <div class="ai-chat-main">
      <!-- Header with model selector -->
      <div class="chat-header">
        <div class="model-selector">
          <MaIcon name="Brain" size="20" />
          <MaSelect 
            v-model="selectedModel" 
            :options="modelOptions"
            placeholder="Select Model"
            class="model-dropdown"
          />
        </div>
        <div class="header-actions">
          <MaButton variant="ghost" size="small" @click="showSettings = true">
            <MaIcon name="Settings" size="18" />
          </MaButton>
        </div>
      </div>

      <!-- Messages area -->
      <div class="chat-messages" ref="messagesContainer">
        <div v-if="!currentSession?.messages.length" class="empty-state">
          <MaIcon name="Sparkles" size="64" class="empty-icon" />
          <h2>Start a conversation</h2>
          <p>Ask me anything - I'm here to help!</p>
          <div class="suggestion-chips">
            <div 
              v-for="suggestion in suggestions" 
              :key="suggestion"
              class="suggestion-chip"
              @click="sendSuggestion(suggestion)"
            >
              {{ suggestion }}
            </div>
          </div>
        </div>

        <div v-else class="messages-list">
          <div 
            v-for="(msg, index) in currentSession?.messages" 
            :key="index"
            class="message-wrapper"
            :class="msg.role"
          >
            <div class="message-content">
              <div class="message-avatar">
                <MaAvatar 
                  v-if="msg.role === 'assistant'"
                  :size="32"
                  class="ai-avatar"
                >
                  <MaIcon name="Bot" size="18" />
                </MaAvatar>
                <MaAvatar 
                  v-else
                  :size="32"
                  class="user-avatar"
                >
                  <MaIcon name="User" size="18" />
                </MaAvatar>
              </div>
              <div class="message-body">
                <div class="message-header">
                  <span class="message-role">{{ msg.role === 'assistant' ? 'AI Assistant' : 'You' }}</span>
                  <span class="message-time">{{ formatTime(msg.timestamp) }}</span>
                </div>
                <div class="message-text" v-html="renderMarkdown(msg.content)"></div>
                <div class="message-actions">
                  <MaButton variant="ghost" size="small" @click="copyMessage(msg.content)">
                    <MaIcon name="Copy" size="14" />
                  </MaButton>
                  <MaButton v-if="msg.role === 'assistant'" variant="ghost" size="small" @click="regenerateResponse(index)">
                    <MaIcon name="RefreshCw" size="14" />
                  </MaButton>
                </div>
              </div>
            </div>
          </div>

          <div v-if="isTyping" class="message-wrapper assistant">
            <div class="message-content">
              <div class="message-avatar">
                <MaAvatar :size="32" class="ai-avatar">
                  <MaIcon name="Bot" size="18" />
                </MaAvatar>
              </div>
              <div class="message-body">
                <div class="message-header">
                  <span class="message-role">AI Assistant</span>
                </div>
                <div class="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input area -->
      <div class="chat-input-area">
        <div class="input-wrapper">
          <textarea 
            v-model="inputMessage"
            @keydown.enter.exact.prevent="sendMessage"
            @keydown.enter.shift.exact="inputMessage += '\n'"
            placeholder="Type your message... (Shift+Enter for new line)"
            class="message-input"
            rows="1"
            ref="messageInput"
          ></textarea>
          <div class="input-actions">
            <MaButton 
              variant="ghost" 
              size="small"
              @click="attachFile"
              class="attach-btn"
            >
              <MaIcon name="Paperclip" size="18" />
            </MaButton>
            <MaButton 
              variant="solid" 
              color="primary"
              @click="sendMessage"
              :disabled="!inputMessage.trim() || isTyping"
              class="send-btn"
            >
              <MaIcon name="Send" size="18" />
            </MaButton>
          </div>
        </div>
        <div class="input-footer">
          <small>{{ selectedModel }} • {{ tokenCount }} tokens</small>
        </div>
      </div>
    </div>

    <!-- Settings Modal -->
    <MaModal v-model="showSettings" title="Chat Settings" width="600px">
      <div class="settings-content">
        <MaFormGroup label="Temperature">
          <div class="slider-group">
            <input 
              type="range" 
              v-model.number="settings.temperature" 
              min="0" 
              max="2" 
              step="0.1"
              class="temperature-slider"
            />
            <span class="slider-value">{{ settings.temperature }}</span>
          </div>
          <small>Controls randomness: Lower is more focused, higher is more creative</small>
        </MaFormGroup>

        <MaFormGroup label="Max Tokens">
          <MaInput 
            v-model.number="settings.maxTokens" 
            type="number"
            placeholder="4096"
          />
          <small>Maximum length of the response</small>
        </MaFormGroup>

        <MaFormGroup label="System Prompt">
          <textarea 
            v-model="settings.systemPrompt" 
            placeholder="You are a helpful assistant..."
            class="system-prompt-input"
            rows="4"
          ></textarea>
        </MaFormGroup>

        <MaFormGroup label="API Endpoint">
          <MaInput 
            v-model="settings.endpoint" 
            placeholder="http://127.0.0.1:9000/v1/chat/completions"
          />
          <small>Local inference API endpoint</small>
        </MaFormGroup>
      </div>

      <template #footer>
        <div style="display: flex; gap: 8px; justify-content: flex-end;">
          <MaButton variant="outline" @click="showSettings = false">Cancel</MaButton>
          <MaButton variant="solid" color="primary" @click="saveSettings">Save</MaButton>
        </div>
      </template>
    </MaModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted } from 'vue'
import MaButton from './MaButton.vue'
import MaIcon from './MaIcon.vue'
import MaSelect from './MaSelect.vue'
import MaModal from './MaModal.vue'
import MaFormGroup from './MaFormGroup.vue'
import MaInput from './MaInput.vue'
import MaAvatar from './MaAvatar.vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

type RequestHeaders = Record<string, string>

const props = defineProps<{
  endpoint?: string
  model?: string
  systemPrompt?: string
  temperature?: number
  maxTokens?: number
  headers?: RequestHeaders
  fillContainer?: boolean
}>()

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

interface ChatSession {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

interface Settings {
  temperature: number
  maxTokens: number
  systemPrompt: string
  endpoint: string
}

// State
const sidebarCollapsed = ref(false)
const activeSessionId = ref<string>('')
const sessions = ref<ChatSession[]>([])
const inputMessage = ref('')
const isTyping = ref(false)
const showSettings = ref(false)
const messagesContainer = ref<HTMLElement>()
const messageInput = ref<HTMLTextAreaElement>()

// Computed from props
const fillContainer = computed(() => props.fillContainer ?? true)

const selectedModel = ref(props.model ?? 'llama3.2')
const modelOptions = [
  { label: 'Llama 3.2', value: 'llama3.2' },
  { label: 'Llama 3.1', value: 'llama3.1' },
  { label: 'Mistral', value: 'mistral' },
  { label: 'Codellama', value: 'codellama' },
  { label: 'Phi-3', value: 'phi3' },
  { label: 'Gemma 2', value: 'gemma2' },
]

const settings = ref<Settings>({
  temperature: props.temperature ?? 0.7,
  maxTokens: props.maxTokens ?? 4096,
  systemPrompt: props.systemPrompt ?? 'You are a helpful AI assistant.',
  endpoint: props.endpoint ?? 'http://127.0.0.1:9000/v1/chat/completions'
})

const suggestions = [
  'Explain quantum computing',
  'Write a Python function to sort a list',
  'What are the benefits of Vue.js?',
  'Help me debug my code'
]

// Computed
const currentSession = computed(() => 
  sessions.value.find(s => s.id === activeSessionId.value)
)

const todaySessions = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return sessions.value.filter(s => new Date(s.updatedAt) >= today)
})

const yesterdaySessions = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  return sessions.value.filter(s => {
    const date = new Date(s.updatedAt)
    return date >= yesterday && date < today
  })
})

const olderSessions = computed(() => {
  const yesterday = new Date()
  yesterday.setHours(0, 0, 0, 0)
  yesterday.setDate(yesterday.getDate() - 1)
  const weekAgo = new Date(yesterday)
  weekAgo.setDate(weekAgo.getDate() - 7)
  return sessions.value.filter(s => {
    const date = new Date(s.updatedAt)
    return date < yesterday && date >= weekAgo
  })
})

const tokenCount = computed(() => {
  // Rough estimate: ~4 chars per token
  return Math.ceil(inputMessage.value.length / 4)
})

// Methods
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const createNewChat = () => {
  const newSession: ChatSession = {
    id: Date.now().toString(),
    title: 'New Chat',
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
  sessions.value.unshift(newSession)
  activeSessionId.value = newSession.id
}

const switchSession = (sessionId: string) => {
  activeSessionId.value = sessionId
}

const deleteSession = (sessionId: string) => {
  sessions.value = sessions.value.filter(s => s.id !== sessionId)
  if (activeSessionId.value === sessionId) {
    activeSessionId.value = sessions.value[0]?.id || ''
  }
}

const sendMessage = async () => {
  if (!inputMessage.value.trim() || isTyping.value) return

  const message = inputMessage.value.trim()
  inputMessage.value = ''

  // Create session if none exists
  if (!currentSession.value) {
    createNewChat()
  }

  // Add user message
  const userMessage: Message = {
    role: 'user',
    content: message,
    timestamp: new Date()
  }
  currentSession.value!.messages.push(userMessage)

  // Update session title from first message
  if (currentSession.value!.messages.length === 1) {
    currentSession.value!.title = message.slice(0, 50) + (message.length > 50 ? '...' : '')
  }

  currentSession.value!.updatedAt = new Date()

  // Scroll to bottom
  await nextTick()
  scrollToBottom()

  // Send to API
  isTyping.value = true
  try {
    const response = await sendToAPI()
    const assistantMessage: Message = {
      role: 'assistant',
      content: response,
      timestamp: new Date()
    }
    currentSession.value!.messages.push(assistantMessage)
  } catch (error) {
    const errorMessage: Message = {
      role: 'assistant',
      content: 'Sorry, I encountered an error. Please check your API endpoint and try again.',
      timestamp: new Date()
    }
    currentSession.value!.messages.push(errorMessage)
  } finally {
    isTyping.value = false
    await nextTick()
    scrollToBottom()
  }
}

const sendSuggestion = (suggestion: string) => {
  inputMessage.value = suggestion
  sendMessage()
}

const sendToAPI = async (): Promise<string> => {
  if (!currentSession.value) throw new Error('No active chat session')

  const payload = {
    model: selectedModel.value,
    messages: [
      { role: 'system', content: settings.value.systemPrompt },
      ...currentSession.value.messages.map(m => ({ role: m.role, content: m.content }))
    ],
    temperature: settings.value.temperature,
    max_tokens: settings.value.maxTokens,
    stream: false
  }

  const response = await fetch(settings.value.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(props.headers ?? {})
    },
    body: JSON.stringify(payload)
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    const msg = data?.error?.message || data?.message || `HTTP ${response.status}`
    throw new Error(msg)
  }

  const content =
    data?.choices?.[0]?.message?.content ??
    data?.message?.content ??
    data?.response ??
    data?.output_text

  if (typeof content === 'string' && content.length) return content
  return typeof data === 'string' ? data : JSON.stringify(data, null, 2)
}

const regenerateResponse = async (index: number) => {
  if (!currentSession.value) return
  
  // Remove the assistant message and regenerate
  const userMessage = currentSession.value.messages[index - 1]
  if (!userMessage) return
  currentSession.value.messages = currentSession.value.messages.slice(0, index)
  
  isTyping.value = true
  try {
    const response = await sendToAPI()
    const assistantMessage: Message = {
      role: 'assistant',
      content: response,
      timestamp: new Date()
    }
    currentSession.value.messages.push(assistantMessage)
  } finally {
    isTyping.value = false
    await nextTick()
    scrollToBottom()
  }
}

const copyMessage = (content: string) => {
  navigator.clipboard.writeText(content)
  // You could add a toast notification here
}

const attachFile = () => {
  // Implement file attachment logic
  alert('File attachment coming soon!')
}

const renderMarkdown = (content: string): string => {
  const html = marked.parse(content, { breaks: true })
  return DOMPurify.sanitize(html as string)
}

const formatTime = (date: Date): string => {
  const now = new Date()
  const diff = now.getTime() - new Date(date).getTime()
  const minutes = Math.floor(diff / 60000)
  
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  
  return new Date(date).toLocaleDateString()
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const saveSettings = () => {
  showSettings.value = false
  // Save to localStorage
  localStorage.setItem('ai-chat-settings', JSON.stringify(settings.value))
}

// Auto-resize textarea
watch(inputMessage, () => {
  if (messageInput.value) {
    messageInput.value.style.height = 'auto'
    messageInput.value.style.height = messageInput.value.scrollHeight + 'px'
  }
})

// Load settings and sessions from localStorage
onMounted(() => {
  const savedSettings = localStorage.getItem('ai-chat-settings')
  if (savedSettings) {
    settings.value = { ...settings.value, ...JSON.parse(savedSettings) }
  }

  // Props override persisted settings
  if (props.endpoint) settings.value.endpoint = props.endpoint
  if (typeof props.temperature === 'number') settings.value.temperature = props.temperature
  if (typeof props.maxTokens === 'number') settings.value.maxTokens = props.maxTokens
  if (props.systemPrompt) settings.value.systemPrompt = props.systemPrompt
  if (props.model) selectedModel.value = props.model

  const savedSessions = localStorage.getItem('ai-chat-sessions')
  if (savedSessions) {
    sessions.value = JSON.parse(savedSessions)
    if (sessions.value.length > 0) {
      activeSessionId.value = sessions.value[0]?.id || ''
    }
  } else {
    createNewChat()
  }
})

// Save sessions to localStorage
watch(sessions, (newSessions) => {
  localStorage.setItem('ai-chat-sessions', JSON.stringify(newSessions))
}, { deep: true })
</script>

<style scoped>
.ai-chat-screen {
  display: flex;
  height: 100%;
  min-height: 0;
  background: var(--ma-bg-page);
  border-radius: 8px;
  overflow: hidden;
}

.ai-chat-screen.fill-container {
  position: absolute;
  inset: 0;
  height: auto;
  border-radius: 0;
}

/* Sidebar */
.ai-chat-sidebar {
  width: 280px;
  background: var(--ma-bg-card);
  border-right: 1px solid var(--ma-border);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
}

.ai-chat-sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid var(--ma-border);
  display: flex;
  gap: 8px;
  align-items: center;
}

.new-chat-btn {
  flex: 1;
}

.chat-sessions {
  flex: 1;
  overflow-y: auto;
  padding: 16px 8px;
}

.sessions-group {
  margin-bottom: 24px;
}

.group-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--ma-text-secondary);
  padding: 0 8px;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.session-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
  position: relative;
  color: var(--ma-text-main);
}

.session-item:hover {
  background: var(--ma-bg-secondary);
}

.session-item.active {
  background: var(--ma-primary-light);
  color: var(--ma-primary);
}

.session-title {
  flex: 1;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.delete-btn {
  opacity: 0;
  transition: opacity 0.2s;
}

.session-item:hover .delete-btn {
  opacity: 1;
}

/* Main chat area */
.ai-chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--ma-bg-card);
}

.chat-header {
  padding: 16px 24px;
  border-bottom: 1px solid var(--ma-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.model-selector {
  display: flex;
  align-items: center;
  gap: 12px;
}

.model-dropdown {
  min-width: 200px;
}

.header-actions {
  display: flex;
  gap: 8px;
}

/* Messages */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: var(--ma-text-secondary);
}

.empty-icon {
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state h2 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--ma-text-main);
}

.empty-state p {
  font-size: 16px;
  margin-bottom: 24px;
}

.suggestion-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  max-width: 600px;
}

.suggestion-chip {
  padding: 8px 16px;
  background: var(--ma-bg-secondary);
  border: 1px solid var(--ma-border);
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  color: var(--ma-text-main);
}

.suggestion-chip:hover {
  background: var(--ma-primary-light);
  border-color: var(--ma-primary);
  color: var(--ma-primary);
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.message-wrapper {
  display: flex;
}

.message-wrapper.user {
  justify-content: flex-end;
}

.message-content {
  display: flex;
  gap: 12px;
  max-width: 80%;
}

.message-wrapper.user .message-content {
  flex-direction: row-reverse;
}

.message-avatar {
  flex-shrink: 0;
}

.ai-avatar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.user-avatar {
  background: var(--ma-primary);
  color: white;
}

.message-body {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.message-role {
  font-weight: 600;
  font-size: 13px;
  color: var(--ma-text-main);
}

.message-time {
  font-size: 12px;
  color: var(--ma-text-secondary);
}

.message-text {
  background: var(--ma-bg-secondary);
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--ma-text-main);
  word-wrap: break-word;
}

.message-wrapper.user .message-text {
  background: var(--ma-primary);
  color: white;
}

.message-text :deep(pre) {
  background: rgba(0, 0, 0, 0.1);
  padding: 12px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 8px 0;
}

.message-text :deep(code) {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
}

.message-text :deep(p) {
  margin: 0 0 8px 0;
}

.message-text :deep(p:last-child) {
  margin-bottom: 0;
}

.message-actions {
  display: flex;
  gap: 4px;
  margin-top: 6px;
  opacity: 0;
  transition: opacity 0.2s;
}

.message-wrapper:hover .message-actions {
  opacity: 1;
}

/* Typing indicator */
.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 12px 16px;
  background: var(--ma-bg-secondary);
  border-radius: 12px;
  width: fit-content;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background: var(--ma-text-secondary);
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
}

/* Input area */
.chat-input-area {
  border-top: 1px solid var(--ma-border);
  padding: 16px 24px;
  background: var(--ma-bg-card);
}

.input-wrapper {
  display: flex;
  gap: 8px;
  align-items: flex-end;
  background: var(--ma-bg-secondary);
  border: 1px solid var(--ma-border);
  border-radius: 12px;
  padding: 12px;
}

.message-input {
  flex: 1;
  border: none;
  background: transparent;
  resize: none;
  font-size: 14px;
  font-family: inherit;
  line-height: 1.5;
  max-height: 200px;
  overflow-y: auto;
  outline: none;
  color: var(--ma-text-main);
}

.message-input::placeholder {
  color: var(--ma-text-muted);
}

.input-actions {
  display: flex;
  gap: 4px;
}

.input-footer {
  margin-top: 8px;
  text-align: center;
  color: var(--ma-text-secondary);
}

/* Settings */
.settings-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.slider-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.temperature-slider {
  flex: 1;
  height: 4px;
  border-radius: 2px;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  background: var(--ma-border);
}

.temperature-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--ma-primary);
  cursor: pointer;
}

.slider-value {
  font-weight: 600;
  min-width: 30px;
  text-align: right;
  color: var(--ma-text-main);
}

.system-prompt-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--ma-border);
  border-radius: 6px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  outline: none;
  background: var(--ma-bg-secondary);
  color: var(--ma-text-main);
}

.system-prompt-input:focus {
  border-color: var(--ma-primary);
}

/* Responsive */
@media (max-width: 768px) {
  .ai-chat-sidebar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
    transform: translateX(-100%);
  }

  .ai-chat-sidebar:not(.collapsed) {
    transform: translateX(0);
  }

  .message-content {
    max-width: 90%;
  }
}
</style>
