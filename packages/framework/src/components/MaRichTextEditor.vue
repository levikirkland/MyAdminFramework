<template>
  <div class="ma-rich-text-editor" :class="{ 'is-focused': isFocused, 'is-disabled': disabled }">
    <div v-if="editor" class="ma-editor-toolbar">
      <div class="toolbar-group">
        <button 
          class="toolbar-btn" 
          :class="{ 'is-active': editor.isActive('bold') }"
          @click="editor.chain().focus().toggleBold().run()"
          title="Bold"
        >
          <Bold :size="16" />
        </button>
        <button 
          class="toolbar-btn" 
          :class="{ 'is-active': editor.isActive('italic') }"
          @click="editor.chain().focus().toggleItalic().run()"
          title="Italic"
        >
          <Italic :size="16" />
        </button>
        <button 
          class="toolbar-btn" 
          :class="{ 'is-active': editor.isActive('strike') }"
          @click="editor.chain().focus().toggleStrike().run()"
          title="Strike"
        >
          <Strikethrough :size="16" />
        </button>
        <button 
          class="toolbar-btn" 
          :class="{ 'is-active': editor.isActive('underline') }"
          @click="editor.chain().focus().toggleUnderline().run()"
          title="Underline"
        >
          <UnderlineIcon :size="16" />
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <div class="toolbar-group">
        <button 
          class="toolbar-btn" 
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          title="H1"
        >
          <Heading1 :size="16" />
        </button>
        <button 
          class="toolbar-btn" 
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          title="H2"
        >
          <Heading2 :size="16" />
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <div class="toolbar-group">
        <button 
          class="toolbar-btn" 
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
          @click="editor.chain().focus().setTextAlign('left').run()"
          title="Align Left"
        >
          <AlignLeft :size="16" />
        </button>
        <button 
          class="toolbar-btn" 
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
          @click="editor.chain().focus().setTextAlign('center').run()"
          title="Align Center"
        >
          <AlignCenter :size="16" />
        </button>
        <button 
          class="toolbar-btn" 
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
          @click="editor.chain().focus().setTextAlign('right').run()"
          title="Align Right"
        >
          <AlignRight :size="16" />
        </button>
      </div>

      <div class="toolbar-divider"></div>

      <div class="toolbar-group">
        <button 
          class="toolbar-btn" 
          :class="{ 'is-active': editor.isActive('bulletList') }"
          @click="editor.chain().focus().toggleBulletList().run()"
          title="Bullet List"
        >
          <List :size="16" />
        </button>
        <button 
          class="toolbar-btn" 
          :class="{ 'is-active': editor.isActive('orderedList') }"
          @click="editor.chain().focus().toggleOrderedList().run()"
          title="Ordered List"
        >
          <ListOrdered :size="16" />
        </button>
      </div>

      <template v-if="aiEnabled">
        <div class="toolbar-divider"></div>
        <div class="toolbar-group">
          <button 
            class="toolbar-btn ai-btn" 
            @click="openAiModal"
            title="AI Refine"
          >
            <Sparkles :size="16" />
          </button>
        </div>
      </template>
    </div>

    <editor-content :editor="editor" class="ma-editor-content" />

    <MaModal v-model="showAiModal" title="AI Text Refinement" width="600px">
      <div class="ma-ai-modal-content">
        <div class="ma-ai-section">
          <label class="ma-ai-label">Selected Text / Context</label>
          <div class="ma-ai-context-preview">
            {{ selectedText || '(Empty document)' }}
          </div>
        </div>

        <div class="ma-ai-section">
          <label class="ma-ai-label">Instructions</label>
          <MaTextarea 
            v-model="aiPrompt" 
            placeholder="e.g., Fix grammar, Make it shorter, Translate to Spanish..." 
            :rows="3"
          />
        </div>

        <div v-if="aiResult" class="ma-ai-section">
          <label class="ma-ai-label">Result</label>
          <div class="ma-ai-result-preview">
            {{ aiResult }}
          </div>
        </div>
      </div>

      <template #footer>
        <div class="ma-ai-footer">
          <MaButton variant="ghost" @click="showAiModal = false">Cancel</MaButton>
          <MaButton 
            v-if="!aiResult" 
            variant="solid" 
            color="primary" 
            :loading="isAiLoading"
            :disabled="!aiPrompt"
            @click="runAi"
          >
            Generate
          </MaButton>
          <template v-else>
            <MaButton variant="outline" @click="aiResult = ''">Try Again</MaButton>
            <MaButton variant="solid" color="primary" @click="applyAiResult">Replace</MaButton>
          </template>
        </div>
      </template>
    </MaModal>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { 
  Bold, Italic, Strikethrough, Underline as UnderlineIcon,
  Heading1, Heading2, 
  AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, Sparkles
} from 'lucide-vue-next'
import MaModal from './MaModal.vue'
import MaButton from './MaButton.vue'
import MaTextarea from './MaTextarea.vue'
import { sanitizeHtml } from '../utils/security'

const props = withDefaults(defineProps<{
  modelValue?: string;
  disabled?: boolean;
  placeholder?: string;
  spellcheck?: boolean;
  aiEnabled?: boolean;
  aiEndpoint?: string;
  aiModel?: string;
}>(), {
  modelValue: '',
  disabled: false,
  spellcheck: true,
  aiEnabled: false,
  aiEndpoint: '/api/ollama/chat',
  aiModel: 'llama3'
})

