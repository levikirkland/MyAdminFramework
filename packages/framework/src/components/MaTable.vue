<template>
  <div 
    class="ma-table-wrapper" 
    :class="{ 
      'is-loading': loading,
      'is-sticky-header': stickyHeader
    }"
    :style="{ maxHeight: height }"
  >
    <div v-if="exportable || densityControl || aiEnabled" class="ma-table-toolbar">
      <div class="ma-table-toolbar-spacer"></div>
      
      <div v-if="densityControl" class="ma-table-density-control">
        <MaSelect 
          v-model="currentSize" 
          :options="densityOptions" 
          size="small"
          :placeholder="t('table.density')"
          style="width: 120px; margin-right: 8px;"
        />
      </div>

      <MaButton v-if="exportable" size="small" variant="outline" @click="exportCSV">
        <template #icon><Download :size="16" /></template>
        {{ t('table.exportCSV') }}
      </MaButton>

      <MaButton v-if="aiEnabled" size="small" variant="ghost" @click="handleAiSummarize">
        <template #icon><MaIcon name="Sparkles" :size="16" /></template>
        Summarize
      </MaButton>
    </div>

    <div class="ma-table-container">
      <div v-if="loading" class="ma-table-loading-overlay">
        <MaSpinner size="40" />
      </div>
      
      <table 
        class="ma-table" 
        :class="[
          `ma-table--${currentSize}`,
          { 'ma-table--hover': hover }
        ]"
      >
        <thead>
          <draggable 
            v-model="localColumns" 
            tag="tr" 
            item-key="key" 
            :disabled="!reorderable"
            handle=".drag-handle"
            ghost-class="ghost-header"
          >
            <template #header>
              <th v-if="selectable" class="ma-table-selection-col">
                <div class="ma-selection-wrapper">
                  <MaCheckbox 
                    :modelValue="isAllSelected" 
                    :indeterminate="isIndeterminate"
                    @update:modelValue="toggleSelectAll" 
                  />
                </div>
              </th>
            </template>
            
            <template #item="{ element: column }">
              <th
                :style="{ width: column.width }"
                :class="{ 'is-sortable': column.sortable, 'is-resizable': resizable }"
              >
                <div class="th-wrapper">
                  <div class="th-content" @click="column.sortable && handleSort(column.key)">
                    <span v-if="reorderable" class="drag-handle">
                      <GripVertical :size="14" />
                    </span>
                    {{ column.label }}
                    <span v-if="column.sortable" class="sort-icon">
                      <ArrowUp v-if="sortKey === column.key && sortOrder === 'asc'" :size="14" />
                      <ArrowDown v-else-if="sortKey === column.key && sortOrder === 'desc'" :size="14" />
                      <ArrowUpDown v-else :size="14" />
                    </span>
                  </div>
                  <div v-if="column.filterable" class="filter-icon" @click.stop="toggleFilter(column.key)">
                    <Filter :size="14" :class="{ 'is-active': filters[column.key] || activeFilterColumn === column.key }" />
                  </div>
                </div>
                
                <div v-if="activeFilterColumn === column.key" class="th-filter-dropdown" @click.stop>
                  <MaInput 
                    :modelValue="filters[column.key]"
                    @update:modelValue="(val: any) => updateFilter(column.key, val)"
                    size="small" 
                    :placeholder="t('table.filter')" 
                    autofocus
                  />
                </div>

                <div 
                  v-if="resizable" 
                  class="resize-handle"
                  @mousedown.stop.prevent="(e) => handleResizeStart(e, column)"
                  @click.stop
                ></div>
              </th>
            </template>
          </draggable>
        </thead>
        <tbody>
          <tr 
            v-for="(row, index) in displayData" 
            :key="getRowKey(row, index)" 
            :class="{ 
              'ma-table-row--striped': striped && index % 2 !== 0,
              'is-selected': isRowSelected(row)
            }"
            @click="handleRowClick(row)"
          >
            <td v-if="selectable" class="ma-table-selection-col">
              <div class="ma-selection-wrapper" @click.stop>
                <MaCheckbox 
                  :modelValue="isRowSelected(row)"
                  @update:modelValue="toggleSelectRow(row)"
                />
              </div>
            </td>
            <td 
              v-for="column in localColumns" 
              :key="column.key"
              :class="{ 'is-editable': editable && column.editable }"
              @dblclick="startEdit(row, column)"
            >
              <div v-if="editingCell?.rowKey === getRowKey(row, index) && editingCell?.colKey === column.key" class="ma-table-edit-cell">
                <MaInput 
                  v-model="editValue" 
                  size="small" 
                  class="ma-table-edit-input"
                  @keyup.enter="saveEdit(row, column)"
                  @keyup.esc="cancelEdit"
                />
                <div class="edit-actions">
                  <button class="edit-btn save" @click.stop="saveEdit(row, column)"><Check :size="12" /></button>
                  <button class="edit-btn cancel" @click.stop="cancelEdit"><X :size="12" /></button>
                </div>
              </div>
              <slot v-else :name="`cell(${column.key})`" :row="row" :value="row[column.key]">
                {{ row[column.key] }}
              </slot>
            </td>
          </tr>
          <tr v-if="displayData.length === 0 && !loading">
            <td :colspan="localColumns.length + (selectable ? 1 : 0)" class="ma-table-empty-cell">
              <MaEmpty />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="pagination" class="ma-table-pagination">
      <div class="pagination-info">
        {{ t('table.total').replace('{total}', String(totalItems)) }}
      </div>
      <MaPagination 
        v-model="currentPageModel" 
        :total="totalItems" 
        :page-size="perPage"
        @change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { ArrowUp, ArrowDown, ArrowUpDown, Filter, Download, GripVertical, Check, X } from 'lucide-vue-next'
