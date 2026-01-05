import { inject, type Ref, getCurrentInstance } from 'vue'

export function useToast(toastRef?: Ref<any>) {
  const instance = getCurrentInstance()
  const injectedToast = instance ? inject('toast') as ((options: any) => void) | undefined : undefined

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', title?: string, duration = 3000) => {
    if (toastRef?.value) {
      toastRef.value.add({ message, type, title, duration })
    } else if (injectedToast) {
      injectedToast({ message, type, title, duration })
    } else {
      console.warn('Toast ref not provided or not ready')
    }
  }

  const success = (message: string, title?: string, duration?: number) => showToast(message, 'success', title, duration)
  const error = (message: string, title?: string, duration?: number) => showToast(message, 'error', title, duration)
  const info = (message: string, title?: string, duration?: number) => showToast(message, 'info', title, duration)
  const warning = (message: string, title?: string, duration?: number) => showToast(message, 'warning', title, duration)

  return {
    showToast,
    success,
    error,
    info,
    warning
  }
}
