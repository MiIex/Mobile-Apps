import './assets/main.css'
import { createApp } from 'vue'
import App from './global/App.vue'
import { router } from './router'
import PrimeVue from 'primevue/config';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/lara-dark-indigo/theme.css';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';


import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';


const app = createApp(App)
app.use(router)
app.use(PrimeVue)
app.mount('#app')
app.component('Button', Button)
app.component('InputGroup', InputGroup)
app.component('InputGroupAddon', InputGroupAddon)
app.component('InputText', InputText)
app.component('Password', Password)