import draggable from 'vuedraggable'
import MaCheckbox from './MaCheckbox.vue'
import MaSpinner from './MaSpinner.vue'
import MaEmpty from './MaEmpty.vue'
import MaPagination from './MaPagination.vue'
import MaInput from './MaInput.vue'
import MaButton from './MaButton.vue'
import MaSelect from './MaSelect.vue'
import MaIcon from './MaIcon.vue'
import { useMaLocale } from '../locale'

interface Column {
  key: string;
  label: string;
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  editable?: boolean;
}

const props = withDefaults(defineProps<{
  columns: Column[];
  data: any[];
  striped?: boolean;
  pagination?: boolean;
  perPage?: number;
  loading?: boolean;
  selectable?: boolean;
  selected?: any[];
  rowKey?: string;
  remote?: boolean;
  total?: number;
  hover?: boolean;
  size?: 'small' | 'medium' | 'large';
  stickyHeader?: boolean;
  height?: string;
  exportable?: boolean;
  resizable?: boolean;
  reorderable?: boolean;
  editable?: boolean;
  densityControl?: boolean;
  aiEnabled?: boolean;
}>(), {
  striped: false,
  pagination: false,
  perPage: 10,
  loading: false,
  selectable: false,
  selected: () => [],
  rowKey: 'id',
  remote: false,
  total: 0,
  hover: true,
  size: 'medium',
  stickyHeader: false,
  exportable: false,
  resizable: false,
  reorderable: false,
  editable: false,
  densityControl: false
});

const { t } = useMaLocale()

const emit = defineEmits(['sort', 'page-change', 'update:selected', 'row-click', 'update:data', 'cell-edit', 'ai-summarize'])

// Local Columns for Reordering and Resizing
const localColumns = ref<Column[]>([])

watch(() => props.columns, (newCols) => {
  localColumns.value = newCols.map(col => ({ ...col }))
}, { immediate: true, deep: true })

// Density
const currentSize = ref(props.size)
const densityOptions = computed(() => [
  { label: t('table.densitySmall'), value: 'small' },
  { label: t('table.densityMedium'), value: 'medium' },
  { label: t('table.densityLarge'), value: 'large' }
])

