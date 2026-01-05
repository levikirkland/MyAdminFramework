<template>
  <div class="widgets-page">
    <div class="page-header">
      <h1>Widgets</h1>
      <p>Ready-to-use components for your dashboard.</p>
    </div>

    <!-- Statistics Section -->
    <h3 class="section-title">Statistics</h3>
    <MaRow :gutter="[24, 24]">
      <MaCol :xs="24" :sm="12" :lg="6">
        <MaStatWidget
          title="Total Users"
          value="24.5k"
          icon="Users"
          trend-direction="up"
          trend="12%"
          color="primary"
        />
      </MaCol>
      <MaCol :xs="24" :sm="12" :lg="6">
        <MaStatWidget
          title="Revenue"
          value="$12.4k"
          icon="DollarSign"
          trend-direction="up"
          trend="8.2%"
          color="success"
        />
      </MaCol>
      <MaCol :xs="24" :sm="12" :lg="6">
        <MaStatWidget
          title="Bounce Rate"
          value="42.5%"
          icon="Activity"
          trend-direction="down"
          trend="2.1%"
          color="warning"
        />
      </MaCol>
      <MaCol :xs="24" :sm="12" :lg="6">
        <MaStatWidget
          title="Active Projects"
          value="18"
          icon="Folder"
          color="info"
        />
      </MaCol>
    </MaRow>

    <!-- Lists & Feeds -->
    <h3 class="section-title">Lists & Feeds</h3>
    <MaRow :gutter="[24, 24]">
      <!-- Activity Feed -->
      <MaCol :xs="24" :lg="8">
        <MaCard title="Recent Activity" class="h-full">
          <MaActivityFeed :items="activities" />
        </MaCard>
      </MaCol>

      <!-- Task List -->
      <MaCol :xs="24" :lg="8">
        <MaCard title="Tasks" class="h-full">
          <MaTaskList 
            :tasks="tasks" 
            @add="addTask"
            @delete="deleteTask"
            @toggle="toggleTask"
          />
        </MaCard>
      </MaCol>

      <!-- Team Members (Custom Implementation) -->
      <MaCol :xs="24" :lg="8">
        <MaCard title="Team Members" class="h-full">
          <div class="widget-list">
            <div v-for="member in teamMembers" :key="member.id" class="widget-list-item">
              <MaAvatar :src="member.avatar" size="medium" />
              <div class="item-content">
                <div class="item-title">{{ member.name }}</div>
                <div class="item-subtitle">{{ member.role }}</div>
              </div>
              <MaDropdown align="right">
                <template #trigger>
                  <MaButton size="small" variant="text" icon="MoreVertical" />
                </template>
                <div class="dropdown-item" @click="handleMemberAction('view', member)">View Profile</div>
                <div class="dropdown-item" @click="handleMemberAction('message', member)">Message</div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-item text-danger" @click="handleMemberAction('remove', member)">Remove</div>
              </MaDropdown>
            </div>
          </div>
        </MaCard>
      </MaCol>
    </MaRow>

    <!-- Profile & Pricing -->
    <h3 class="section-title">Profile & Pricing</h3>
    <MaRow :gutter="[24, 24]">
      <MaCol :xs="24" :lg="8">
        <MaUserProfile
          name="Sarah Connor"
          role="Product Designer"
          email="sarah.connor@example.com"
          avatar="https://i.pravatar.cc/150?u=8"
          cover-image="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
          :stats="[
            { label: 'Projects', value: '128' },
            { label: 'Followers', value: '1.2k' },
            { label: 'Following', value: '850' }
          ]"
          @follow="handleFollow"
          @message="handleMessage"
        />
      </MaCol>

      <MaCol :xs="24" :lg="8">
        <MaPricingCard
          title="Pro Plan"
          price="29"
          :features="['Unlimited Projects', 'Analytics Dashboard', '24/7 Support', 'Custom Domain']"
          highlighted
          @select="handleSelectPlan"
        />
      </MaCol>

      <MaCol :xs="24" :lg="8">
         <MaPricingCard
          title="Enterprise"
          price="99"
          :features="['Everything in Pro', 'SSO Authentication', 'Dedicated Account Manager', 'SLA']"
          @select="handleSelectPlan"
        />
      </MaCol>
    </MaRow>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'my-admin-framework'

