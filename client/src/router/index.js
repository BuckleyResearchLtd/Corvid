import { createRouter, createWebHistory } from 'vue-router';
import GuestView from '@/views/GuestView.vue';
import HomeView from '@/views/HomeView.vue';
import MeetingView from '@/views/MeetingView.vue';
import HostView from '@/views/HostView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/join/:meetingId',
      name: 'Join',
      component: HomeView,
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/meeting/:id',
      name: 'Meeting',
      component: MeetingView,
    },
    {
      path: '/host',
      name: 'Host',
      component: HostView,
    },
    {
      path: '/guest',
      name: 'Guest',
      component: GuestView,
    },

  ],
});

export default router;
