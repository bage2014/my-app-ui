import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import TVLive from '../pages/TVLive.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/tv-live',
    name: 'TVLive',
    component: TVLive
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;