import './assets/main.css'
import { createApp } from 'vue'
import App from './global/App.vue'
import { router } from './router'

createApp(App)
    .use(router)
    .mount('#app')
