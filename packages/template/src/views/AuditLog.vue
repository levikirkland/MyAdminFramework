<template>
  <div class="audit-log-page">
    <div class="page-header">
      <h1>Audit Log</h1>
      <p>View system activity and security events.</p>
    </div>

    <MaCard>
      <div class="table-controls">
        <div class="search-box">
          <MaInput v-model="searchQuery" placeholder="Search logs..." prefix-icon="Search" />
        </div>
        <div class="filters">
          <MaSelect v-model="filterType" :options="['All', 'User', 'System', 'Security']" placeholder="Type" style="width: 150px" />
          <MaDatePicker v-model="dateRange" range placeholder="Date Range" />
          <MaButton color="secondary" @click="exportLogs">Export</MaButton>
        </div>
      </div>

      <MaTable 
        :columns="columns" 
        :data="filteredLogs" 
        pagination 
        :total="filteredLogs.length"
        :per-page="10"
        hover
        striped
        exportable
      >
        <template #cell(status)="{ value }">
          <MaBadge :color="getStatusColor(value)" pill>{{ value }}</MaBadge>
        </template>
        <template #cell(details)="{ value }">
          <span class="text-muted">{{ value }}</span>
        </template>
      </MaTable>
    </MaCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const filterType = ref('All')
const dateRange = ref([])

const columns = [
  { key: 'timestamp', label: 'Timestamp', sortable: true, width: '180px' },
  { key: 'user', label: 'User', sortable: true },
  { key: 'action', label: 'Action', sortable: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'details', label: 'Details' }
]

const logs = [
  { id: 1, timestamp: '2023-12-18 14:30:05', user: 'Andy Admin', action: 'Login', type: 'Security', status: 'Success', details: 'IP: 192.168.1.1' },
  { id: 2, timestamp: '2023-12-18 14:35:12', user: 'Andy Admin', action: 'Update Profile', type: 'User', status: 'Success', details: 'Changed email' },
  { id: 3, timestamp: '2023-12-18 15:00:00', user: 'System', action: 'Backup', type: 'System', status: 'Success', details: 'Daily backup completed' },
  { id: 4, timestamp: '2023-12-18 15:10:22', user: 'John Doe', action: 'Login Failed', type: 'Security', status: 'Failure', details: 'Invalid password' },
  { id: 5, timestamp: '2023-12-18 15:15:45', user: 'Andy Admin', action: 'Delete User', type: 'User', status: 'Success', details: 'Deleted user ID: 45' },
  { id: 6, timestamp: '2023-12-18 16:20:10', user: 'Sarah Connor', action: 'Create Project', type: 'User', status: 'Success', details: 'Project: Skynet' },
  { id: 7, timestamp: '2023-12-18 16:25:33', user: 'System', action: 'High CPU', type: 'System', status: 'Warning', details: 'CPU usage > 90%' },
  { id: 8, timestamp: '2023-12-18 17:00:00', user: 'Cron', action: 'Cleanup', type: 'System', status: 'Success', details: 'Temp files removed' },
]

const filteredLogs = computed(() => {
  return logs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesType = filterType.value === 'All' || log.type === filterType.value
    
    return matchesSearch && matchesType
  })
})

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Success': return 'success'
    case 'Failure': return 'danger'
    case 'Warning': return 'warning'
    default: return 'secondary'
  }
}

const exportLogs = () => {
  // Implementation for specific log export if needed, or rely on MaTable's export
  console.log('Exporting logs...')
}
</script>

<style scoped>
.page-header {
  margin-bottom: 24px;
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
  margin-bottom: 16px;
  gap: 16px;
  flex-wrap: wrap;
}
.search-box {
  width: 300px;
}
.filters {
  display: flex;
  gap: 12px;
}
.text-muted {
  color: var(--ma-text-muted);
  font-size: 0.875rem;
}
</style>
