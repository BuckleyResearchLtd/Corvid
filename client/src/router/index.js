import { createRouter, createWebHistory } from 'vue-router'
import HostView from '@/views/HostView.vue'
import GuestView from '@/views/GuestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Host',
      component: HostView,
    },
    {
      path: '/guest',
      name: 'Guest',
      component: GuestView,
    },
  ],
})

export default router
