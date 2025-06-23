import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import VideoPlayer from '@/pages/VideoPlayer.vue';
import VideoList from '../pages/VideoList.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/video-list',
    name: 'VideoList',
    component: VideoList
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