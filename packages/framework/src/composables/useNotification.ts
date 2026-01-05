import { ref } from 'vue'

export interface NotificationItem {
  id: string | number
  title: string
  content?: string
  time?: string
  read?: boolean
  type?: 'info' | 'success' | 'warning' | 'error'
  onClick?: () => void
}

const notifications = ref<NotificationItem[]>([])

export function useNotification() {
  const add = (item: Omit<NotificationItem, 'id' | 'read'>) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9)
    notifications.value.unshift({
      id,
      read: false,
      time: 'Just now',
      ...item
    })
    return id
  }

  const remove = (id: string | number) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const markAsRead = (id: string | number) => {
    const item = notifications.value.find(n => n.id === id)
    if (item) {
      item.read = true
    }
  }

  const markAllAsRead = () => {
    notifications.value.forEach(n => n.read = true)
  }

  const clear = () => {
    notifications.value = []
  }

  return {
    notifications,
    add,
    remove,
    markAsRead,
    markAllAsRead,
    clear
  }
}
