<template>
  <div class="ma-calendar">
    <div class="ma-calendar-header">
      <div class="calendar-controls">
        <div class="calendar-title">{{ currentMonthLabel }}</div>
        <div class="calendar-nav">
          <button class="nav-btn" @click="prevMonth">
            <ChevronLeft :size="20" />
          </button>
          <button class="today-btn" @click="goToToday">Today</button>
          <button class="nav-btn" @click="nextMonth">
            <ChevronRight :size="20" />
          </button>
        </div>
      </div>
      <div class="calendar-actions">
        <slot name="actions" />
      </div>
    </div>

    <div class="ma-calendar-body">
      <div class="weekdays-row">
        <div v-for="day in weekDays" :key="day" class="weekday-cell">
          {{ day }}
        </div>
      </div>
      
      <div class="days-grid">
        <div 
          v-for="(day, index) in calendarDays" 
          :key="index"
          class="day-cell"
          :class="{
            'is-today': isToday(day.date),
            'is-current-month': day.isCurrentMonth,
            'is-selected': isSelected(day.date),
            'is-weekend': isWeekend(day.date)
          }"
          @click="handleDateClick(day.date)"
        >
          <div class="day-header">
            <span class="day-number">{{ format(day.date, 'd') }}</span>
          </div>
          
          <div class="day-content">
            <slot name="date-cell" :date="day.date" :events="getEventsForDate(day.date)">
              <div 
                v-for="event in getEventsForDate(day.date)" 
                :key="event.id"
                class="calendar-event"
                :class="[`event-${event.type || 'primary'}`]"
                @click.stop="handleEventClick(event)"
              >
                {{ event.title }}
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay,
  isWeekend as checkIsWeekend
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

interface CalendarEvent {
  id: string | number;
  title: string;
  date: Date | string;
  type?: 'primary' | 'success' | 'warning' | 'error' | 'danger' | 'info';
  [key: string]: any;
}

const props = withDefaults(defineProps<{
  modelValue?: Date;
  events?: CalendarEvent[];
}>(), {
  modelValue: () => new Date(),
  events: () => []
})

const emit = defineEmits(['update:modelValue', 'change', 'date-click', 'event-click'])

const currentDate = ref(props.modelValue || new Date())
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const currentMonthLabel = computed(() => {
  return format(currentDate.value, 'MMMM yyyy')
})

const calendarDays = computed(() => {
  const start = startOfWeek(startOfMonth(currentDate.value))
  const end = endOfWeek(endOfMonth(currentDate.value))
  
  const days = eachDayOfInterval({ start, end })
  
  return days.map(date => ({
    date,
    isCurrentMonth: isSameMonth(date, currentDate.value)
  }))
})

const isToday = (date: Date) => isSameDay(date, new Date())
const isSelected = (date: Date) => isSameDay(date, props.modelValue)
const isWeekend = (date: Date) => checkIsWeekend(date)

const getEventsForDate = (date: Date) => {
  return props.events.filter(event => isSameDay(new Date(event.date), date))
}

const prevMonth = () => {
  currentDate.value = subMonths(currentDate.value, 1)
  emit('change', currentDate.value)
}

const nextMonth = () => {
  currentDate.value = addMonths(currentDate.value, 1)
  emit('change', currentDate.value)
}

const goToToday = () => {
  currentDate.value = new Date()
  emit('update:modelValue', new Date())
  emit('change', currentDate.value)
}

const handleDateClick = (date: Date) => {
  emit('update:modelValue', date)
  emit('date-click', date)
}

const handleEventClick = (event: CalendarEvent) => {
  emit('event-click', event)
}

watch(() => props.modelValue, (val) => {
  if (val) currentDate.value = val
})
</script>

<style scoped>
.ma-calendar {
  background: var(--ma-bg-card);
  border-radius: 8px;
  border: 1px solid var(--ma-border);
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 600px;
}

.ma-calendar-header {
  padding: 16px 24px;
  border-bottom: 1px solid var(--ma-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.calendar-controls {
  display: flex;
  align-items: center;
  gap: 24px;
}

.calendar-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ma-text-main);
  min-width: 160px;
}

.calendar-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid var(--ma-border);
  background: transparent;
  border-radius: 4px;
  color: var(--ma-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.nav-btn:hover {
  background: var(--ma-bg-secondary);
  color: var(--ma-text-main);
}

.today-btn {
  padding: 0 12px;
  height: 32px;
  border: 1px solid var(--ma-border);
  background: transparent;
  border-radius: 4px;
  color: var(--ma-text-main);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.today-btn:hover {
  background: var(--ma-bg-secondary);
}

.ma-calendar-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.weekdays-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-bottom: 1px solid var(--ma-border);
}

.weekday-cell {
  padding: 12px;
  text-align: center;
  font-weight: 600;
  color: var(--ma-text-secondary);
  font-size: 0.875rem;
  text-transform: uppercase;
}

.days-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: 1fr;
}

.day-cell {
  border-right: 1px solid var(--ma-border);
  border-bottom: 1px solid var(--ma-border);
  padding: 8px;
  min-height: 100px;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  flex-direction: column;
}

.day-cell:nth-child(7n) {
  border-right: none;
}

.day-cell:hover {
  background: var(--ma-bg-secondary);
}

.day-cell:not(.is-current-month) {
  background: rgba(0,0,0,0.02);
  color: var(--ma-text-muted);
}

.day-cell.is-today .day-number {
  background: var(--ma-primary);
  color: white;
}

.day-cell.is-selected {
  background: var(--ma-primary-light);
}

.day-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 4px;
}

.day-number {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.875rem;
}

.day-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: hidden;
}

.calendar-event {
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  margin-bottom: 2px;
}

.event-primary { background: var(--ma-primary-light); color: var(--ma-primary); }
.event-success { background: #dcfce7; color: #16a34a; }
.event-warning { background: #ffedd5; color: #ea580c; }
.event-error, .event-danger { background: #fee2e2; color: #dc2626; }
.event-info { background: #e0f2fe; color: #0284c7; }
</style>
