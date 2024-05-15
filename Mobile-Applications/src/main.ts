import './assets/main.css'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './global/App.vue'
import { router } from './router'
import PrimeVue from 'primevue/config';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import ConfirmationService from 'primevue/confirmationservice';

import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/lara-dark-indigo/theme.css';



export const store = createStore({
  state() {
    return {
      token: "",
      darkMode: false,
      textSize: "",
      uploadedBackgroundImage: null,
      chatColor: "",
      status: "",
    }
  },
  mutations: {
    logIn(state, token) {
      state.token = token.data.token;
    },
    darkmode(state, toggle) {
      state.darkMode = toggle
    },
    textsize(state, size) {
      state.textSize = size
    },
    backgroundImage(state, image) {
      state.uploadedBackgroundImage = image
    },
    changecolor(state, color) {
      state.chatColor = color
    },
    changeStatus(state, status) {
      state.status = status
    },
    logOut(state){
      state.token = ""
    }
  },
})


const app = createApp(App)
app.use(router)
app.use(PrimeVue)
app.use(ConfirmationService);
app.use(store)
app.mount('#app')
app.component('Button', Button)
app.component('InputGroup', InputGroup)
app.component('InputGroupAddon', InputGroupAddon)
app.component('InputText', InputText)
app.component('Password', Password)
app.component('Checkbox', Checkbox)