import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import MyAdminFramework, { globalErrorHandler } from 'my-admin-framework'
import 'my-admin-framework/style.css'
import router from './router'
import VueApexCharts from "vue3-apexcharts";
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(createPinia())
app.use(MyAdminFramework as any)
app.use(globalErrorHandler)
app.use(router)
app.use(VueApexCharts)
app.mount('#app')
