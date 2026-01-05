<template>
  <div class="ma-task-list">
    <div v-if="title" class="ma-task-header">
      <h3>{{ title }}</h3>
      <button class="ma-task-add" @click="$emit('add')">
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      </button>
    </div>

    <div class="ma-tasks">
      <div 
        v-for="task in tasks" 
        :key="task.id" 
        class="ma-task-item"
        :class="{ 'is-done': task.completed }"
      >
        <label class="ma-task-checkbox">
          <input 
            type="checkbox" 
            :checked="task.completed" 
            @change="$emit('toggle', task)"
          />
          <span class="checkmark"></span>
        </label>
        <span class="ma-task-text">{{ task.title }}</span>
        <button class="ma-task-delete" @click="$emit('delete', task.id)">
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      
      <div v-if="tasks.length === 0" class="ma-task-empty">
        No tasks yet
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Task {
  id: string | number
  title: string
  completed: boolean
}

defineProps<{
  title?: string
  tasks: Task[]
}>()

defineEmits(['toggle', 'delete', 'add'])
</script>

<style scoped>
.ma-task-list {
  background: var(--ma-bg-card);
  border-radius: 12px;
  border: 1px solid var(--ma-border);
  padding: 20px;
}

.ma-task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.ma-task-header h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.ma-task-add {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid var(--ma-border);
  background: transparent;
  color: var(--ma-text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.ma-task-add:hover {
  background: var(--ma-bg-secondary);
  color: var(--ma-primary);
}

.ma-tasks {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ma-task-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid transparent;
  transition: all 0.2s;
}

.ma-task-item:hover .ma-task-delete {
  opacity: 1;
}

.ma-task-checkbox {
  position: relative;
  cursor: pointer;
  user-select: none;
  width: 18px;
  height: 18px;
}

.ma-task-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: transparent;
  border: 2px solid var(--ma-border);
  border-radius: 4px;
  transition: all 0.2s;
}

.ma-task-checkbox:hover input ~ .checkmark {
  border-color: var(--ma-primary);
}

.ma-task-checkbox input:checked ~ .checkmark {
  background-color: var(--ma-primary);
  border-color: var(--ma-primary);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.ma-task-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.ma-task-checkbox .checkmark:after {
  left: 5px;
  top: 1px;
  width: 4px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.ma-task-text {
  flex: 1;
  font-size: 14px;
  color: var(--ma-text-main);
  transition: all 0.2s;
}

.ma-task-item.is-done .ma-task-text {
  text-decoration: line-through;
  color: var(--ma-text-muted);
}

.ma-task-delete {
  opacity: 0;
  background: transparent;
  border: none;
  color: var(--ma-text-muted);
  cursor: pointer;
  padding: 4px;
  transition: all 0.2s;
}

.ma-task-delete:hover {
  color: var(--ma-danger);
}

.ma-task-empty {
  text-align: center;
  color: var(--ma-text-muted);
  font-size: 13px;
  padding: 16px 0;
}
</style>
