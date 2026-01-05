<template>
  <div class="ma-kanban">
    <draggable
      v-model="columns"
      group="columns"
      item-key="id"
      class="ma-kanban-board"
      handle=".ma-kanban-column-header"
      ghost-class="ghost-column"
      drag-class="drag-column"
    >
      <template #item="{ element: column }">
        <div class="ma-kanban-column">
          <div class="ma-kanban-column-header">
            <div class="column-title">
              <span class="column-name">{{ column.title }}</span>
              <span class="column-count">{{ column.tasks.length }}</span>
            </div>
            <div class="column-actions">
              <slot name="column-actions" :column="column"></slot>
            </div>
          </div>

          <draggable
            v-model="column.tasks"
            group="tasks"
            item-key="id"
            class="ma-kanban-column-content"
            ghost-class="ghost-card"
            drag-class="drag-card"
            @change="(e: DraggableEvent) => handleChange(e, column)"
          >
            <template #item="{ element }">
              <div class="ma-kanban-card" @click="$emit('task-click', element)">
                <slot name="card" :task="element">
                  <div class="default-card">
                    {{ element.title }}
                  </div>
                </slot>
              </div>
            </template>
          </draggable>

          <div class="ma-kanban-column-footer">
            <slot name="column-footer" :column="column">
              <button class="add-task-btn" @click="$emit('add-task', column)">
                + Add Task
              </button>
            </slot>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import draggable from 'vuedraggable'

interface Task {
  id: string | number;
  title: string;
  [key: string]: any;
}

interface DraggableEvent {
  added?: {
    element: Task
    newIndex: number
  }
  removed?: {
    element: Task
    oldIndex: number
  }
  moved?: {
    element: Task
    newIndex: number
    oldIndex: number
  }
}

interface Column {
  id: string | number;
  title: string;
  tasks: Task[];
  [key: string]: any;
}

const props = defineProps<{
  modelValue: Column[]
}>()

const emit = defineEmits(['update:modelValue', 'change', 'task-click', 'add-task'])

const columns = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const handleChange = (event: DraggableEvent, column: Column) => {
  emit('change', { event, column })
}
</script>

<style scoped>
.ma-kanban {
  height: 100%;
  overflow-x: auto;
  padding-bottom: 16px;
}

.ma-kanban-board {
  display: flex;
  gap: 24px;
  height: 100%;
  min-width: min-content;
}

.ma-kanban-column {
  width: 320px;
  background: var(--ma-bg-secondary);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  max-height: 100%;
}

.ma-kanban-column-header {
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.column-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: var(--ma-text-main);
}

.column-count {
  background: rgba(0,0,0,0.05);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  color: var(--ma-text-secondary);
}

.ma-kanban-column-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 100px;
}

.ma-kanban-card {
  cursor: grab;
  background: var(--ma-bg-card);
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s;
}

.ma-kanban-card:hover {
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.ma-kanban-card:active {
  cursor: grabbing;
}

.default-card {
  padding: 12px;
  color: var(--ma-text-main);
}

.ghost-card {
  opacity: 0.5;
  background: var(--ma-bg-secondary);
  border: 2px dashed var(--ma-border);
}

.drag-card {
  opacity: 1;
  transform: rotate(2deg);
}

.ma-kanban-column-footer {
  padding: 12px;
  border-top: 1px solid rgba(0,0,0,0.05);
}

.add-task-btn {
  width: 100%;
  padding: 8px;
  border: none;
  background: transparent;
  color: var(--ma-text-secondary);
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s;
  text-align: left;
}

.add-task-btn:hover {
  background: rgba(0,0,0,0.05);
  color: var(--ma-text-main);
}
</style>