// Filtering
const filters = ref<Record<string, string>>({})
const activeFilterColumn = ref<string | null>(null)

// Initialize filters for reactive stability
watch(() => props.columns, (cols) => {
  cols.forEach(col => {
    if (col.filterable && filters.value[col.key] === undefined) {
      filters.value[col.key] = ''
    }
  })
}, { immediate: true })

const toggleFilter = (key: string) => {
  if (activeFilterColumn.value === key) {
    activeFilterColumn.value = null
  } else {
    activeFilterColumn.value = key
  }
}

const updateFilter = (key: string, value: string) => {
  filters.value[key] = value
}
const handleAiSummarize = () => {
  // Emit the current display data for AI processing
  emit('ai-summarize', displayData.value)
}


// Resizing
const resizingColumn = ref<string | null>(null)
const startX = ref(0)
const startWidth = ref(0)

const handleResizeStart = (e: MouseEvent, column: Column) => {
  if (!props.resizable) return
  resizingColumn.value = column.key
  startX.value = e.pageX
  const th = (e.target as HTMLElement).closest('th')
  if (th) {
    startWidth.value = th.offsetWidth
  }
  
  document.addEventListener('mousemove', handleResizeMove)
  document.addEventListener('mouseup', handleResizeEnd)
}

const handleResizeMove = (e: MouseEvent) => {
  if (!resizingColumn.value) return
  const diff = e.pageX - startX.value
  const newWidth = Math.max(50, startWidth.value + diff)
  
  const col = localColumns.value.find(c => c.key === resizingColumn.value)
  if (col) {
    col.width = `${newWidth}px`
  }
}

const handleResizeEnd = () => {
  resizingColumn.value = null
  document.removeEventListener('mousemove', handleResizeMove)
  document.removeEventListener('mouseup', handleResizeEnd)
}

// Inline Editing
const editingCell = ref<{ rowKey: any, colKey: string } | null>(null)
const editValue = ref('')

const startEdit = (row: any, column: Column) => {
  if (!props.editable || !column.editable) return
  const key = getRowKey(row, 0) // index 0 is dummy
  editingCell.value = { rowKey: key, colKey: column.key }
  editValue.value = row[column.key]
  
  nextTick(() => {
    const input = document.querySelector('.ma-table-edit-input input') as HTMLInputElement
    if (input) input.focus()
  })
}

const saveEdit = (row: any, column: Column) => {
  if (!editingCell.value) return
  
  // Create a copy of data to emit update
  const newData = [...props.data]
  const rowIndex = newData.findIndex(r => getRowKey(r, 0) === editingCell.value?.rowKey)
  
  if (rowIndex > -1) {
    newData[rowIndex] = { ...newData[rowIndex], [column.key]: editValue.value }
    emit('update:data', newData)
    emit('cell-edit', { row, column, value: editValue.value, oldValue: row[column.key] })
  }
  
  editingCell.value = null
}

const cancelEdit = () => {
  editingCell.value = null
}

