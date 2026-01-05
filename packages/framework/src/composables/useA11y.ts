let uniqueIdCount = 0

export function useA11y() {
  /**
   * Generates a unique ID for accessibility attributes (aria-labelledby, aria-describedby)
   */
  const generateId = (prefix = 'ma-id') => {
    uniqueIdCount++
    return `${prefix}-${uniqueIdCount}`
  }

  /**
   * Manages focus trap for modals/drawers
   */
  const trapFocus = (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    element.addEventListener('keydown', handleTab)
    return () => element.removeEventListener('keydown', handleTab)
  }

  return {
    generateId,
    trapFocus
  }
}