const emit = defineEmits(['update:modelValue'])

const isFocused = ref(false)

const editor = useEditor({
  content: props.modelValue,
  editable: !props.disabled,
  editorProps: {
    attributes: {
      spellcheck: props.spellcheck ? 'true' : 'false',
    },
  },
  extensions: [
    StarterKit.configure({
      link: {
        openOnClick: false,
      },
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
  ],
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
  onFocus: () => {
    isFocused.value = true
  },
  onBlur: () => {
    isFocused.value = false
  },
})

watch(() => props.modelValue, (newValue) => {
  if (editor.value && newValue !== editor.value.getHTML()) {
    editor.value.commands.setContent(newValue, { emitUpdate: false })
  }
})

watch(() => props.disabled, (val) => {
  editor.value?.setEditable(!val)
})

watch(() => props.spellcheck, (val) => {
  editor.value?.view.dom.setAttribute('spellcheck', val ? 'true' : 'false')
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

// AI Logic
const showAiModal = ref(false)
const aiPrompt = ref('')
const aiResult = ref('')
const isAiLoading = ref(false)
const selectedText = ref('')

const openAiModal = () => {
  if (!editor.value) return
  
  const { from, to, empty } = editor.value.state.selection
  if (empty) {
    selectedText.value = editor.value.getText()
  } else {
    selectedText.value = editor.value.state.doc.textBetween(from, to, ' ')
  }
  
  aiPrompt.value = ''
  aiResult.value = ''
  showAiModal.value = true
}

const runAi = async () => {
  if (!aiPrompt.value) return
  isAiLoading.value = true
  
  try {
    const messages = [
      { role: 'system', content: 'You are a helpful writing assistant. Refine the text based on the user instructions. Return only the refined text.' },
      { role: 'user', content: `Context: "${selectedText.value}"\n\nInstructions: ${aiPrompt.value}` }
    ]

    const response = await fetch(props.aiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: props.aiModel,
        messages: messages,
        stream: false
      })
    })

    if (!response.ok) throw new Error('Failed to fetch response')

    const data = await response.json()
    const rawContent = data.message?.content || ''
    aiResult.value = sanitizeHtml(rawContent)
  } catch (error) {
    console.error(error)
    // Could show a toast here
  } finally {
    isAiLoading.value = false
  }
}

const applyAiResult = () => {
  if (!editor.value) return
  
  const { empty } = editor.value.state.selection
  
  if (empty && selectedText.value === editor.value.getText()) {
    // Replaced whole document
    editor.value.commands.setContent(aiResult.value)
  } else {
    // Replace selection
    editor.value.commands.insertContent(aiResult.value)
  }
  
  showAiModal.value = false
}
</script>

<style scoped>
.ma-rich-text-editor {
  border: 1px solid var(--ma-border);
  border-radius: 6px;
  background: var(--ma-bg-card);
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.ma-rich-text-editor.is-focused {
  border-color: var(--ma-primary);
  box-shadow: 0 0 0 3px var(--ma-primary-light);
}

.ma-rich-text-editor.is-disabled {
  opacity: 0.7;
  background: var(--ma-bg-secondary);
  pointer-events: none;
}

.ma-editor-toolbar {
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid var(--ma-border);
  background: var(--ma-bg-secondary);
  gap: 4px;
  flex-wrap: wrap;
}

.toolbar-group {
  display: flex;
  gap: 2px;
}

.toolbar-divider {
  width: 1px;
  height: 20px;
  background: var(--ma-border);
  margin: 0 6px;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 4px;
  color: var(--ma-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.toolbar-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: var(--ma-text-main);
}

.toolbar-btn.is-active {
  background: var(--ma-primary-light);
  color: var(--ma-primary);
}

.toolbar-btn.ai-btn {
  color: var(--ma-primary);
}

.toolbar-btn.ai-btn:hover {
  background: var(--ma-primary-light);
}

.ma-editor-content {
  padding: 16px;
  min-height: 150px;
}

/* AI Modal Styles */
.ma-ai-modal-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ma-ai-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ma-ai-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--ma-text-secondary);
}

.ma-ai-context-preview,
.ma-ai-result-preview {
  padding: 12px;
  background: var(--ma-bg-secondary);
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.5;
  max-height: 150px;
  overflow-y: auto;
  white-space: pre-wrap;
  border: 1px solid var(--ma-border);
}

.ma-ai-result-preview {
  background: var(--ma-bg-card);
  border-color: var(--ma-primary);
}

.ma-ai-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;
}

/* Tiptap Styles */
:deep(.ProseMirror) {
  outline: none;
  min-height: 150px;
  color: var(--ma-text-main);
  font-size: 0.95rem;
  line-height: 1.6;
}

:deep(.ProseMirror p) {
  margin-bottom: 0.75em;
}

:deep(.ProseMirror h1) {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5em;
}

:deep(.ProseMirror h2) {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5em;
}

:deep(.ProseMirror ul),
:deep(.ProseMirror ol) {
  padding-left: 1.5em;
  margin-bottom: 0.75em;
}

:deep(.ProseMirror blockquote) {
  border-left: 3px solid var(--ma-border);
  padding-left: 1em;
  margin-left: 0;
  color: var(--ma-text-muted);
}
</style>
