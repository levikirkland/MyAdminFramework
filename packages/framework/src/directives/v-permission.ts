import type { Directive, DirectiveBinding } from 'vue'
import { usePermission } from '../composables/usePermission'

export const vPermission: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { hasPermission, hasAnyPermission } = usePermission()
    const value = binding.value

    if (!value) {
      throw new Error('v-permission directive requires a value')
    }

    let hasAccess = false

    if (Array.isArray(value)) {
      hasAccess = hasAnyPermission(value)
    } else if (typeof value === 'string') {
      hasAccess = hasPermission(value)
    }

    if (!hasAccess) {
      el.parentNode?.removeChild(el)
    }
  }
}
