import { ref, computed } from 'vue'

const STORAGE_KEY_PERMISSIONS = 'ma_permissions'
const STORAGE_KEY_ROLES = 'ma_roles'

// Initialize from localStorage if available
const initPermissions = (): Set<string> => {
  const stored = localStorage.getItem(STORAGE_KEY_PERMISSIONS)
  if (stored) {
    const parsed = JSON.parse(stored) as string[]
    return new Set(parsed)
  }
  return new Set()
}

const initRoles = (): Set<string> => {
  const stored = localStorage.getItem(STORAGE_KEY_ROLES)
  if (stored) {
    const parsed = JSON.parse(stored) as string[]
    return new Set(parsed)
  }
  return new Set()
}

const permissions = ref<Set<string>>(initPermissions())
const roles = ref<Set<string>>(initRoles())

export function usePermission() {
  /**
   * Set the current user's permissions and roles
   */
  const setPermissions = (p: string[], r: string[] = []) => {
    permissions.value = new Set(p)
    roles.value = new Set(r)
    
    localStorage.setItem(STORAGE_KEY_PERMISSIONS, JSON.stringify(p))
    localStorage.setItem(STORAGE_KEY_ROLES, JSON.stringify(r))
  }


  /**
   * Check if user has a specific permission
   */
  const hasPermission = (permission: string): boolean => {
    return permissions.value.has(permission) || permissions.value.has('*')
  }

  /**
   * Check if user has any of the provided permissions
   */
  const hasAnyPermission = (p: string[]): boolean => {
    if (permissions.value.has('*')) return true
    return p.some(permission => permissions.value.has(permission))
  }

  /**
   * Check if user has a specific role
   */
  const hasRole = (role: string): boolean => {
    return roles.value.has(role) || roles.value.has('super-admin')
  }

  /**
   * Reset all permissions and roles
   */
  const resetPermission = () => {
    permissions.value.clear()
    roles.value.clear()
    
    localStorage.removeItem(STORAGE_KEY_PERMISSIONS)
    localStorage.removeItem(STORAGE_KEY_ROLES)
  }

  return {
    permissions: computed(() => [...permissions.value]),
    roles: computed(() => [...roles.value]),
    setPermissions,
    hasPermission,
    hasAnyPermission,
    hasRole,
    resetPermission
  }
}
