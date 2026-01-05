<template>
  <div class="ma-tree-select" ref="containerRef">
    <div 
      class="ma-tree-select-trigger" 
      @click="toggleDropdown"
      :class="{ 'is-active': isOpen, 'is-disabled': disabled }"
    >
      <div class="selected-value" v-if="modelValue">
        {{ getSelectedLabel(modelValue) }}
      </div>
      <div class="placeholder" v-else>
        {{ placeholder }}
      </div>
      <div class="trigger-icon">
        <ChevronDown :size="16" />
      </div>
    </div>

    <div v-if="isOpen" class="ma-tree-select-dropdown">
      <div class="ma-tree-select-search" v-if="filterable">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search..." 
          @click.stop
        />
      </div>
      <div class="ma-tree-select-content">
        <MaTree 
          :data="filteredData" 
          :selectable="true"
          @node-click="handleNodeClick"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import MaTree from './MaTree.vue'

interface TreeNode {
  id: string | number;
  label: string;
  children?: TreeNode[];
  [key: string]: any;
}

const props = withDefaults(defineProps<{
  modelValue?: string | number | null;
  data: TreeNode[];
  placeholder?: string;
  disabled?: boolean;
  filterable?: boolean;
}>(), {
  placeholder: 'Select option',
  disabled: false,
  filterable: false
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)
const searchQuery = ref('')

const toggleDropdown = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}

const closeDropdown = (e: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

const handleNodeClick = (node: TreeNode) => {
  emit('update:modelValue', node.id)
  emit('change', node)
  isOpen.value = false
}

const getSelectedLabel = (id: string | number) => {
  const findLabel = (nodes: TreeNode[]): string | undefined => {
    for (const node of nodes) {
      if (node.id === id) return node.label
      if (node.children) {
        const found = findLabel(node.children)
        if (found) return found
      }
    }
  }
  return findLabel(props.data) || id
}

const filteredData = computed(() => {
  if (!props.filterable || !searchQuery.value) return props.data
  
  const query = searchQuery.value.toLowerCase()
  const filterNodes = (nodes: TreeNode[]): TreeNode[] => {
    return nodes.reduce((acc: TreeNode[], node) => {
      const matches = node.label.toLowerCase().includes(query)
      const children = node.children ? filterNodes(node.children) : []
      
      if (matches || children.length > 0) {
        acc.push({
          ...node,
          children: children.length > 0 ? children : undefined
        })
      }
      return acc
    }, [])
  }
  
  return filterNodes(props.data)
})

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<style scoped>
.ma-tree-select {
  position: relative;
  width: 100%;
}

.ma-tree-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--ma-bg-card);
  border: 1px solid var(--ma-border);
  border-radius: 6px;
  cursor: pointer;
  min-height: 38px;
  transition: all 0.2s;
}

.ma-tree-select-trigger:hover {
  border-color: var(--ma-primary);
}

.ma-tree-select-trigger.is-active {
  border-color: var(--ma-primary);
  box-shadow: 0 0 0 2px var(--ma-primary-light);
}

.ma-tree-select-trigger.is-disabled {
  background: var(--ma-bg-secondary);
  cursor: not-allowed;
  opacity: 0.7;
}

.placeholder {
  color: var(--ma-text-muted);
}

.trigger-icon {
  color: var(--ma-text-muted);
  display: flex;
  align-items: center;
}

.ma-tree-select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: var(--ma-bg-card);
  border: 1px solid var(--ma-border);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  max-height: 300px;
  display: flex;
  flex-direction: column;
}

.ma-tree-select-search {
  padding: 8px;
  border-bottom: 1px solid var(--ma-border);
}

.ma-tree-select-search input {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid var(--ma-border);
  border-radius: 4px;
  background: var(--ma-bg-page);
  color: var(--ma-text-main);
}

.ma-tree-select-content {
  overflow-y: auto;
  padding: 4px 0;
}
</style>