import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import MyAdminFramework from 'my-admin-framework'
import 'my-admin-framework/style.css'
import router from './router'

const app = createApp(App)
app.use(MyAdminFramework as any)
app.use(router)
app.mount('#app')
