<template>
  <div 
    class="ma-input-wrapper" 
    :class="[
      `ma-input--${size}`,
      { 
        'is-disabled': disabled,
        'is-error': !!error,
        'has-prefix': prefixIcon || $slots.prefix,
        'has-suffix': suffixIcon || $slots.suffix || (clearable && modelValue)
      }
    ]"
  >
    <label v-if="label" class="ma-input-label">
      {{ label }}
      <span v-if="required" class="ma-input-required">*</span>
    </label>
    
    <div class="ma-input-container">
      <!-- Prefix -->
      <div v-if="prefixIcon || $slots.prefix" class="ma-input-prefix">
        <slot name="prefix">
          <component :is="getIcon(prefixIcon)" v-if="prefixIcon" :size="iconSize" />
        </slot>
      </div>

      <input
        ref="inputRef"
        class="ma-input"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        v-bind="$attrs"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- Suffix / Clear / Password Toggle -->
      <div v-if="(clearable && modelValue) || suffixIcon || $slots.suffix || type === 'password'" class="ma-input-suffix">
        <button 
          v-if="clearable && modelValue" 
          class="ma-input-clear" 
          @click="handleClear"
          type="button"
          tabindex="-1"
        >
          <component :is="getIcon('X')" :size="iconSize" />
        </button>
        
        <button
          v-if="type === 'password'"
          class="ma-input-password-toggle"
          @click="togglePasswordVisibility"
          type="button"
          tabindex="-1"
        >
          <component :is="getIcon(isPasswordVisible ? 'EyeOff' : 'Eye')" :size="iconSize" />
        </button>

        <slot name="suffix" v-else-if="!type || type !== 'password'">
          <component :is="getIcon(suffixIcon)" v-if="suffixIcon" :size="iconSize" />
        </slot>
      </div>
    </div>

    <div v-if="error || hint" class="ma-input-helper" :class="{ 'is-error': !!error }">
      {{ error || hint }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import * as LucideIcons from 'lucide-vue-next';

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(defineProps<{
  modelValue?: string | number;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  hint?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  clearable?: boolean;
  prefixIcon?: string;
  suffixIcon?: string;
}>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  size: 'medium',
  disabled: false,
  readonly: false,
  required: false,
  clearable: false,
});

const emit = defineEmits(['update:modelValue', 'clear', 'focus', 'blur']);

const inputRef = ref<HTMLInputElement | null>(null);
const isPasswordVisible = ref(false);

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
  if (inputRef.value) {
    inputRef.value.type = isPasswordVisible.value ? 'text' : 'password';
  }
};


const getIcon = (name: string | undefined) => {
  if (!name) return null;
  return (LucideIcons as any)[name];
};

const iconSize = computed(() => {
  switch (props.size) {
    case 'small': return 14;
    case 'large': return 18;
    default: return 16;
  }
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const handleClear = () => {
  emit('update:modelValue', '');
  emit('clear');
  inputRef.value?.focus();
};

const handleFocus = (e: FocusEvent) => emit('focus', e);
const handleBlur = (e: FocusEvent) => emit('blur', e);
</script>

<style scoped>
.ma-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  font-family: inherit;
}

.ma-input-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ma-text-main);
  display: flex;
  align-items: center;
  gap: 4px;
}

.ma-input-required {
  color: var(--ma-danger);
}

.ma-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.ma-input {
  width: 100%;
  border: 1px solid var(--ma-border);
  background: var(--ma-bg-page);
  color: var(--ma-text-main);
  border-radius: 6px;
  transition: all 0.2s ease;
  outline: none;
}

.ma-input:focus {
  border-color: var(--ma-primary);
  box-shadow: 0 0 0 3px var(--ma-primary-light);
}

.ma-input::placeholder {
  color: var(--ma-text-secondary);
}

/* Sizes */
.ma-input--small .ma-input {
  height: 32px;
  padding: 0 10px;
  font-size: 0.75rem;
}

.ma-input--medium .ma-input {
  height: 40px;
  padding: 0 12px;
  font-size: 0.875rem;
}

.ma-input--large .ma-input {
  height: 48px;
  padding: 0 16px;
  font-size: 1rem;
}

/* Icons & Padding adjustments */
.ma-input-prefix,
.ma-input-suffix {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ma-text-secondary);
  z-index: 1;
  pointer-events: none;
}

.ma-input-suffix button {
  pointer-events: auto;
}

/* Prefix positioning */
.ma-input--small .ma-input-prefix { left: 10px; }
.ma-input--medium .ma-input-prefix { left: 12px; }
.ma-input--large .ma-input-prefix { left: 16px; }

/* Suffix positioning */
.ma-input--small .ma-input-suffix { right: 10px; }
.ma-input--medium .ma-input-suffix { right: 12px; }
.ma-input--large .ma-input-suffix { right: 16px; }

/* Padding when icons exist */
.has-prefix.ma-input--small .ma-input { padding-left: 30px; }
.has-prefix.ma-input--medium .ma-input { padding-left: 36px; }
.has-prefix.ma-input--large .ma-input { padding-left: 44px; }

.has-suffix.ma-input--small .ma-input { padding-right: 30px; }
.has-suffix.ma-input--medium .ma-input { padding-right: 36px; }
.has-suffix.ma-input--large .ma-input { padding-right: 44px; }

/* Clear Button & Password Toggle */
.ma-input-clear,
.ma-input-password-toggle {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: var(--ma-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.ma-input-clear:hover,
.ma-input-password-toggle:hover {
  color: var(--ma-text-main);
  background-color: var(--ma-bg-secondary);
}

/* States */
.is-disabled .ma-input {
  background-color: var(--ma-bg-secondary);
  cursor: not-allowed;
  opacity: 0.7;
}

.is-error .ma-input {
  border-color: var(--ma-danger);
}

.is-error .ma-input:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.ma-input-helper {
  font-size: 0.75rem;
  color: var(--ma-text-secondary);
  min-height: 1.2em;
}

.ma-input-helper.is-error {
  color: var(--ma-danger);
}
</style>
