<template>
  <div class="kanban-page">
    <div class="page-header">
      <h2>Kanban Board</h2>
      <div class="header-actions">
        <MaButton variant="outline" @click="addColumn">
          + Add Column
        </MaButton>
        <MaButton color="primary" @click="addTaskToColumn(columns[0])">
          + New Task
        </MaButton>
      </div>
    </div>

    <div class="kanban-container">
      <MaKanban 
        v-model="columns" 
        @change="handleChange"
        @task-click="handleTaskClick"
        @add-task="addTaskToColumn"
      >
        <template #column-actions="{ column }">
          <button class="icon-btn" @click="deleteColumn(column.id)">
            <Trash2 :size="16" />
          </button>
        </template>

        <template #card="{ task }">
          <div class="task-card">
            <div class="task-header">
              <span class="task-id">#{{ task.id }}</span>
              <div class="task-priority" :class="task.priority" :title="task.priority">
                <ChevronsUp v-if="task.priority === 'high'" :size="16" />
                <Minus v-else-if="task.priority === 'medium'" :size="16" />
                <ChevronsDown v-else-if="task.priority === 'low'" :size="16" />
              </div>
            </div>
            <div class="task-title">{{ task.title }}</div>
            
            <div v-if="task.tags && task.tags.length" class="task-tags">
              <span v-for="tag in task.tags" :key="tag" class="task-tag">{{ tag }}</span>
            </div>

            <div class="task-footer">
              <div class="task-assignee">
                <MaAvatar :src="task.assignee.avatar" size="small" />
                <span>{{ task.assignee.name }}</span>
              </div>
              <div v-if="task.dueDate" class="task-date">
                {{ new Date(task.dueDate).toLocaleDateString() }}
              </div>
            </div>
          </div>
        </template>
      </MaKanban>
    </div>

    <!-- Task Edit Modal -->
    <MaModal v-model="showEditModal" :title="editingTask?.id ? 'Edit Task' : 'New Task'">
      <div class="task-form" v-if="editingTask">
        <MaFormGroup label="Title">
          <MaInput v-model="editingTask.title" placeholder="Task title" />
        </MaFormGroup>
        
        <MaFormGroup label="Description">
          <MaTextarea v-model="editingTask.description" placeholder="Task description" />
        </MaFormGroup>

        <div class="form-row">
          <MaFormGroup label="Priority">
            <MaSelect v-model="editingTask.priority" :options="priorityOptions" />
          </MaFormGroup>
          
          <MaFormGroup label="Due Date">
            <MaInput type="date" v-model="editingTask.dueDate" />
          </MaFormGroup>
        </div>

        <MaFormGroup label="Tags (comma separated)">
          <MaInput 
            :modelValue="editingTask.tags?.join(', ')" 
            @update:modelValue="val => editingTask.tags = val.split(',').map((t: string) => t.trim()).filter(Boolean)"
            placeholder="design, bug, feature" 
          />
        </MaFormGroup>
      </div>
      <template #footer>
        <div class="modal-footer">
          <MaButton variant="outline" @click="showEditModal = false">Cancel</MaButton>
          <MaButton v-if="editingTask?.id" color="danger" variant="outline" @click="deleteTask">Delete</MaButton>
          <MaButton @click="saveTask">Save</MaButton>
        </div>
      </template>
    </MaModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MaKanban, MaButton, MaAvatar, useToast, MaModal, MaInput, MaSelect, MaTextarea, MaFormGroup } from 'my-admin-framework'
import { Trash2, ChevronsUp, Minus, ChevronsDown } from 'lucide-vue-next'

const { showToast } = useToast()

const showEditModal = ref(false)
const editingTask = ref<any>(null)
const activeColumnId = ref<string | number | null>(null)

const priorityOptions = [
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' }
]

