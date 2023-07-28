import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'
import App from './App.vue'
import { useAPI } from './useAPI'

const app = createApp(App)

app.use(useAPI.plugin, { baseURL: import.meta.env.VITE_API_BASE_URL })
app.use(VueQueryPlugin)

app.mount('#app')
