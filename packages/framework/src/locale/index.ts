import { createI18n } from 'vue-i18n'
import en from './en'

// Default instance for the framework if the app doesn't provide one
export const defaultI18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en
  }
})

export const useMaLocale = () => {
  // In a real scenario, we might want to inject the user's i18n instance
  // For now, we'll return a helper that uses the t function
  return {
    t: (key: string) => {
      // @ts-ignore
      return defaultI18n.global.t(key)
    }
  }
}

export { en }
