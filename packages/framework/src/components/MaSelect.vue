<template>
  <div class="ma-select-container" ref="containerRef">
    <label v-if="label" class="ma-label">{{ label }}</label>
    
    <div 
      class="ma-select-trigger" 
      :class="{ 
        'is-focused': isOpen, 
        'is-disabled': disabled, 
        'has-error': error 
      }"
      @click="toggleDropdown"
    >
      <!-- Search Input (Visible when open and searchable) -->
      <input
        v-if="searchable && isOpen"
        ref="inputRef"
        v-model="searchQuery"
        class="ma-select-input"
        type="text"
        :placeholder="searchPlaceholder"
        @click.stop
        @keydown.enter.prevent="selectFirstOption"
      />

      <!-- Display Value (Visible when not searching) -->
      <div v-else class="ma-select-value" :class="{ 'is-placeholder': !selectedOption || (Array.isArray(selectedOption) && selectedOption.length === 0) }">
        <template v-if="multiple && Array.isArray(selectedOption) && selectedOption.length > 0">
          <div class="ma-select-tags">
            <span v-for="opt in selectedOption" :key="opt.value" class="ma-select-tag">
              {{ opt.label }}
              <span class="ma-select-tag-remove" @click.stop="removeTag(opt.value)">
                <X :size="12" />
              </span>
            </span>
          </div>
        </template>
        <template v-else>
          {{ !multiple && selectedOption ? (selectedOption as Option).label : (placeholder || 'Select option') }}
        </template>
      </div>

      <!-- Icons -->
      <div class="ma-select-icons">
        <div 
          v-if="clearable && modelValue && !disabled" 
          class="ma-select-clear"
          @click.stop="clearSelection"
        >
          <X :size="14" />
        </div>
        <div class="ma-select-arrow" :class="{ 'is-open': isOpen }">
          <ChevronDown :size="16" />
        </div>
      </div>
    </div>

    <!-- Dropdown Menu -->
    <Transition name="ma-zoom">
      <div v-if="isOpen" class="ma-select-dropdown">
        <div v-if="filteredOptions.length === 0" class="ma-select-empty">
          <slot name="empty">No results found</slot>
        </div>
        <div 
          v-else
          class="ma-select-options-list"
        >
          <div 
            v-for="option in filteredOptions" 
            :key="option.value"
            class="ma-select-option"
            :class="{ 'is-selected': isSelected(option) }"
            @click="selectOption(option)"
          >
            <span class="ma-select-option-label">{{ option.label }}</span>
            <Check v-if="isSelected(option)" :size="14" class="ma-select-check" />
          </div>
        </div>
      </div>
    </Transition>

    <span v-if="error" class="ma-error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { ChevronDown, Check, X } from 'lucide-vue-next';

interface Option {
  label: string;
  value: string | number;
}

const props = withDefaults(defineProps<{
  modelValue: string | number | (string | number)[] | null;
  options: (string | number | Option)[];
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  multiple?: boolean;
}>(), {
  modelValue: null,
  options: () => [],
  searchable: false,
  clearable: false,
  multiple: false
});

const emit = defineEmits(['update:modelValue', 'change', 'clear']);

const containerRef = ref<HTMLElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);
const isOpen = ref(false);
const searchQuery = ref('');

// Normalize options to ensure they are always objects
const normalizedOptions = computed<Option[]>(() => {
  return props.options.map(opt => {
    if (typeof opt === 'object' && opt !== null) {
      return opt as Option;
    }
    return { label: String(opt), value: opt };
  });
});

// Get the currently selected option object(s)
const selectedOption = computed(() => {
  if (props.multiple) {
    if (!Array.isArray(props.modelValue)) return [];
    return normalizedOptions.value.filter(opt => (props.modelValue as any[]).includes(opt.value));
  }
  return normalizedOptions.value.find(opt => opt.value === props.modelValue);
});

// Filter options based on search query
const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) {
    return normalizedOptions.value;
  }
  const query = searchQuery.value.toLowerCase();
  return normalizedOptions.value.filter(opt => 
    opt.label.toLowerCase().includes(query)
  );
});

const searchPlaceholder = computed(() => {
  if (props.multiple) {
    return props.placeholder || 'Select options';
  }
  if (selectedOption.value && !Array.isArray(selectedOption.value)) {
    return selectedOption.value.label;
  }
  return props.placeholder || 'Select option';
});