const exportCSV = () => {
  const dataToExport = sortedData.value
  
  if (!dataToExport.length) return

  const headers = localColumns.value.map(col => col.label).join(',')
  const rows = dataToExport.map(row => {
    return localColumns.value.map(col => {
      let cell = row[col.key]
      if (cell === null || cell === undefined) cell = ''
      cell = String(cell).replace(/"/g, '""')
      if (cell.includes(',') || cell.includes('"') || cell.includes('\n')) {
        cell = `"${cell}"`
      }
      return cell
    }).join(',')
  }).join('\n')

  const csvContent = `${headers}\n${rows}`
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'export.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

const filteredData = computed(() => {
  if (props.remote) return props.data;
  
  let result = [...props.data];
  
  Object.keys(filters.value).forEach(key => {
    const val = filters.value[key];
    if (val && typeof val === 'string') {
      const filterValue = val.toLowerCase().trim();
      if (!filterValue) return;

      result = result.filter(item => {
        const rawValue = item[key];
        const itemValue = String(rawValue || '').toLowerCase();
        return itemValue.includes(filterValue);
      });
    }
  });
  
  return result;
})

// Sorting
const sortKey = ref('')
const sortOrder = ref<'asc' | 'desc' | ''>('')

const handleSort = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
  emit('sort', { key: sortKey.value, order: sortOrder.value })
}

// Pagination
const internalPage = ref(1)
const currentPageModel = computed({
  get: () => internalPage.value,
  set: (val) => internalPage.value = val
})

const totalItems = computed(() => props.remote ? props.total : filteredData.value.length)

const sortedData = computed(() => {
  if (props.remote) return props.data;
  
  let result = [...filteredData.value];
  if (sortKey.value) {
    result.sort((a, b) => {
      const valA = a[sortKey.value];
      const valB = b[sortKey.value];
      if (valA < valB) return sortOrder.value === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder.value === 'asc' ? 1 : -1;
      return 0;
    });
  }
  return result;
})

const displayData = computed(() => {
  if (props.remote || !props.pagination) return sortedData.value;
  
  const start = (internalPage.value - 1) * props.perPage;
  const end = start + props.perPage;
  return sortedData.value.slice(start, end);
})

const handlePageChange = (page: number) => {
  emit('page-change', page)
}

// Selection
const getRowKey = (row: any, index: number) => {
  const val = row[props.rowKey];
  return val !== undefined ? val : index;
}

const isRowSelected = (row: any) => {
  const key = getRowKey(row, 0); // index doesn't matter for check
  return props.selected.some(item => getRowKey(item, 0) === key);
}

const toggleSelectRow = (row: any) => {
  const key = getRowKey(row, 0);
  let newSelected = [...props.selected];
  const index = newSelected.findIndex(item => getRowKey(item, 0) === key);
  
  if (index > -1) {
    newSelected.splice(index, 1);
  } else {
    newSelected.push(row);
  }
  emit('update:selected', newSelected);
}

const isAllSelected = computed(() => {
  if (displayData.value.length === 0) return false;
  return displayData.value.every(row => isRowSelected(row));
})

const isIndeterminate = computed(() => {
  if (displayData.value.length === 0) return false;
  const selectedCount = displayData.value.filter(row => isRowSelected(row)).length;
  return selectedCount > 0 && selectedCount < displayData.value.length;
})

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    // Deselect all visible
    const visibleKeys = new Set(displayData.value.map(row => getRowKey(row, 0)));
    const newSelected = props.selected.filter(item => !visibleKeys.has(getRowKey(item, 0)));
    emit('update:selected', newSelected);
  } else {
    // Select all visible
    const newSelected = [...props.selected];
    displayData.value.forEach(row => {
      if (!isRowSelected(row)) {
        newSelected.push(row);
      }
    });
    emit('update:selected', newSelected);
  }
}

const handleRowClick = (row: any) => {
  emit('row-click', row);
}

// Watchers
watch(() => props.data, () => {
  if (!props.remote && internalPage.value > 1) {
    const maxPage = Math.ceil(props.data.length / props.perPage);
    if (internalPage.value > maxPage) {
      internalPage.value = Math.max(1, maxPage);
    }
  }
})
</script>

<style scoped>
.ma-table-wrapper {
  position: relative;
  width: 100%;
  border: 1px solid var(--ma-border);
  border-radius: 8px;
  background: var(--ma-bg-card, #fff);
  display: flex;
  flex-direction: column;
}

.ma-table-container {
  position: relative;
  overflow: auto;
  flex-grow: 1;
}

.ma-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  text-align: left;
  font-size: 0.875rem;
}

.ma-table th {
  background-color: var(--ma-bg-secondary, #f8fafc);
  color: var(--ma-text-secondary);
  font-weight: 600;
  padding: 12px 16px;
  border-bottom: 1px solid var(--ma-border);
  white-space: nowrap;
  position: relative;
}

.is-sticky-header .ma-table th {
  position: sticky;
  top: 0;
  z-index: 2;
}

.ma-table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--ma-border);
  color: var(--ma-text-main, #334155);
  transition: background-color 0.2s;
}

