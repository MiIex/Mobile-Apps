// src/main.ts
import './assets/text.css'
import './assets/main.css'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './global/App.vue'
import { router } from './router'
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import ConfirmationService from 'primevue/confirmationservice';

import 'primevue/resources/primevue.min.css'; // core css
import 'primeflex/primeflex.css'; // optional for flex layouts
import 'primeicons/primeicons.css'; // icons
import store from './store';

const app = createApp(App)
app.use(router)
app.use(PrimeVue)
app.use(ConfirmationService);
app.use(store)
app.component('Card', Card)
app.component('Button', Button)
app.component('InputGroup', InputGroup)
app.component('InputGroupAddon', InputGroupAddon)
app.component('InputText', InputText)
app.component('Password', Password)
app.component('Checkbox', Checkbox)
app.mount('#app')
