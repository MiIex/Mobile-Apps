import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import LogInView from './LogIn-Area/view/LogInView.vue'
import ChatView from './chat-area/view/ChatView.vue'
import RegistryView from './registry-area/view/registryView.vue'
import SettingView from './settings-area/view/SettingView.vue'
import GroupChatView from './groupChat-Area/view/GroupChatView.vue'
import ProfileSettingView from './profile-settings-area/view/ProfileSettingView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LogInView },
  { path: '/chat', component: ChatView },
  { path: '/registry', component: RegistryView },
  { path: '/groupchat', component: GroupChatView },
  { path: '/settings', component: SettingView},
  { path: '/profilesettings', component: ProfileSettingView}
]
export const router = createRouter({
  history: createWebHistory(),
  routes,

})