const toggleDropdown = () => {
  if (props.disabled) return;
  
  if (isOpen.value) {
    closeDropdown();
  } else {
    openDropdown();
  }
};

const openDropdown = () => {
  isOpen.value = true;
  searchQuery.value = ''; // Reset search on open
  if (props.searchable) {
    nextTick(() => {
      inputRef.value?.focus();
    });
  }
};

const closeDropdown = () => {
  isOpen.value = false;
  searchQuery.value = '';
};

const selectOption = (option: Option) => {
  if (props.multiple) {
    const currentValues = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
    const index = currentValues.indexOf(option.value);
    
    if (index === -1) {
      currentValues.push(option.value);
    } else {
      currentValues.splice(index, 1);
    }
    
    emit('update:modelValue', currentValues);
    emit('change', currentValues);
    // Do not close dropdown on multiple select
  } else {
    emit('update:modelValue', option.value);
    emit('change', option.value);
    closeDropdown();
  }
};

const isSelected = (option: Option) => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.includes(option.value);
  }
  return props.modelValue === option.value;
};

const selectFirstOption = () => {
  const firstOption = filteredOptions.value[0];
  if (firstOption) {
    selectOption(firstOption);
  }
};

const clearSelection = () => {
  emit('update:modelValue', props.multiple ? [] : null);
  emit('clear');
};

const removeTag = (value: string | number) => {
  if (!props.multiple || !Array.isArray(props.modelValue)) return;
  const newValue = props.modelValue.filter(v => v !== value);
  emit('update:modelValue', newValue);
  emit('change', newValue);
};

// Click outside to close
const handleClickOutside = (event: MouseEvent) => {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    closeDropdown();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.ma-select-container {
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  width: 100%;
}

.ma-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ma-text-main);
}

.ma-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 38px;
  padding: 0 12px;
  background-color: var(--ma-bg-card);
  border: 1px solid var(--ma-border);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.ma-select-trigger:hover {
  border-color: var(--ma-text-muted);
}

.ma-select-trigger.is-focused {
  border-color: var(--ma-primary);
  box-shadow: 0 0 0 2px var(--ma-primary-light);
}

.ma-select-trigger.has-error {
  border-color: var(--ma-danger);
}

.ma-select-trigger.is-disabled {
  background-color: var(--ma-bg-secondary);
  cursor: not-allowed;
  opacity: 0.7;
}

.ma-select-value {
  font-size: 0.9rem;
  color: var(--ma-text-main);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.ma-select-value.is-placeholder {
  color: var(--ma-text-muted);
}

.ma-select-input {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  font-size: 0.9rem;
  color: var(--ma-text-main);
  padding: 0;
  margin: 0;
  height: 100%;
}

.ma-select-icons {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
}

.ma-select-arrow {
  color: var(--ma-text-muted);
  transition: transform 0.2s;
  display: flex;
  align-items: center;
}

.ma-select-arrow.is-open {
  transform: rotate(180deg);
}

.ma-select-clear {
  color: var(--ma-text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 2px;
  border-radius: 50%;
  transition: all 0.2s;
}

.ma-select-clear:hover {
  background-color: var(--ma-bg-secondary);
  color: var(--ma-text-main);
}

/* Dropdown */
.ma-select-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background-color: var(--ma-bg-card);
  border: 1px solid var(--ma-border);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  max-height: 250px;
  overflow-y: auto;
  padding: 4px;
}

.ma-select-options-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ma-select-option {
  padding: 8px 12px;
  font-size: 0.9rem;
  color: var(--ma-text-main);
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.2s;
}

.ma-select-option:hover {
  background-color: var(--ma-bg-secondary);
}

.ma-select-option.is-selected {
  background-color: var(--ma-primary-light);
  color: var(--ma-primary);
  font-weight: 500;
}

.ma-select-check {
  color: var(--ma-primary);
}

.ma-select-empty {
  padding: 12px;
  text-align: center;
  color: var(--ma-text-muted);
  font-size: 0.875rem;
}

.ma-error {
  font-size: 0.75rem;
  color: var(--ma-danger);
}

/* Transitions */
.ma-zoom-enter-active,
.ma-zoom-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform-origin: top center;
}

.ma-zoom-enter-from,
.ma-zoom-leave-to {
  opacity: 0;
  transform: scaleY(0.9);
}
</style>
