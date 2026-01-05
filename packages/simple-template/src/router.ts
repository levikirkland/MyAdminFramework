import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Components from './views/Components.vue'
import Features from './views/Features.vue'
import Pricing from './views/Pricing.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/features', component: Features },
  { path: '/pricing', component: Pricing },
  { path: '/components', component: Components },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
