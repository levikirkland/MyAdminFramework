<template>
  <div class="users-page">
    <div class="page-header">
      <div>
        <h1>Users Management</h1>
        <p>Manage your team members and their account permissions.</p>
      </div>
      <MaButton color="primary" @click="showAddModal = true">+ Add User</MaButton>
    </div>

    <MaCard>
      <div class="table-controls">
        <div class="search-box">
          <MaInput 
            :model-value="searchQuery" 
            @update:model-value="handleSearch" 
            placeholder="Search users..." 
          />
        </div>
        <div class="filters">
          <MaButton color="secondary">Filter</MaButton>
        </div>
      </div>

      <MaTable 
        :columns="columns" 
        :data="users" 
        pagination 
        remote
        :total="total"
        :loading="loading"
        :per-page="perPage"
        exportable
        resizable
        reorderable
        density-control
        editable
        ai-enabled
        @ai-summarize="handleAiSummarize"
        @cell-edit="handleCellEdit"
        @page-change="handlePageChange"
        @sort="handleSort"
      >
        <template #cell(name)="{ row }">
          <div class="user-cell">
            <MaAvatar :text="row.name.split(' ').map((n: string) => n[0]).join('')" size="small" />
            <div class="user-meta">
              <div class="user-name">{{ row.name }}</div>
              <div class="user-email">{{ row.email }}</div>
            </div>
          </div>
        </template>
        <template #cell(status)="{ value }">
          <MaTag :type="value === 'Active' ? 'success' : value === 'Pending' ? 'warning' : 'default'" round>
            {{ value }}
          </MaTag>
        </template>
        <template #cell(actions)>
          <MaButton color="secondary">Edit</MaButton>
        </template>
      </MaTable>
      
      <template #footer>
        <details>
          <summary style="cursor: pointer; color: var(--ma-primary); font-size: 0.875rem;">Show Code</summary>
          <pre v-pre class="code-block" style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin-top: 8px; overflow-x: auto;"><code>&lt;MaTable 
  :columns="columns" 
  :data="users" 
  pagination 
  remote
  :total="total"
  :loading="loading"
  :per-page="perPage"
  exportable
  resizable
  reorderable
  density-control
  editable
  ai-enabled
  @ai-summarize="handleAiSummarize"
  @cell-edit="handleCellEdit"
  @page-change="handlePageChange"
  @sort="handleSort"
&gt;
  &lt;!-- Custom Cell Templates --&gt;
  &lt;template #cell(name)="{ row }"&gt;
    &lt;div class="user-cell"&gt;
      &lt;div class="user-avatar"&gt;{{ row.name[0] }}&lt;/div&gt;
      &lt;div class="user-meta"&gt;
        &lt;div class="user-name"&gt;{{ row.name }}&lt;/div&gt;
        &lt;div class="user-email"&gt;{{ row.email }}&lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/MaTable&gt;</code></pre>
        </details>
      </template>
    </MaCard>

    <MaModal v-model="showAddModal" title="Add New User">
      <div class="add-user-form">
        <MaInput v-model="newUser.name" label="Full Name" placeholder="e.g. John Doe" />
        <MaInput v-model="newUser.email" label="Email Address" placeholder="e.g. john@example.com" />
        <MaInput v-model="newUser.role" label="Role" placeholder="e.g. Editor" />
      </div>
      <template #footer>
        <MaButton color="secondary" @click="showAddModal = false">Cancel</MaButton>
        <MaButton color="primary" @click="addUser">Create User</MaButton>
      </template>
    </MaModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast, useCrud } from 'my-admin-framework'
import { mockApi, type User } from '../services/mockApi'

const showAddModal = ref(false)
const newUser = ref<Partial<User>>({ name: '', email: '', role: '', status: 'Active', lastActive: 'Just now' })
const { showToast } = useToast()

const handleAiSummarize = (data: any[]) => {
  showToast(`Analyzing ${data.length} records... (Mock AI Action)`, 'info')
}

const { 
  items: users, 
  total, 
  loading, 
  perPage, 
  searchQuery, 
  fetchList, 
  handleSort, 
  handlePageChange,
  handleSearch,
  createItem
} = useCrud<User>({
  api: {
    list: mockApi.fetchUsers,
    create: async (data) => { 
      // Mock create
      return { id: Date.now(), ...data } as User 
    },
    update: async (_id, data) => { return data as User },
    delete: async (_id) => { }
  },
  defaults: {
    perPage: 10,
    sortKey: 'name',
    sortOrder: 'asc'
  }
})

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role', sortable: true, editable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'lastActive', label: 'Last Active', sortable: true, editable: true },
  { key: 'actions', label: 'Actions', width: '100px' },
]

const handleCellEdit = ({ row, column, value, oldValue }: any) => {
  showToast(`Updated ${column.label} for ${row.name} from "${oldValue}" to "${value}"`, 'success')
}

onMounted(() => {
  fetchList()
})

const addUser = async () => {
  const success = await createItem(newUser.value)
  if (success) {
    showAddModal.value = false
    newUser.value = { name: '', email: '', role: '', status: 'Active', lastActive: 'Just now' }
  }
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: var(--ma-text-main);
}

.page-header p {
  color: var(--ma-text-muted);
  margin: 0;
}

.table-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
}

.search-box {
  flex: 1;
  max-width: 400px;
}

.filters {
  display: flex;
  gap: 12px;
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: var(--ma-primary-light);
  color: var(--ma-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.user-name {
  font-weight: 600;
  color: var(--ma-text-main);
}

.user-email {
  font-size: 0.75rem;
  color: var(--ma-text-muted);
}

.add-user-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
