<template>
  <MaLayout v-if="!isAuthPage" :layout="layoutMode">
    <template #sidebar>
      <MaSidebar>
        <template #logo>
          <router-link to="/" class="logo-link">
            <div class="logo-container">
              <span class="logo-icon">MA</span>
              <span class="logo-text">MyAdmin</span>
            </div>
          </router-link>
        </template>
        
        <div v-for="(group, index) in menuItems" :key="index" class="nav-section">
          <div class="nav-label">{{ group.label }}</div>
          <router-link 
            v-for="item in group.items" 
            :key="item.to" 
            :to="item.to" 
            class="nav-item" 
            active-class="active"
          >
            <span class="nav-icon"><component :is="item.icon" /></span>
            {{ item.label }}
          </router-link>
          
          <!-- Special case for logout in Settings group -->
          <div v-if="group.label === 'Settings'" class="nav-item" @click="handleLogout">
            <span class="nav-icon"><LogOutIcon /></span>
            Logout
          </div>
        </div>
      </MaSidebar>
    </template>

    <template #header>
      <MaHeader>
        <template #title>
          <div v-if="layoutMode === 'top-nav'" class="header-logo">
            <router-link to="/" class="logo-link">
              <div class="logo-container">
                <span class="logo-icon">MA</span>
                <span class="logo-text">MyAdmin</span>
              </div>
            </router-link>
          </div>
          <span v-else>{{ currentPageTitle }}</span>
        </template>
        
        <template #nav>
          <div v-if="layoutMode === 'top-nav'" class="top-nav-menu">
            <template v-for="group in menuItems" :key="group.label">
              <router-link 
                v-for="item in group.items" 
                :key="item.to" 
                :to="item.to" 
                class="top-nav-item" 
                active-class="active"
              >
                <span class="nav-icon"><component :is="item.icon" :size="16" /></span>
                {{ item.label }}
              </router-link>
            </template>
          </div>
        </template>

        <template #actions>
          <div class="header-search">
            <input type="text" placeholder="Search..." />
          </div>
          
          <button class="header-icon-btn" @click="toggleDarkMode">
            <component :is="isDark ? SunIcon : MoonIcon" :size="20" />
          </button>
          
          <MaNotification 
            :items="notifications" 
            @mark-all-read="markAllAsRead"
            @item-click="handleNotificationClick"
          />
          
          <MaDropdown>
            <template #trigger>
              <div class="user-profile-trigger">
                <div class="avatar">A</div>
              </div>
            </template>
            <div class="dropdown-header">
              <div class="user-info">
                <div class="user-name">Andy Admin</div>
                <div class="user-email">andy@example.com</div>
              </div>
            </div>
            <div class="dropdown-divider"></div>
            <router-link to="/settings" class="dropdown-item">Profile Settings</router-link>
            <div class="dropdown-item" @click="handleLogout">Logout</div>
          </MaDropdown>

          <MaButton color="primary">
            <span><PlusIcon /></span> New Action
          </MaButton>
        </template>
      </MaHeader>
    </template>

    <router-view />
    <MaToast ref="toastRef" />
    <MaThemeCustomizer />
    <MaCommandPalette ref="cmdPalette" :groups="commandGroups" />
    <MaAiAssistant 
      title="My App Copilot" 
      welcome-message="Hi! I can help you navigate the admin panel." 
      :system-prompt="frameworkContext"
    />
  </MaLayout>

  <template v-else>
    <router-view />
    <MaToast ref="toastRef" />
  </template>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { frameworkContext } from './utils/aiContext'
import { 
  LayoutDashboardIcon, 
  UsersIcon, 
  PackageIcon, 
  SettingsIcon, 
  LogOutIcon,
  SunIcon,
  MoonIcon,
  PlusIcon,
  ComponentIcon,
  Trello as TrelloIcon,
  Calendar as CalendarIcon,
  FileText as FileTextIcon,
  PieChart as PieChartIcon,
  Home,
  User,
  Grid as GridIcon,
  ShieldAlert as ShieldIcon,
  Image as ImageIcon,
  ChefHat as ChefHatIcon,
  Briefcase as BriefcaseIcon,
  MessageCircle as MessageCircleIcon,
  FileText as FileTextIcon2,
  Home as HomeIcon,
  GraduationCap as GraduationCapIcon,
  Megaphone as MegaphoneIcon,
  Bot as BotIcon
} from 'lucide-vue-next'
import { useTheme, useNotification } from 'my-admin-framework'

const { layoutMode, toggleDarkMode, isDark } = useTheme()
const { notifications, markAllAsRead, markAsRead } = useNotification()
const route = useRoute()
const router = useRouter()
const toastRef = ref<any>(null)
const cmdPalette = ref<any>(null)

const menuItems = [
  {
    label: 'Main Menu',
    items: [
      { to: '/', label: 'Dashboard', icon: LayoutDashboardIcon },
      { to: '/users', label: 'Users', icon: UsersIcon },
      { to: '/products', label: 'Products', icon: PackageIcon },
      { to: '/kanban', label: 'Kanban', icon: TrelloIcon },
      { to: '/calendar', label: 'Calendar', icon: CalendarIcon },
      { to: '/components', label: 'Components', icon: ComponentIcon },
      { to: '/recipes', label: 'Recipes', icon: ChefHatIcon },
      { to: '/jobs', label: 'Jobs', icon: BriefcaseIcon },
      { to: '/testimonials', label: 'Testimonials', icon: MessageCircleIcon },
      { to: '/blog', label: 'Blog', icon: FileTextIcon2 },
      { to: '/properties', label: 'Properties', icon: HomeIcon },
      { to: '/courses', label: 'Courses', icon: GraduationCapIcon },
      { to: '/marketing', label: 'Marketing', icon: MegaphoneIcon },
      { to: '/ai-chat', label: 'AI Chat', icon: BotIcon },
      { to: '/media', label: 'Media', icon: ImageIcon },
      { to: '/forms', label: 'Forms', icon: FileTextIcon },
      { to: '/charts', label: 'Charts', icon: PieChartIcon },
      { to: '/widgets', label: 'Widgets', icon: GridIcon },
    ]
  },
  {
    label: 'Settings',
    items: [
      { to: '/audit-log', label: 'Audit Log', icon: ShieldIcon },
      { to: '/settings', label: 'General', icon: SettingsIcon },
    ]
  }
]

