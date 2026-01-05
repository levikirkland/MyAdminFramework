import { ref, onMounted } from 'vue'

const isDark = ref(false)
const layoutMode = ref<'sidebar' | 'top-nav'>('sidebar')
const primaryColor = ref('#0052cc')

const themeColors = [
  { name: 'Blue', value: '#0052cc', hover: '#0747a6', light: '#deebff' },
  { name: 'Green', value: '#16a34a', hover: '#15803d', light: '#dcfce7' },
  { name: 'Purple', value: '#7c3aed', hover: '#6d28d9', light: '#f3e8ff' },
  { name: 'Orange', value: '#ea580c', hover: '#c2410c', light: '#ffedd5' },
  { name: 'Red', value: '#dc2626', hover: '#b91c1c', light: '#fee2e2' },
  { name: 'Teal', value: '#0d9488', hover: '#0f766e', light: '#ccfbf1' },
]

export function useTheme() {
  
  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    updateTheme()
  }

  const setLayoutMode = (mode: 'sidebar' | 'top-nav') => {
    layoutMode.value = mode
  }

  const setPrimaryColor = (color: string) => {
    primaryColor.value = color
    updateTheme()
  }

  const updateTheme = () => {
    // Handle Dark Mode
    if (isDark.value) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }

    // Handle Primary Color
    const selectedTheme = themeColors.find(c => c.value === primaryColor.value) || themeColors[0]
    const root = document.documentElement

    if (selectedTheme) {
      if (isDark.value) {
        root.style.setProperty('--ma-primary', selectedTheme.value)
        root.style.setProperty('--ma-primary-hover', selectedTheme.hover)
        root.style.setProperty('--ma-primary-light', `${selectedTheme.value}26`) // 15% opacity hex
      } else {
        root.style.setProperty('--ma-primary', selectedTheme.value)
        root.style.setProperty('--ma-primary-hover', selectedTheme.hover)
        root.style.setProperty('--ma-primary-light', selectedTheme.light)
      }
    }
  }

  onMounted(() => {
    // Initialize
    updateTheme()
  })

  return {
    isDark,
    layoutMode,
    primaryColor,
    themeColors,
    toggleDarkMode,
    setLayoutMode,
    setPrimaryColor
  }
}
