<template>
  <div class="ma-tree">
    <div 
      v-for="(node, index) in data" 
      :key="node[nodeKey] || index"
      class="ma-tree-node"
    >
      <div 
        class="ma-tree-node__content"
        :class="{ 'is-selected': selectedKey === node[nodeKey] }"
        @click="handleNodeClick(node)"
      >
        <span 
          class="ma-tree-node__expand-icon"
          :class="{ 'is-expanded': isExpanded(node), 'is-leaf': !hasChildren(node) }"
          @click.stop="toggleExpand(node)"
        >
          <ChevronRight v-if="hasChildren(node)" :size="16" />
        </span>
        
        <MaCheckbox 
          v-if="showCheckbox"
          :modelValue="isChecked(node)"
          @update:modelValue="(val) => handleCheck(node, val)"
          @click.stop
          class="ma-tree-checkbox"
        />
        
        <span class="ma-tree-node__label">
          <slot name="label" :node="node">
            {{ node[labelKey] }}
          </slot>
        </span>
      </div>

      <div v-if="isExpanded(node) && hasChildren(node)" class="ma-tree-node__children">
        <MaTree
          :data="node[childrenKey]"
          :label-key="labelKey"
          :children-key="childrenKey"
          :node-key="nodeKey"
          :show-checkbox="showCheckbox"
          :default-expand-all="defaultExpandAll"
          :selected-key="selectedKey"
          :checked-keys="checkedKeys"
          @node-click="(n) => $emit('node-click', n)"
          @check-change="(n, v) => $emit('check-change', n, v)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronRight } from 'lucide-vue-next'
import MaCheckbox from './MaCheckbox.vue'

interface TreeNode {
  [key: string]: any;
}

const props = withDefaults(defineProps<{
  data: TreeNode[];
  labelKey?: string;
  childrenKey?: string;
  nodeKey?: string;
  showCheckbox?: boolean;
  defaultExpandAll?: boolean;
  selectedKey?: string | number;
  checkedKeys?: (string | number)[];
}>(), {
  labelKey: 'label',
  childrenKey: 'children',
  nodeKey: 'id',
  showCheckbox: false,
  defaultExpandAll: false,
  checkedKeys: () => []
})

const emit = defineEmits(['node-click', 'check-change'])

const expandedKeys = ref<Set<string | number>>(new Set())

const hasChildren = (node: TreeNode) => {
  return node[props.childrenKey] && node[props.childrenKey].length > 0
}

const isExpanded = (node: TreeNode) => {
  if (props.defaultExpandAll) return true
  return expandedKeys.value.has(node[props.nodeKey])
}

const toggleExpand = (node: TreeNode) => {
  const key = node[props.nodeKey]
  if (expandedKeys.value.has(key)) {
    expandedKeys.value.delete(key)
  } else {
    expandedKeys.value.add(key)
  }
}

const handleNodeClick = (node: TreeNode) => {
  emit('node-click', node)
}

const isChecked = (node: TreeNode) => {
  return props.checkedKeys.includes(node[props.nodeKey])
}

const handleCheck = (node: TreeNode, checked: boolean) => {
  emit('check-change', node, checked)
}
</script>

<style scoped>
.ma-tree {
  font-size: 0.9rem;
  color: var(--ma-text-main);
}

.ma-tree-node__content {
  display: flex;
  align-items: center;
  padding: 4px 0;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.ma-tree-node__content:hover {
  background-color: var(--ma-bg-secondary);
}

.ma-tree-node__content.is-selected {
  background-color: var(--ma-primary-light);
  color: var(--ma-primary);
}

.ma-tree-node__expand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: var(--ma-text-muted);
  transition: transform 0.2s;
  cursor: pointer;
}

.ma-tree-node__expand-icon.is-expanded {
  transform: rotate(90deg);
}

.ma-tree-node__expand-icon.is-leaf {
  visibility: hidden;
}

.ma-tree-checkbox {
  margin-right: 8px;
}

.ma-tree-node__label {
  flex: 1;
}

.ma-tree-node__children {
  padding-left: 24px;
}
</style>