const columns = ref([
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      { 
        id: 1, 
        title: 'Design new landing page', 
        description: 'Create high fidelity mockups for the new landing page.',
        priority: 'high',
        assignee: { name: 'Alice', avatar: '' },
        tags: ['design', 'ui'],
        dueDate: '2024-02-01'
      },
      { 
        id: 2, 
        title: 'Fix navigation bug', 
        description: 'Menu does not close on mobile.',
        priority: 'medium',
        assignee: { name: 'Bob', avatar: '' },
        tags: ['bug'],
        dueDate: '2024-01-20'
      }
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [
      { 
        id: 3, 
        title: 'Implement authentication', 
        priority: 'high',
        assignee: { name: 'Charlie', avatar: '' },
        tags: ['backend', 'auth']
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      { 
        id: 4, 
        title: 'Setup project repo', 
        priority: 'low',
        assignee: { name: 'Dave', avatar: '' },
        tags: ['devops']
      }
    ]
  }
])

const handleChange = ({ event, column }: any) => {
  console.log('Change:', event, column)
}

const handleTaskClick = (task: any) => {
  editingTask.value = JSON.parse(JSON.stringify(task)) // Deep copy
  activeColumnId.value = findColumnIdByTaskId(task.id)
  showEditModal.value = true
}

const addTaskToColumn = (column: any) => {
  if (!column) return
  activeColumnId.value = column.id
  editingTask.value = {
    id: null, // New task
    title: '',
    description: '',
    priority: 'medium',
    assignee: { name: 'Me', avatar: '' },
    tags: [],
    dueDate: ''
  }
  showEditModal.value = true
}

const saveTask = () => {
  if (!editingTask.value.title) {
    showToast('Title is required', 'error')
    return
  }

  if (editingTask.value.id) {
    // Update existing
    const colId = activeColumnId.value
    const col = columns.value.find(c => c.id === colId)
    if (col) {
      const taskIndex = col.tasks.findIndex((t: any) => t.id === editingTask.value.id)
      if (taskIndex > -1) {
        col.tasks[taskIndex] = { ...editingTask.value }
        showToast('Task updated', 'success')
      }
    }
  } else {
    // Create new
    const colId = activeColumnId.value
    const col = columns.value.find(c => c.id === colId)
    if (col) {
      const newTask = {
        ...editingTask.value,
        id: Date.now()
      }
      col.tasks.push(newTask)
      showToast('Task created', 'success')
    }
  }
  showEditModal.value = false
}

const deleteTask = () => {
  if (!editingTask.value.id) return
  
  const colId = activeColumnId.value
  const col = columns.value.find(c => c.id === colId)
  if (col) {
    col.tasks = col.tasks.filter((t: any) => t.id !== editingTask.value.id)
    showToast('Task deleted', 'success')
    showEditModal.value = false
  }
}

const findColumnIdByTaskId = (taskId: number) => {
  for (const col of columns.value) {
    if (col.tasks.find((t: any) => t.id === taskId)) {
      return col.id
    }
  }
  return null
}

const addColumn = () => {
  const title = prompt('Column Title:')
  if (title) {
    columns.value.push({
      id: Date.now().toString(),
      title,
      tasks: []
    })
  }
}

const deleteColumn = (columnId: string) => {
  if (confirm('Are you sure you want to delete this column?')) {
    columns.value = columns.value.filter(c => c.id !== columnId)
  }
}
</script>

<style scoped>
.kanban-page {
  padding: 24px;
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.kanban-container {
  flex: 1;
  overflow: hidden;
}

.task-card {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-id {
  font-size: 12px;
  color: var(--ma-text-muted);
}

.task-priority {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;
}

.task-priority.high { background: #fee2e2; color: #ef4444; }
.task-priority.medium { background: #ffedd5; color: #f97316; }
.task-priority.low { background: #dcfce7; color: #22c55e; }

.task-title {
  font-weight: 500;
  color: var(--ma-text-main);
  margin: 0;
}

.task-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.task-tag {
  font-size: 10px;
  background: var(--ma-bg-tertiary);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--ma-text-secondary);
}

.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
}

.task-assignee {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--ma-text-secondary);
}

.task-date {
  font-size: 11px;
  color: var(--ma-text-muted);
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--ma-text-muted);
  padding: 4px;
  border-radius: 4px;
}

.icon-btn:hover {
  background: var(--ma-bg-tertiary);
  color: var(--ma-danger);
}

.task-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-row > * {
  flex: 1;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
