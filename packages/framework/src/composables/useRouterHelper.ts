import { computed } from 'vue'
import { useRoute, useRouter, type RouteLocationRaw } from 'vue-router'

export function useRouterHelper() {
  const router = useRouter()
  const route = useRoute()

  const currentRoute = computed(() => route)
  
  const push = (to: RouteLocationRaw) => {
    if (router) {
      return router.push(to)
    }
    console.warn('Router instance not found. Ensure vue-router is installed.')
    return Promise.resolve()
  }

  const replace = (to: RouteLocationRaw) => {
    if (router) {
      return router.replace(to)
    }
    return Promise.resolve()
  }

  const goBack = () => {
    if (router) {
      router.back()
    }
  }

  const isActive = (path: string, exact = false) => {
    if (!route) return false
    if (exact) return route.path === path
    return route.path.startsWith(path)
  }

  return {
    router,
    route: currentRoute,
    push,
    replace,
    goBack,
    isActive
  }
}
