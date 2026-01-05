<template>
  <div class="ma-pagination" :class="{ 'ma-pagination--simple': simple, 'ma-pagination--disabled': disabled }">
    <!-- Total -->
    <span v-if="showTotal" class="ma-pagination-total">
      Total {{ total }} items
    </span>

    <!-- Prev Button -->
    <button 
      class="ma-pagination-btn" 
      :disabled="disabled || modelValue <= 1"
      @click="changePage(modelValue - 1)"
    >
      <ChevronLeft :size="16" />
    </button>
    
    <!-- Simple Mode -->
    <div v-if="simple" class="ma-pagination-simple-pager">
      <input 
        type="text" 
        :value="modelValue" 
        @keydown.enter="handleJump($event)"
        @blur="handleJump($event)"
        :disabled="disabled"
      />
      <span class="ma-pagination-slash">/</span>
      <span>{{ totalPages }}</span>
    </div>

    <!-- Normal Mode Pages -->
    <div v-else class="ma-pagination-pages">
      <button 
        v-for="page in displayedPages" 
        :key="page"
        class="ma-pagination-item"
        :class="{ 'is-active': modelValue === page, 'is-ellipsis': typeof page !== 'number' }"
        @click="typeof page === 'number' ? changePage(page) : null"
        :disabled="disabled || typeof page !== 'number'"
      >
        <span v-if="typeof page === 'number'">{{ page }}</span>
        <MoreHorizontal v-else :size="16" />
      </button>
    </div>

    <!-- Next Button -->
    <button 
      class="ma-pagination-btn" 
      :disabled="disabled || modelValue >= totalPages"
      @click="changePage(modelValue + 1)"
    >
      <ChevronRight :size="16" />
    </button>

    <!-- Size Changer -->
    <div v-if="showSizeChanger" class="ma-pagination-options">
      <select 
        class="ma-pagination-size-changer" 
        :value="pageSize" 
        @change="handleSizeChange"
        :disabled="disabled"
      >
        <option v-for="opt in pageSizeOptions" :key="opt" :value="opt">
          {{ opt }} / page
        </option>
      </select>
    </div>

    <!-- Quick Jumper -->
    <div v-if="showQuickJumper" class="ma-pagination-jumper">
      Go to
      <input 
        type="text" 
        :disabled="disabled"
        @keydown.enter="handleJump($event)"
        @blur="handleJump($event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-vue-next';

const props = withDefaults(defineProps<{
  modelValue: number;
  total: number;
  pageSize?: number;
  siblingCount?: number;
  disabled?: boolean;
  simple?: boolean;
  showTotal?: boolean;
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
  showQuickJumper?: boolean;
}>(), {
  pageSize: 10,
  siblingCount: 1,
  disabled: false,
  simple: false,
  showTotal: false,
  showSizeChanger: false,
  pageSizeOptions: () => [10, 20, 50, 100],
  showQuickJumper: false
});

const emit = defineEmits(['update:modelValue', 'update:pageSize', 'change']);

const totalPages = computed(() => Math.ceil(props.total / props.pageSize));

const displayedPages = computed(() => {
  const total = totalPages.value;
  const current = props.modelValue;
  const sibling = props.siblingCount;
  
  // Case 1: Total pages is small, show all
  if (total <= 5 + sibling * 2) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(current - sibling, 1);
  const rightSiblingIndex = Math.min(current + sibling, total);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < total - 2;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * sibling;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, '...', total];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * sibling;
    const rightRange = Array.from({ length: rightItemCount }, (_, i) => total - rightItemCount + i + 1);
    return [1, '...', ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [1, '...', ...middleRange, '...', total];
  }
  
  return [];
});

const changePage = (page: number) => {
  if (props.disabled) return;
  if (page < 1 || page > totalPages.value) return;
  emit('update:modelValue', page);
  emit('change', page);
};

const handleSizeChange = (e: Event) => {
  const val = Number((e.target as HTMLSelectElement).value);
  emit('update:pageSize', val);
  // Reset to page 1 when size changes to avoid out of bounds
  emit('update:modelValue', 1);
};

const handleJump = (e: Event) => {
  const val = (e.target as HTMLInputElement).value;
  const page = Number(val);
  if (!isNaN(page)) {
    changePage(page);
  }
  (e.target as HTMLInputElement).value = '';
};
</script>

<style scoped>
.ma-pagination {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--ma-text-main, #334155);
  gap: 8px;
}

.ma-pagination--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.ma-pagination--disabled * {
  pointer-events: none;
}

.ma-pagination-total {
  margin-right: 8px;
  color: var(--ma-text-secondary, #64748b);
}

.ma-pagination-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid var(--ma-border, #e2e8f0);
  background-color: var(--ma-bg-main, #fff);
  border-radius: 4px;
  cursor: pointer;
  color: var(--ma-text-main, #334155);
  transition: all 0.2s;
}

.ma-pagination-btn:hover:not(:disabled) {
  border-color: var(--ma-primary, #0284c7);
  color: var(--ma-primary, #0284c7);
}

.ma-pagination-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
  background-color: var(--ma-bg-secondary, #f1f5f9);
}

.ma-pagination-pages {
  display: flex;
  gap: 8px;
}

.ma-pagination-item {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 6px;
  border: 1px solid var(--ma-border, #e2e8f0);
  background-color: var(--ma-bg-main, #fff);
  border-radius: 4px;
  cursor: pointer;
  color: var(--ma-text-main, #334155);
  transition: all 0.2s;
  font-weight: 500;
}

.ma-pagination-item:hover:not(:disabled):not(.is-ellipsis) {
  border-color: var(--ma-primary, #0284c7);
  color: var(--ma-primary, #0284c7);
}

.ma-pagination-item.is-active {
  background-color: var(--ma-primary, #0284c7);
  border-color: var(--ma-primary, #0284c7);
  color: #fff;
}

.ma-pagination-item.is-ellipsis {
  border: none;
  background: transparent;
  cursor: default;
  color: var(--ma-text-secondary, #94a3b8);
}

/* Simple Mode */
.ma-pagination-simple-pager {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.ma-pagination-simple-pager input {
  width: 40px;
  height: 32px;
  padding: 0 4px;
  text-align: center;
  border: 1px solid var(--ma-border, #e2e8f0);
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s;
}

.ma-pagination-simple-pager input:focus {
  border-color: var(--ma-primary, #0284c7);
}

.ma-pagination-slash {
  color: var(--ma-text-secondary, #94a3b8);
}

/* Options & Jumper */
.ma-pagination-options,
.ma-pagination-jumper {
  margin-left: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.ma-pagination-size-changer {
  height: 32px;
  padding: 0 8px;
  border: 1px solid var(--ma-border, #e2e8f0);
  border-radius: 4px;
  background-color: var(--ma-bg-main, #fff);
  outline: none;
  cursor: pointer;
}

.ma-pagination-jumper input {
  width: 48px;
  height: 32px;
  padding: 0 4px;
  text-align: center;
  border: 1px solid var(--ma-border, #e2e8f0);
  border-radius: 4px;
  outline: none;
}

.ma-pagination-jumper input:focus {
  border-color: var(--ma-primary, #0284c7);
}
</style>
