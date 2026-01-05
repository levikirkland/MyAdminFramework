import { ref, onMounted, onUnmounted, readonly } from 'vue'

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}

export function useBreakpoint() {
  const width = ref(window.innerWidth)
  const current = ref<Breakpoint>('xs')

  const updateWidth = () => {
    width.value = window.innerWidth
    if (width.value >= breakpoints['2xl']) current.value = '2xl'
    else if (width.value >= breakpoints.xl) current.value = 'xl'
    else if (width.value >= breakpoints.lg) current.value = 'lg'
    else if (width.value >= breakpoints.md) current.value = 'md'
    else if (width.value >= breakpoints.sm) current.value = 'sm'
    else current.value = 'xs'
  }

  onMounted(() => {
    window.addEventListener('resize', updateWidth)
    updateWidth()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
  })

  return {
    width: readonly(width),
    current: readonly(current),
    isSmaller: (bp: Breakpoint) => width.value < breakpoints[bp],
    isLarger: (bp: Breakpoint) => width.value >= breakpoints[bp]
  }
}
