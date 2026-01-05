<template>
  <div class="dashboard-container">
    <div class="welcome-banner">
      <h1>Welcome back, Andy! 👋</h1>
      <p>Here's what's happening with your projects today.</p>
    </div>

    <MaRow :gutter="[24, 24]">
      <MaCol :xs="24" :sm="12" :lg="6">
        <MaStatWidget
          title="Total Users"
          value="12,450"
          icon="Users"
          trend-direction="up"
          trend="12%"
          color="primary"
        />
      </MaCol>
      <MaCol :xs="24" :sm="12" :lg="6">
        <MaStatWidget
          title="Monthly Revenue"
          value="$45,231"
          icon="DollarSign"
          trend-direction="up"
          trend="8%"
          color="success"
        />
      </MaCol>
      <MaCol :xs="24" :sm="12" :lg="6">
        <MaStatWidget
          title="Active Sessions"
          value="1,205"
          icon="Clock"
          trend-direction="down"
          trend="3%"
          color="warning"
        />
      </MaCol>
      <MaCol :xs="24" :sm="12" :lg="6">
        <MaStatWidget
          title="Conversion Rate"
          value="3.2%"
          icon="TrendingUp"
          trend-direction="up"
          trend="4%"
          color="info"
        />
      </MaCol>
    </MaRow>

    <div class="chart-section">
      <MaCard>
        <template #title>Revenue Analytics</template>
        <MaChart
          type="area"
          :height="300"
          :series="revenueSeries"
          :categories="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']"
        />
      </MaCard>
    </div>

    <MaRow :gutter="[24, 24]">
      <MaCol :xs="24" :lg="16">
        <MaCard class="activity-card">
          <template #title>Recent Transactions</template>
          <MaTable :columns="transactionColumns" :data="transactions">
            <template #cell(customer)="{ row }">
              <div class="user-info">
                <div class="user-avatar">{{ row.avatar }}</div>
                <span>{{ row.customer }}</span>
              </div>
            </template>
            <template #cell(amount)="{ value }">
              ${{ value }}.00
            </template>
            <template #cell(status)="{ value }">
              <MaBadge :color="value === 'Failed' ? 'danger' : 'success'" pill>
                {{ value }}
              </MaBadge>
            </template>
          </MaTable>
          <template #actions>
            <MaButton color="secondary">Download Report</MaButton>
            <MaButton color="secondary">View All</MaButton>
          </template>
        </MaCard>
      </MaCol>

      <MaCol :xs="24" :lg="8">
        <MaCard class="quick-actions-card">
          <template #title>Quick Actions</template>
          <div class="actions-list">
            <div class="action-item">
              <div class="action-icon"><MailIcon /></div>
              <div class="action-info">
                <div class="action-title">Send Newsletter</div>
                <div class="action-desc">Reach out to 12k users</div>
              </div>
            </div>
            <div class="action-item">
              <div class="action-icon"><PackageIcon /></div>
              <div class="action-info">
                <div class="action-title">Add Product</div>
                <div class="action-desc">Create a new listing</div>
              </div>
            </div>
            <div class="action-item">
              <div class="action-icon"><MessageSquareIcon /></div>
              <div class="action-info">
                <div class="action-title">Support Tickets</div>
              <div class="action-desc">4 pending responses</div>
            </div>
          </div>
        </div>
      </MaCard>
    </MaCol>
  </MaRow>
  </div>
</template>

<script setup lang="ts">
import { 
  MailIcon,
  PackageIcon,
  MessageSquareIcon
} from 'lucide-vue-next'

const revenueSeries = [
  {
    name: 'Revenue',
    data: [31, 40, 28, 51, 42, 109, 100]
  },
  {
    name: 'Expenses',
    data: [11, 32, 45, 32, 34, 52, 41]
  }
]

const transactionColumns = [
  { key: 'customer', label: 'Customer' },
  { key: 'date', label: 'Date' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' }
]

const transactions = [
  { customer: 'John Doe', avatar: 'JD', date: '2023-05-01', amount: 120, status: 'Completed' },
  { customer: 'Jane Smith', avatar: 'JS', date: '2023-05-02', amount: 250, status: 'Pending' },
  { customer: 'Bob Johnson', avatar: 'BJ', date: '2023-05-03', amount: 85, status: 'Failed' },
  { customer: 'Alice Brown', avatar: 'AB', date: '2023-05-04', amount: 320, status: 'Completed' }
]
</script>

<style scoped>
.welcome-banner {
  margin-bottom: 32px;
}

.welcome-banner h1 {
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  letter-spacing: -0.025em;
}

.welcome-banner p {
  color: var(--ma-text-muted);
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.chart-section {
  margin-bottom: 32px;
}

.stat-card .stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.stat-icon.users { background: var(--ma-primary-light); color: var(--ma-primary); }
.stat-icon.revenue { background: rgba(16, 185, 129, 0.1); color: #10b981; }
.stat-icon.sessions { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
.stat-icon.conversion { background: rgba(236, 72, 153, 0.1); color: #ec4899; }

.stat-trend {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 20px;
}

.stat-trend.positive { background: rgba(16, 185, 129, 0.1); color: #10b981; }
.stat-trend.negative { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 4px;
  color: var(--ma-text-main);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--ma-text-muted);
}

.main-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

.modern-table th {
  text-align: left;
  padding: 12px 0;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--ma-text-muted);
  border-bottom: 1px solid var(--ma-border);
}

.modern-table td {
  padding: 16px 0;
  border-bottom: 1px solid var(--ma-border);
  font-size: 0.875rem;
  color: var(--ma-text-main);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  background: var(--ma-bg-page);
  border: 1px solid var(--ma-border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--ma-text-main);
}

.actions-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.action-item {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  transition: background 0.2s;
  cursor: pointer;
}

.action-item:hover {
  background: var(--ma-bg-page);
}

.action-icon {
  width: 44px;
  height: 44px;
  background: var(--ma-bg-card);
  border: 1px solid var(--ma-border);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.action-title {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--ma-text-main);
}

.action-desc {
  font-size: 0.75rem;
  color: var(--ma-text-muted);
}

@media (max-width: 1024px) {
  .main-grid {
    grid-template-columns: 1fr;
  }
}
</style>
