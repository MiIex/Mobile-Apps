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
import axios from 'axios'

import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/lara-dark-indigo/theme.css';


const store = createStore({
    state () {
      return {
        token: ""
      }
    },
    mutations: {
      logIn(state, token){
        state.token = token.data.token;
        console.log(token)
      }
    },
    actions: {
      register({commit}, data){
        axios.get("https://www2.hs-esslingen.de/~melcher/map/chat/api/?request=register", {
          params: data
        })
        .then(response => {
          commit('logIn', response.data)
         })
      }
    }
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