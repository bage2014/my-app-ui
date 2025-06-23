import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import TVLive from '../pages/TVLive.vue';
import VideoPlayer from '@/pages/VideoPlayer.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/tv-live',
    name: 'TVLive',
    component: TVLive
  },
  {
    path: '/video-player',
    name: 'VideoPlayer',
    component: VideoPlayer
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;