<template>
  <div class="ma-notification" ref="containerRef">
    <div class="ma-notification-trigger" @click="toggle">
      <div class="icon-wrapper">
        <Bell :size="20" />
        <span v-if="unreadCount > 0" class="badge">{{ unreadCount > 99 ? '99+' : unreadCount }}</span>
      </div>
    </div>

    <transition name="fade">
      <div v-if="isOpen" class="ma-notification-dropdown">
        <div class="ma-notification-header">
          <span class="title">Notifications</span>
          <button v-if="unreadCount > 0" class="mark-read-btn" @click="$emit('mark-all-read')">
            Mark all as read
          </button>
        </div>
        
        <div class="ma-notification-list">
          <div v-if="items.length === 0" class="empty-state">
            No notifications
          </div>
          <div 
            v-for="item in items" 
            :key="item.id" 
            class="ma-notification-item"
            :class="{ 'is-unread': !item.read }"
            @click="handleItemClick(item)"
          >
            <div class="item-content">
              <div class="item-title">{{ item.title }}</div>
              <div class="item-desc">{{ item.content }}</div>
              <div class="item-time">{{ item.time }}</div>
            </div>
            <div v-if="!item.read" class="unread-dot"></div>
          </div>
        </div>

        <div v-if="$slots.footer" class="ma-notification-footer">
          <slot name="footer" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Bell } from 'lucide-vue-next'

interface NotificationItem {
  id: string | number;
  title: string;
  content: string;
  time: string;
  read?: boolean;
  [key: string]: any;
}

const props = withDefaults(defineProps<{
  items?: NotificationItem[];
}>(), {
  items: () => []
})

const emit = defineEmits(['mark-all-read', 'item-click'])

const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const unreadCount = computed(() => {
  return props.items.filter(item => !item.read).length
})

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

const handleItemClick = (item: NotificationItem) => {
  emit('item-click', item)
}

const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.ma-notification {
  position: relative;
  display: inline-block;
}

.ma-notification-trigger {
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s;
  color: var(--ma-text-main);
}

.ma-notification-trigger:hover {
  background-color: var(--ma-bg-secondary);
}

.icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: var(--ma-danger);
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 2px 4px;
  border-radius: 10px;
  min-width: 16px;
  text-align: center;
  line-height: 1;
  border: 2px solid var(--ma-bg-header, #fff);
}

.ma-notification-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 320px;
  background: var(--ma-bg-card);
  border: 1px solid var(--ma-border);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  margin-top: 8px;
  overflow: hidden;
}

.ma-notification-header {
  padding: 12px 16px;
  border-bottom: 1px solid var(--ma-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--ma-text-main);
}

.mark-read-btn {
  background: none;
  border: none;
  color: var(--ma-primary);
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0;
}

.mark-read-btn:hover {
  text-decoration: underline;
}

.ma-notification-list {
  max-height: 300px;
  overflow-y: auto;
}

.ma-notification-item {
  padding: 12px 16px;
  border-bottom: 1px solid var(--ma-border);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  transition: background-color 0.2s;
}

.ma-notification-item:last-child {
  border-bottom: none;
}

.ma-notification-item:hover {
  background-color: var(--ma-bg-secondary);
}

.ma-notification-item.is-unread {
  background-color: var(--ma-primary-light, #f0f9ff);
}

.item-content {
  flex: 1;
  margin-right: 12px;
}

.item-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ma-text-main);
  margin-bottom: 4px;
}

.item-desc {
  font-size: 0.8rem;
  color: var(--ma-text-secondary);
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-time {
  font-size: 0.75rem;
  color: var(--ma-text-muted);
}

.unread-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--ma-primary);
  margin-top: 6px;
}

.empty-state {
  padding: 24px;
  text-align: center;
  color: var(--ma-text-muted);
  font-size: 0.875rem;
}

.ma-notification-footer {
  padding: 8px 16px;
  border-top: 1px solid var(--ma-border);
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