const toast = useToast()

// Activity Feed Data
const activities = [
  {
    id: 1,
    title: 'New Order',
    description: 'Order #1234 received from John Doe',
    time: 'Just now',
    icon: 'ShoppingCart',
    color: 'success'
  },
  {
    id: 2,
    title: 'Project Meeting',
    description: 'Weekly sync with the development team',
    time: '2 hours ago',
    icon: 'Users',
    color: 'primary'
  },
  {
    id: 3,
    title: 'Server Maintenance',
    description: 'Scheduled maintenance completed successfully',
    time: 'Yesterday',
    icon: 'Server',
    color: 'warning'
  },
  {
    id: 4,
    title: 'Design Update',
    description: 'New homepage design assets uploaded',
    time: '2 days ago',
    icon: 'Image',
    color: 'info'
  }
]

// Task List Data
const tasks = ref([
  { id: 1, title: 'Design new landing page', completed: false },
  { id: 2, title: 'Fix navigation bug', completed: true },
  { id: 3, title: 'Write documentation', completed: false },
  { id: 4, title: 'Deploy to production', completed: false },
])

const addTask = (title: string) => {
  tasks.value.push({
    id: Date.now(),
    title,
    completed: false
  })
  toast.success('Task added')
}

const deleteTask = (id: number) => {
  tasks.value = tasks.value.filter(t => t.id !== id)
  toast.success('Task deleted')
}

const toggleTask = (task: any) => {
  task.completed = !task.completed
  toast.info(`Task "${task.title}" ${task.completed ? 'completed' : 'uncompleted'}`)
}

// Team Members Data
const teamMembers = ref([
  { id: 1, name: 'Alex Morgan', role: 'Frontend Dev', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Jordan Smith', role: 'Product Manager', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Casey Lee', role: 'UX Designer', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Taylor Swift', role: 'Backend Dev', avatar: 'https://i.pravatar.cc/150?u=4' },
])

const handleMemberAction = (action: string, member: any) => {
  if (action === 'remove') {
    teamMembers.value = teamMembers.value.filter(m => m.id !== member.id)
    toast.success(`Removed ${member.name}`)
  } else {
    toast.info(`${action === 'view' ? 'Viewing' : 'Messaging'} ${member.name}`)
  }
}

// Profile Actions
const handleFollow = () => {
  toast.success('Followed user')
}

const handleMessage = () => {
  toast.info('Message window opened')
}

// Pricing Actions
const handleSelectPlan = () => {
  toast.success('Plan selected')
}
</script>

<style scoped>
.widgets-page {
  padding-bottom: 24px;
}

.page-header {
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

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 32px 0 16px 0;
  color: var(--ma-text-main);
}

.h-full {
  height: 100%;
}

/* Custom styles for the manual Team Members list */
.widget-list {
  display: flex;
  flex-direction: column;
}

.widget-list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--ma-border-color);
}

.widget-list-item:last-child {
  border-bottom: none;
}

.item-content {
  flex: 1;
}

.item-title {
  font-weight: 500;
  color: var(--ma-text-main);
}

.item-subtitle {
  font-size: 0.75rem;
  color: var(--ma-text-muted);
}

.dropdown-item {
  padding: 8px 12px;
  font-size: 0.875rem;
  color: var(--ma-text-main);
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: var(--ma-bg-secondary);
}

.dropdown-item.text-danger {
  color: var(--ma-danger);
}

.dropdown-item.text-danger:hover {
  background-color: #fee2e2;
}

.dropdown-divider {
  height: 1px;
  background-color: var(--ma-border-color);
  margin: 4px 0;
}
</style>