const commandGroups = [
  {
    name: 'Navigation',
    items: [
      { id: 'nav-dash', label: 'Go to Dashboard', icon: Home, action: () => router.push('/') },
      { id: 'nav-users', label: 'Go to Users', icon: User, action: () => router.push('/users') },
      { id: 'nav-settings', label: 'Go to Settings', icon: SettingsIcon, action: () => router.push('/settings') },
    ]
  },
  {
    name: 'Actions',
    items: [
      { id: 'act-theme', label: 'Toggle Theme', icon: SunIcon, action: () => toggleDarkMode() },
      { id: 'act-logout', label: 'Logout', icon: LogOutIcon, action: () => handleLogout() },
    ]
  }
]

const handleKeydown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    cmdPalette.value?.open()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  // Add some mock notifications
  useNotification().add({
    title: 'New Message',
    content: 'You have received a new message from John.',
    time: '5 min ago'
  })
  useNotification().add({
    title: 'System Alert',
    content: 'Server CPU usage is high.',
    time: '10 min ago'
  })
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

const handleNotificationClick = (item: any) => {
  markAsRead(item.id)
}

const isAuthPage = computed(() => route.meta.guestOnly)

const handleLogout = () => {
  localStorage.removeItem('auth')
  router.push('/login')
}

// Provide toast function to all components
provide('toast', (options: any) => {
  if (toastRef.value) {
    toastRef.value.add(options)
  }
})

onMounted(() => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // isDarkMode.value = true
    // document.body.classList.add('dark')
  }
})

const currentPageTitle = computed(() => {
  switch (route.path) {
    case '/': return 'Dashboard Overview'
    case '/users': return 'Users Management'
    case '/products': return 'Product Inventory'
    case '/components': return 'UI Components'
    case '/widgets': return 'Widgets'
    case '/audit-log': return 'Audit Log'
    case '/settings': return 'Account Settings'
    default: return 'MyAdmin'
  }
})
</script>

<style>
body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: var(--ma-text-main);
  background-color: var(--ma-bg-page);
  -webkit-font-smoothing: antialiased;
}

.logo-link {
  text-decoration: none;
  color: inherit;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 8px;
}

.logo-icon {
  background: linear-gradient(135deg, var(--ma-primary) 0%, #003d99 100%);
  color: white;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 800;
  font-size: 0.85rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.logo-text {
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--ma-text-main);
  font-size: 1.1rem;
}

.nav-section {
  margin-bottom: 24px;
  padding: 0 8px;
}

.nav-label {
  padding: 0 12px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--ma-text-muted);
  margin-bottom: 8px;
  letter-spacing: 0.08em;
  opacity: 0.8;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--ma-text-secondary);
  transition: all 0.2s ease;
  text-decoration: none;
  margin-bottom: 4px;
  border: 1px solid transparent;
}

.nav-item:hover {
  background: var(--ma-bg-page);
  color: var(--ma-text-main);
  transform: translateX(4px);
}

.nav-item.active {
  background: var(--ma-primary);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.nav-item.active:hover {
  transform: none;
}

.nav-icon {
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  color: var(--ma-text-muted);
  transition: color 0.2s;
}

.nav-item:hover .nav-icon {
  color: var(--ma-primary);
}

.nav-item.active .nav-icon {
  color: white;
}

.nav-icon svg {
  width: 20px;
  height: 20px;
}

.header-search input {
  background: var(--ma-bg-page);
  border: 1px solid var(--ma-border);
  color: var(--ma-text-main);
  padding: 8px 16px;
  border-radius: 8px;
  width: 240px;
  outline: none;
  transition: all 0.2s;
}

.header-search input:focus {
  background: var(--ma-bg-card);
  border-color: var(--ma-primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.header-icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s;
  color: var(--ma-text-main);
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-icon-btn:hover {
  background-color: var(--ma-bg-secondary);
}

.user-profile-trigger {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--ma-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  cursor: pointer;
}

.dropdown-header {
  padding: 12px 16px;
}

.user-info .user-name {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--ma-text-main);
}

.user-info .user-email {
  font-size: 0.75rem;
  color: var(--ma-text-muted);
}

.dropdown-divider {
  height: 1px;
  background: var(--ma-border);
  margin: 8px 0;
}

.dropdown-item {
  padding: 10px 16px;
  font-size: 0.875rem;
  color: var(--ma-text-main);
  cursor: pointer;
  border-radius: 6px;
  display: block;
  text-decoration: none;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background: var(--ma-bg-page);
}

.top-nav-menu {
  display: flex;
  gap: 4px;
  height: 100%;
  align-items: center;
}

.top-nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  color: var(--ma-text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  white-space: nowrap;
}

.top-nav-item:hover {
  background-color: var(--ma-bg-secondary);
  color: var(--ma-text-main);
}

.top-nav-item.active {
  background-color: var(--ma-primary-light);
  color: var(--ma-primary);
}

.top-nav-item .nav-icon {
  display: flex;
  align-items: center;
}
</style>
