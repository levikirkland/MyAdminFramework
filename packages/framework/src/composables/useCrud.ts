import { ref } from 'vue'
import { useToast } from './useToast'

interface CrudOptions<T> {
  api: {
    list: (params: any) => Promise<{ data: T[]; total: number }>
    create: (data: Partial<T>) => Promise<T>
    update: (id: string | number, data: Partial<T>) => Promise<T>
    delete: (id: string | number) => Promise<void>
  }
  defaults?: {
    perPage?: number
    sortKey?: string
    sortOrder?: 'asc' | 'desc'
  }
}

export function useCrud<T extends { id: string | number }>(options: CrudOptions<T>) {
  const { showToast } = useToast()
  
  // State
  const items = ref<T[]>([]) as any
  const total = ref(0)
  const loading = ref(false)
  const submitting = ref(false)
  
  // Pagination & Sorting
  const currentPage = ref(1)
  const perPage = ref(options.defaults?.perPage || 10)
  const sortKey = ref(options.defaults?.sortKey || '')
  const sortOrder = ref(options.defaults?.sortOrder || 'asc')
  const searchQuery = ref('')
  const filters = ref<Record<string, any>>({})

  // Actions
  const fetchList = async () => {
    loading.value = true
    try {
      const params = {
        page: currentPage.value,
        perPage: perPage.value,
        sortBy: sortKey.value,
        sortOrder: sortOrder.value,
        search: searchQuery.value,
        ...filters.value
      }
      
      const response = await options.api.list(params)
      items.value = response.data
      total.value = response.total
    } catch (error: any) {
      showToast(error.message || 'Failed to fetch data', 'error')
    } finally {
      loading.value = false
    }
  }

  const createItem = async (data: Partial<T>) => {
    submitting.value = true
    try {
      await options.api.create(data)
      showToast('Item created successfully', 'success')
      fetchList()
      return true
    } catch (error: any) {
      showToast(error.message || 'Failed to create item', 'error')
      return false
    } finally {
      submitting.value = false
    }
  }

  const updateItem = async (id: string | number, data: Partial<T>) => {
    submitting.value = true
    try {
      await options.api.update(id, data)
      showToast('Item updated successfully', 'success')
      fetchList()
      return true
    } catch (error: any) {
      showToast(error.message || 'Failed to update item', 'error')
      return false
    } finally {
      submitting.value = false
    }
  }

  const deleteItem = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    loading.value = true
    try {
      await options.api.delete(id)
      showToast('Item deleted successfully', 'success')
      
      // Handle page deletion logic (go back if empty)
      if (items.value.length === 1 && currentPage.value > 1) {
        currentPage.value--
      } else {
        fetchList()
      }
    } catch (error: any) {
      showToast(error.message || 'Failed to delete item', 'error')
      loading.value = false
    }
  }

  // Event Handlers for MaTable
  const handleSort = ({ key, order }: { key: string, order: 'asc' | 'desc' }) => {
    sortKey.value = key
    sortOrder.value = order
    fetchList()
  }

  const handlePageChange = (page: number) => {
    currentPage.value = page
    fetchList()
  }

  const handleSearch = (query: string) => {
    searchQuery.value = query
    currentPage.value = 1
    fetchList()
  }

  return {
    items,
    total,
    loading,
    submitting,
    currentPage,
    perPage,
    sortKey,
    sortOrder,
    searchQuery,
    filters,
    fetchList,
    createItem,
    updateItem,
    deleteItem,
    handleSort,
    handlePageChange,
    handleSearch
  }
}
