import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import LogInView from './LogIn-Area/view/LogInView.vue'
import ChatView from './chat-area/view/ChatView.vue'

const routes = [
    { path: '/', redirect: '/login'},
    { path: '/login', component: LogInView },
    { path: '/chat', component: ChatView}
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  
})


