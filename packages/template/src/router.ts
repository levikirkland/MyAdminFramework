import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Users from './views/Users.vue'
import Products from './views/Products.vue'
import Settings from './views/Settings.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Components from './views/Components.vue'
import Kanban from './views/Kanban.vue'
import Calendar from './views/Calendar.vue'
import Forms from './views/Forms.vue'
import Charts from './views/Charts.vue'
import Widgets from './views/Widgets.vue'
import AuditLog from './views/AuditLog.vue'
import Media from './views/Media.vue'
import Checkout from './views/Checkout.vue'
import Recipes from './views/Recipes.vue'
import Jobs from './views/Jobs.vue'
import Testimonials from './views/Testimonials.vue'
import Blog from './views/Blog.vue'
import PropertyListings from './views/PropertyListings.vue'
import Courses from './views/Courses.vue'
import Marketing from './views/Marketing.vue'
import AiChat from './views/AiChat.vue'
import { usePermission } from 'my-admin-framework'

const routes = [
  { path: '/', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/users', component: Users, meta: { requiresAuth: true, permission: 'user.read' } },
  { path: '/products', component: Products, meta: { requiresAuth: true } },
  { path: '/checkout', component: Checkout, meta: { requiresAuth: true } },
  { path: '/kanban', component: Kanban, meta: { requiresAuth: true } },
  { path: '/calendar', component: Calendar, meta: { requiresAuth: true } },
  { path: '/forms', component: Forms, meta: { requiresAuth: true } },
  { path: '/charts', component: Charts, meta: { requiresAuth: true } },
  { path: '/widgets', component: Widgets, meta: { requiresAuth: true } },
  { path: '/media', component: Media, meta: { requiresAuth: true } },
  { path: '/recipes', component: Recipes, meta: { requiresAuth: true } },
  { path: '/jobs', component: Jobs, meta: { requiresAuth: true } },
  { path: '/testimonials', component: Testimonials, meta: { requiresAuth: true } },
  { path: '/blog', component: Blog, meta: { requiresAuth: true } },
  { path: '/properties', component: PropertyListings, meta: { requiresAuth: true } },
  { path: '/courses', component: Courses, meta: { requiresAuth: true } },
  { path: '/marketing', component: Marketing, meta: { requiresAuth: true } },
  { path: '/ai-chat', component: AiChat, meta: { requiresAuth: true } },
  { path: '/audit-log', component: AuditLog, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/settings', component: Settings, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/components', component: Components, meta: { requiresAuth: true } },
  { path: '/login', component: Login, meta: { guestOnly: true } },
  { path: '/register', component: Register, meta: { guestOnly: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  const isAuthenticated = localStorage.getItem('auth') === 'true'
  const { hasPermission, hasRole } = usePermission()

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.guestOnly && isAuthenticated) {
    next('/')
  } else if (to.meta.permission && !hasPermission(to.meta.permission as string)) {
    // Redirect to dashboard or 403 page if permission missing
    next('/') 
  } else if (to.meta.role && !hasRole(to.meta.role as string)) {
    // Redirect to dashboard or 403 page if role missing
    next('/')
  } else {
    next()
  }
})

export default router