.ma-table tr:last-child td {
  border-bottom: none;
}

.ma-table-row--striped {
  background-color: var(--ma-bg-page, #f1f5f9);
}

.ma-table--hover tr:hover td {
  background-color: var(--ma-bg-secondary, #f8fafc);
}

.ma-table tr.is-selected td {
  background-color: var(--ma-primary-light);
}

/* Sizes */
.ma-table--small th,
.ma-table--small td {
  padding: 8px 12px;
  font-size: 0.75rem;
}

.ma-table--large th,
.ma-table--large td {
  padding: 16px 24px;
  font-size: 1rem;
}

/* Sortable */
.ma-table th.is-sortable {
  cursor: pointer;
  user-select: none;
}

.ma-table th.is-sortable:hover {
  background-color: var(--ma-border);
}

.th-content {
  display: flex;
  align-items: center;
  gap: 6px;
}

.sort-icon {
  display: flex;
  align-items: center;
  color: var(--ma-text-muted, #94a3b8);
}

/* Selection */
.ma-table-selection-col {
  width: 50px;
  text-align: center;
}

.ma-selection-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: default;
}

/* Loading */
.ma-table-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark .ma-table-loading-overlay {
  background: rgba(0, 0, 0, 0.7);
}

/* Empty */
.ma-table-empty-cell {
  text-align: center;
  padding: 32px;
}

/* Pagination */
.ma-table-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-top: 1px solid var(--ma-border);
  background-color: var(--ma-bg-card, #fff);
}

.pagination-info {
  color: var(--ma-text-secondary);
  font-size: 0.875rem;
}

/* Filtering */
.th-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.filter-icon {
  cursor: pointer;
  color: var(--ma-text-muted, #94a3b8);
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  transition: all 0.2s;
}

.filter-icon:hover {
  background-color: var(--ma-bg-secondary, #f1f5f9);
  color: var(--ma-text-main, #334155);
}

.filter-icon .is-active {
  color: var(--ma-primary);
}

.th-filter-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--ma-bg-card, #ffffff);
  padding: 8px;
  border: 1px solid var(--ma-border);
  border-radius: 0 0 6px 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 150px;
}

/* Toolbar */
.ma-table-toolbar {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--ma-border);
  background-color: var(--ma-bg-card, #fff);
}

.ma-table-toolbar-spacer {
  flex: 1;
}

/* Resizable */
.ma-table th.is-resizable {
  position: relative;
}

.resize-handle {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  cursor: col-resize;
  background-color: transparent;
  transition: background-color 0.2s;
  z-index: 1;
}

.resize-handle:hover,
.ma-table th:hover .resize-handle {
  background-color: var(--ma-primary);
}

/* Reorderable */
.drag-handle {
  cursor: grab;
  color: var(--ma-text-muted);
  margin-right: 4px;
  display: flex;
  align-items: center;
}

.drag-handle:active {
  cursor: grabbing;
}

.ghost-header {
  opacity: 0.5;
  background: var(--ma-bg-secondary);
}

/* Editable */
.ma-table td.is-editable {
  cursor: text;
}

.ma-table td.is-editable:hover {
  background-color: var(--ma-bg-secondary);
  box-shadow: inset 0 0 0 1px var(--ma-border);
}

.ma-table-edit-cell {
  display: flex;
  align-items: center;
  gap: 4px;
}

.ma-table-edit-input {
  flex: 1;
  min-width: 0;
}

.edit-actions {
  display: flex;
  gap: 2px;
}

.edit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}

.edit-btn.save {
  background-color: var(--ma-success);
}

.edit-btn.cancel {
  background-color: var(--ma-danger);
}

.ma-table-density-control {
  display: flex;
  align-items: center;
}
</style>
