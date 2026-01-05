<script setup lang="ts">
import { ref, computed } from 'vue'
import { MaCalendar, MaCard, MaButton, MaModal, MaInput, MaFormGroup, MaSelect, MaRow, MaCol, MaBadge, MaIcon } from 'my-admin-framework'

interface CalendarEvent {
  id: number
  title: string
  date: Date
  time?: string
  type?: 'primary' | 'success' | 'warning' | 'info' | 'danger'
  description?: string
}

const events = ref<CalendarEvent[]>([
  {
    id: 1,
    title: 'Team Meeting',
    date: new Date(),
    time: '10:00',
    type: 'primary',
    description: 'Weekly sync with the development team.'
  },
  {
    id: 2,
    title: 'Project Deadline',
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    time: '17:00',
    type: 'danger',
    description: 'Final submission for the Q4 project.'
  },
  {
    id: 3,
    title: 'Client Call',
    date: new Date(new Date().setDate(new Date().getDate() - 5)),
    time: '14:30',
    type: 'success',
    description: 'Sync with Acme Corp regarding requirements.'
  },
  {
    id: 4,
    title: 'Lunch with Sarah',
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    time: '12:30',
    type: 'info',
    description: 'Discuss the new marketing strategy.'
  }
])

const showModal = ref(false)
const selectedDate = ref<Date | null>(null)
const newEvent = ref({
  title: '',
  date: '',
  time: '09:00',
  type: 'primary' as const,
  description: ''
})

const eventTypes = [
  { label: 'Meeting', value: 'primary' },
  { label: 'Task', value: 'success' },
  { label: 'Reminder', value: 'warning' },
  { label: 'Urgent', value: 'danger' },
  { label: 'Personal', value: 'info' }
]

const timeOptions = computed(() => {
  const times = []
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 15) {
      const hour = i.toString().padStart(2, '0')
      const minute = j.toString().padStart(2, '0')
      times.push({ label: `${hour}:${minute}`, value: `${hour}:${minute}` })
    }
  }
  return times
})

const upcomingEvents = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return events.value
    .filter(e => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)
})

const handleDateClick = (date: Date) => {
  selectedDate.value = date
  newEvent.value.date = date.toISOString().split('T')[0] || ''
  showModal.value = true
}

const handleEventClick = (event: any) => {
  alert(`Event: ${event.title}\nTime: ${event.time || 'All Day'}\nDetails: ${event.description || 'No details'}`)
}

const addEvent = () => {
  if (!newEvent.value.title || !newEvent.value.date) return

  events.value.push({
    id: Date.now(),
    title: newEvent.value.title,
    date: new Date(newEvent.value.date),
    time: newEvent.value.time,
    type: newEvent.value.type as any,
    description: newEvent.value.description
  })

  showModal.value = false
  newEvent.value = { title: '', date: '', time: '09:00', type: 'primary', description: '' }
}


</script>

<template>
  <div class="calendar-view">
    <div class="page-header">
      <div>
        <h1 class="page-title">Scheduler</h1>
        <p class="page-subtitle">Manage your appointments and tasks.</p>
      </div>
      <MaButton color="primary" @click="showModal = true">
        <template #icon><MaIcon name="Plus" /></template>
        New Event
      </MaButton>
    </div>

    <MaRow :gutter="[24, 24]">
      <MaCol :xs="24" :lg="18">
        <MaCard class="calendar-card">
          <MaCalendar 
            :events="events" 
            @date-click="handleDateClick"
            @event-click="handleEventClick"
          />
        </MaCard>
      </MaCol>
      
      <MaCol :xs="24" :lg="6">
        <MaCard title="Upcoming" class="upcoming-card">
          <div class="upcoming-list">
            <div v-for="event in upcomingEvents" :key="event.id" class="upcoming-item" @click="handleEventClick(event)">
              <div class="event-date-badge">
                <span class="month">{{ new Date(event.date).toLocaleDateString('en-US', { month: 'short' }) }}</span>
                <span class="day">{{ new Date(event.date).getDate() }}</span>
              </div>
              <div class="event-info">
                <div class="event-title">{{ event.title }}</div>
                <div class="event-meta">
                  <span class="event-time">{{ event.time }}</span>
                  <MaBadge :color="event.type" dot />
                </div>
              </div>
            </div>
            <div v-if="upcomingEvents.length === 0" class="empty-state">
              No upcoming events
            </div>
          </div>
          <template #footer>
            <MaButton block variant="outline" size="small">View All List</MaButton>
          </template>
        </MaCard>

        <MaCard title="Categories" class="mt-4">
          <div class="category-list">
            <div v-for="type in eventTypes" :key="type.value" class="category-item">
              <div class="category-color" :class="`bg-${type.value}`"></div>
              <span>{{ type.label }}</span>
            </div>
          </div>
        </MaCard>
      </MaCol>
    </MaRow>

    <MaModal v-model="showModal" title="Schedule Event">
      <div class="event-form">
        <MaFormGroup label="Event Title" required>
          <MaInput v-model="newEvent.title" placeholder="e.g. Client Meeting" />
        </MaFormGroup>
        
        <MaRow :gutter="[16, 16]">
          <MaCol :span="12">
            <MaFormGroup label="Date" required>
              <MaInput type="date" v-model="newEvent.date" />
            </MaFormGroup>
          </MaCol>
          <MaCol :span="12">
            <MaFormGroup label="Time">
              <MaSelect v-model="newEvent.time" :options="timeOptions" />
            </MaFormGroup>
          </MaCol>
        </MaRow>

        <MaFormGroup label="Category">
          <MaSelect v-model="newEvent.type" :options="eventTypes" />
        </MaFormGroup>

        <MaFormGroup label="Description">
          <MaInput v-model="newEvent.description" placeholder="Add details..." />
        </MaFormGroup>
      </div>
      <template #footer>
        <MaButton variant="outline" @click="showModal = false">Cancel</MaButton>
        <MaButton color="primary" @click="addEvent">Save Event</MaButton>
      </template>
    </MaModal>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: var(--ma-text-main);
}

.page-subtitle {
  color: var(--ma-text-muted);
  margin: 0;
}

.calendar-card {
  height: 100%;
}

.upcoming-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.upcoming-item {
  display: flex;
  gap: 12px;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.upcoming-item:hover {
  background-color: var(--ma-bg-secondary);
}

.event-date-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--ma-bg-secondary);
  border-radius: 8px;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.event-date-badge .month {
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--ma-text-muted);
}

.event-date-badge .day {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--ma-text-main);
}

.event-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.event-title {
  font-weight: 500;
  font-size: 0.9rem;
  color: var(--ma-text-main);
  margin-bottom: 4px;
}

.event-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.event-time {
  font-size: 0.8rem;
  color: var(--ma-text-muted);
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9rem;
  color: var(--ma-text-secondary);
}

.category-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.bg-primary { background-color: var(--ma-primary); }
.bg-success { background-color: var(--ma-success); }
.bg-warning { background-color: var(--ma-warning); }
.bg-danger { background-color: var(--ma-danger); }
.bg-info { background-color: var(--ma-info); }

.mt-4 { margin-top: 24px; }
</style>