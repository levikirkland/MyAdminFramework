import { ref, reactive, watch } from 'vue'

type ValidatorFn = (value: any) => string | boolean | Promise<string | boolean>

interface FieldRule {
  required?: boolean
  min?: number
  max?: number
  email?: boolean
  pattern?: RegExp
  validator?: ValidatorFn
  message?: string
  trigger?: 'blur' | 'change'
}

interface FormConfig {
  [key: string]: FieldRule[] | FieldRule
}

export function useForm<T extends Record<string, any>>(initialState: T, rules: FormConfig = {}) {
  const form = reactive<T>({ ...initialState })
  const errors = reactive<Record<string, string>>({})
  const isDirty = ref(false)
  const isSubmitting = ref(false)

  // Watch for changes to mark as dirty
  watch(form, () => {
    isDirty.value = true
  }, { deep: true })

  const validateField = async (field: keyof T) => {
    const value = (form as any)[field]
    const fieldRules = rules[field as string]
    
    if (!fieldRules) return true

    const rulesArray = Array.isArray(fieldRules) ? fieldRules : [fieldRules]
    
    for (const rule of rulesArray) {
      // Required check
      if (rule.required) {
        if (value === null || value === undefined || value === '') {
          errors[field as string] = rule.message || 'This field is required'
          return false
        }
      }

      // Min length/value check
      if (rule.min !== undefined) {
        if (typeof value === 'string' && value.length < rule.min) {
          errors[field as string] = rule.message || `Must be at least ${rule.min} characters`
          return false
        }
        if (typeof value === 'number' && value < rule.min) {
          errors[field as string] = rule.message || `Must be at least ${rule.min}`
          return false
        }
      }

      // Max length/value check
      if (rule.max !== undefined) {
        if (typeof value === 'string' && value.length > rule.max) {
          errors[field as string] = rule.message || `Must be no more than ${rule.max} characters`
          return false
        }
        if (typeof value === 'number' && value > rule.max) {
          errors[field as string] = rule.message || `Must be no more than ${rule.max}`
          return false
        }
      }

      // Email check
      if (rule.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (value && !emailRegex.test(String(value))) {
          errors[field as string] = rule.message || 'Invalid email address'
          return false
        }
      }

      // Pattern check
      if (rule.pattern) {
        if (value && !rule.pattern.test(String(value))) {
          errors[field as string] = rule.message || 'Invalid format'
          return false
        }
      }

      // Custom validator
      if (rule.validator) {
        const result = await rule.validator(value)
        if (result !== true) {
          errors[field as string] = typeof result === 'string' ? result : (rule.message || 'Validation failed')
          return false
        }
      }
    }

    // If we get here, validation passed
    delete errors[field as string]
    return true
  }

  const validate = async () => {
    let isValid = true
    const fields = Object.keys(rules)
    
    for (const field of fields) {
      const valid = await validateField(field as keyof T)
      if (!valid) isValid = false
    }
    
    return isValid
  }

  const reset = () => {
    Object.assign(form, initialState)
    Object.keys(errors).forEach(key => delete errors[key])
    isDirty.value = false
  }

  const handleSubmit = (fn: (values: T) => Promise<void> | void) => {
    return async () => {
      isSubmitting.value = true
      try {
        const isValid = await validate()
        if (isValid) {
          await fn(form as T)
        }
      } finally {
        isSubmitting.value = false
      }
    }
  }

  return {
    form,
    errors,
    isDirty,
    isSubmitting,
    validate,
    validateField,
    reset,
    handleSubmit
  }
}
