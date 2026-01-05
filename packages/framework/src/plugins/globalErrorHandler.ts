import type { App } from 'vue'
import { useToast } from '../composables/useToast'

export const globalErrorHandler = {
  install: (app: App) => {
    const { showToast } = useToast()

    app.config.errorHandler = (err: any, instance, info) => {
      console.error('Global Error Handler:', err)
      console.error('Component:', instance)
      console.error('Info:', info)

      // Prevent recursive errors if toast fails
      try {
        const message = err.message || 'An unexpected error occurred'
        showToast(message, 'error')
      } catch (e) {
        console.error('Failed to show error toast', e)
      }
    }

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled Promise Rejection:', event.reason)
      showToast(event.reason?.message || 'Async operation failed', 'error')
    })
  }
}
