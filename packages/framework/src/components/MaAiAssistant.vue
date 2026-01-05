<template>
  <div class="ma-ai-assistant" :class="{ 'is-open': isOpen }">
    <!-- Chat Window -->
    <transition name="ma-slide-up">
      <div v-if="isOpen" class="ma-ai-window">
        <MaCard class="ma-ai-card" shadow="always" :bordered="true">
          <template #header>
            <div class="ma-ai-header">
              <div class="ma-ai-title">
                <MaIcon name="Bot" size="20" class="mr-2" />
                <span style="margin-left: 8px;">{{ title }}</span>
              </div>
              <MaButton variant="ghost" size="small" icon="X" @click="toggleOpen" />
            </div>
          </template>
          
          <div class="ma-ai-messages" ref="messagesContainer">
            <div 
              v-for="(msg, index) in messages" 
              :key="index"
              class="ma-ai-message"
              :class="msg.role"
            >
              <div class="ma-ai-avatar">
                <MaIcon v-if="msg.role === 'assistant'" name="Bot" size="16" />
                <MaIcon v-else name="User" size="16" />
              </div>
              <div class="ma-ai-bubble">
                {{ msg.content }}
              </div>
            </div>
            <div v-if="isTyping" class="ma-ai-message assistant">
               <div class="ma-ai-avatar">
                <MaIcon name="Bot" size="16" />
              </div>
              <div class="ma-ai-bubble typing">
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          </div>

          <template #footer>
            <div class="ma-ai-input-area">
              <MaInput 
                v-model="inputValue" 
                placeholder="Ask AI anything..." 
                @keydown.enter="sendMessage"
                :disabled="isTyping"
                style="flex: 1;"
              />
              <MaButton 
                variant="solid" 
                color="primary" 
                icon="Send" 
                :disabled="!inputValue.trim() || isTyping"
                @click="sendMessage"
              />
            </div>
          </template>
        </MaCard>
      </div>
    </transition>

    <!-- Floating Toggle Button -->
    <button class="ma-ai-toggle" @click="toggleOpen">
      <transition name="ma-scale" mode="out-in">
        <MaIcon v-if="isOpen" name="ChevronDown" size="24" />
        <MaIcon v-else name="Sparkles" size="24" />
      </transition>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import MaCard from './MaCard.vue'
import MaButton from './MaButton.vue'
import MaInput from './MaInput.vue'
import MaIcon from './MaIcon.vue'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

const props = withDefaults(defineProps<{
  title?: string
  welcomeMessage?: string
  model?: string
  endpoint?: string
  systemPrompt?: string
}>(), {
  title: 'AI Assistant',
  welcomeMessage: 'Hello! How can I help you today?',
  model: 'llama3',
  endpoint: '/api/ollama/chat',
  systemPrompt: ''
})

const isOpen = ref(false)
const inputValue = ref('')
const isTyping = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

const messages = ref<Message[]>([
  { role: 'assistant', content: props.welcomeMessage }
])

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const sendMessage = async () => {
  if (!inputValue.value.trim() || isTyping.value) return

  // Add user message
  messages.value.push({ role: 'user', content: inputValue.value })
  inputValue.value = ''
  scrollToBottom()

  // Simulate AI response
  isTyping.value = true
  
  try {
    const requestMessages = messages.value.map(m => ({ role: m.role, content: m.content }))
    
    if (props.systemPrompt) {
      requestMessages.unshift({ role: 'system', content: props.systemPrompt })
    }

    const response = await fetch(props.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: props.model,
        messages: requestMessages,
        stream: false
      })
    })

    if (!response.ok) throw new Error('Failed to fetch response')

    const data = await response.json()
    
    messages.value.push({ 
      role: 'assistant', 
      content: data.message?.content || 'Sorry, I could not understand that.' 
    })
  } catch (error) {
    console.error(error)
    messages.value.push({ 
      role: 'assistant', 
      content: 'Sorry, I encountered an error connecting to the AI service. Please ensure Ollama is running.' 
    })
  } finally {
    isTyping.value = false
    scrollToBottom()
  }
}

watch(isOpen, (val) => {
  if (val) {
    scrollToBottom()
  }
})
</script>

<style scoped>
.ma-ai-assistant {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-family: inherit;
}

.ma-ai-window {
  margin-bottom: 16px;
  width: 380px;
  max-width: calc(100vw - 48px);
  height: 500px;
  max-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
}

.ma-ai-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

/* Deep selector to target MaCard structure if needed, but MaCard slots help */
:deep(.ma-card-body) {
  flex: 1;
  overflow: hidden;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.ma-ai-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.ma-ai-title {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
}

.ma-ai-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #f9fafb;
}

.ma-ai-message {
  display: flex;
  gap: 8px;
  max-width: 85%;
}

.ma-ai-message.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.ma-ai-message.assistant {
  align-self: flex-start;
}

.ma-ai-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #4b5563;
}

.ma-ai-message.assistant .ma-ai-avatar {
  background-color: var(--ma-primary);
  color: white;
}

.ma-ai-bubble {
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
  background-color: white;
  border: 1px solid #e5e7eb;
  color: #1f2937;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.ma-ai-message.user .ma-ai-bubble {
  background-color: var(--ma-primary);
  color: white;
  border-color: transparent;
  border-bottom-right-radius: 4px;
}

.ma-ai-message.assistant .ma-ai-bubble {
  border-bottom-left-radius: 4px;
}

.ma-ai-input-area {
  display: flex;
  gap: 8px;
  padding: 4px 0;
}

.ma-ai-toggle {
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: var(--ma-primary);
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 82, 204, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, background-color 0.2s;
}

.ma-ai-toggle:hover {
  transform: scale(1.05);
  background-color: var(--ma-primary-hover, #0747a6);
}

.ma-ai-toggle:active {
  transform: scale(0.95);
}

/* Typing animation */
.typing {
  display: flex;
  gap: 4px;
  padding: 12px 16px;
}

.typing span {
  width: 4px;
  height: 4px;
  background-color: #9ca3af;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.typing span:nth-child(1) { animation-delay: -0.32s; }
.typing span:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

/* Transitions */
.ma-slide-up-enter-active,
.ma-slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.ma-slide-up-enter-from,
.ma-slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.ma-scale-enter-active,
.ma-scale-leave-active {
  transition: all 0.2s ease;
}

.ma-scale-enter-from,
.ma-scale-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

/* Dark mode support */
:global(.dark) .ma-ai-card,
:global(.dark) .ma-ai-bubble {
  background-color: #1f2937;
  border-color: #374151;
  color: #e5e7eb;
}

:global(.dark) .ma-ai-messages {
  background-color: #111827;
}

:global(.dark) .ma-ai-avatar {
  background-color: #374151;
  color: #9ca3af;
}

:global(.dark) .ma-ai-message.assistant .ma-ai-avatar {
  background-color: var(--ma-primary);
  color: white;
}

:global(.dark) .ma-ai-message.user .ma-ai-bubble {
  color: white;
}
</style>
