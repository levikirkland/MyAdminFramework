<template>
  <Teleport to="body">
    <Transition name="cmd-fade">
      <div v-if="isOpen" class="ma-command-overlay" @click="close">
        <div class="ma-command-modal" @click.stop>
          <div class="ma-command-search">
            <Search :size="20" class="search-icon" />
            <input 
              ref="inputRef"
              v-model="query"
              type="text" 
              placeholder="Type a command or search..."
              @keydown.down.prevent="navigate(1)"
              @keydown.up.prevent="navigate(-1)"
              @keydown.enter.prevent="execute"
              @keydown.esc="close"
            />
            <div class="kbd-hint">ESC</div>
          </div>
          
          <div class="ma-command-list" v-if="filteredGroups.length > 0">
            <div v-for="group in filteredGroups" :key="group.name" class="ma-command-group">
              <div class="group-title">{{ group.name }}</div>
              <div 
                v-for="item in group.items" 
                :key="item.id"
                class="ma-command-item"
                :class="{ 'is-active': activeId === item.id }"
                @click="executeItem(item)"
                @mouseenter="activeId = item.id"
              >
                <component :is="item.icon" v-if="item.icon" :size="16" class="item-icon" />
                <span class="item-label">{{ item.label }}</span>
                <span v-if="item.shortcut" class="item-shortcut">{{ item.shortcut }}</span>
              </div>
            </div>
          </div>
          
          <div v-else class="ma-command-empty">
            No results found.
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { Search } from 'lucide-vue-next'

export interface CommandItem {
  id: string
  label: string
  icon?: any
  shortcut?: string
  action: () => void
}

export interface CommandGroup {
  name: string
  items: CommandItem[]
}

const props = defineProps<{
  groups: CommandGroup[]
}>()

const isOpen = ref(false)
const query = ref('')
const activeId = ref<string>('')
const inputRef = ref<HTMLInputElement | null>(null)

const filteredGroups = computed(() => {
  if (!query.value) return props.groups
  
  const lowerQuery = query.value.toLowerCase()
  return props.groups.map(group => ({
    ...group,
    items: group.items.filter(item => item.label.toLowerCase().includes(lowerQuery))
  })).filter(group => group.items.length > 0)
})

const flatItems = computed(() => {
  return filteredGroups.value.flatMap(g => g.items)
})

watch(filteredGroups, (newGroups) => {
  const firstGroup = newGroups[0]
  if (firstGroup && firstGroup.items.length > 0) {
    activeId.value = firstGroup.items[0]!.id
  } else {
    activeId.value = ''
  }
})

const open = () => {
  isOpen.value = true
  query.value = ''
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const close = () => {
  isOpen.value = false
}

const navigate = (direction: number) => {
  const items = flatItems.value
  if (items.length === 0) return
  
  const currentIndex = items.findIndex(item => item.id === activeId.value)
  let nextIndex = currentIndex + direction
  
  if (nextIndex < 0) nextIndex = items.length - 1
  if (nextIndex >= items.length) nextIndex = 0
  
  const nextItem = items[nextIndex]
  if (nextItem) {
    activeId.value = nextItem.id
  }
  
  // Scroll into view logic could go here
}

const execute = () => {
  const item = flatItems.value.find(i => i.id === activeId.value)
  if (item) {
    executeItem(item)
  }
}

const executeItem = (item: CommandItem) => {
  item.action()
  close()
}

const handleKeydown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    if (isOpen.value) close()
    else open()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

defineExpose({ open, close })
</script>

<style scoped lang="scss">
.ma-command-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 14vh;
  backdrop-filter: blur(2px);
}

.ma-command-modal {
  width: 640px;
  max-width: 90vw;
  background: var(--ma-bg-card);
  border-radius: 12px;
  box-shadow: 0 16px 70px rgba(0,0,0,0.2);
  overflow: hidden;
  border: 1px solid var(--ma-border);
  display: flex;
  flex-direction: column;
}

.ma-command-search {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--ma-border);
  
  .search-icon {
    color: var(--ma-text-muted);
    margin-right: 12px;
  }
  
  input {
    flex: 1;
    background: transparent;
    border: none;
    font-size: 16px;
    color: var(--ma-text-main);
    outline: none;
    
    &::placeholder {
      color: var(--ma-text-muted);
    }
  }
  
  .kbd-hint {
    font-size: 12px;
    color: var(--ma-text-muted);
    border: 1px solid var(--ma-border);
    border-radius: 4px;
    padding: 2px 6px;
    background: var(--ma-bg-page);
  }
}

.ma-command-list {
  max-height: 400px;
  overflow-y: auto;
  padding: 8px;
}

.ma-command-group {
  margin-bottom: 8px;
  
  .group-title {
    font-size: 12px;
    color: var(--ma-text-muted);
    padding: 8px 12px;
    font-weight: 500;
  }
}

.ma-command-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  color: var(--ma-text-secondary);
  transition: all 0.1s;
  
  &.is-active {
    background: var(--ma-primary);
    color: white;
    
    .item-shortcut {
      color: rgba(255,255,255,0.8);
    }
  }
  
  .item-icon {
    margin-right: 12px;
  }
  
  .item-label {
    flex: 1;
  }
  
  .item-shortcut {
    font-size: 12px;
    color: var(--ma-text-muted);
  }
}

.ma-command-empty {
  padding: 32px;
  text-align: center;
  color: var(--ma-text-muted);
}

// Transitions
.cmd-fade-enter-active,
.cmd-fade-leave-active {
  transition: opacity 0.2s ease;
  
  .ma-command-modal {
    transition: transform 0.2s ease;
  }
}

.cmd-fade-enter-from,
.cmd-fade-leave-to {
  opacity: 0;
  
  .ma-command-modal {
    transform: scale(0.98);
  }
}
</style>
