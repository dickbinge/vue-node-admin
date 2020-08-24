import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/views/layout/Layout';
import componentsRouter from './modules/components';
import chartRouter from './modules/chart';

Vue.use(VueRouter);

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true,
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    hidden: false,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          noCache: true,
        },
      },
    ],
  },
  {
    path: '/guide',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true },
      },
    ],
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404',
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401'),
        name: 'page401',
        meta: { title: 'page401', noCache: true },
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404'),
        name: 'page404',
        meta: { title: 'page404', noCache: true },
      },
    ],
  },
  {
    path: '/video',
    component: Layout,
    redirect: 'noredirect',
    name: 'videoPages',
    meta: {
      title: 'videoPages',
      icon: '404',
    },
    children: [
      {
        path: 'videoBaberrage',
        component: () => import('@/views/video-demo/videoBaberrage'),
        name: 'videoBaberrage',
        meta: { title: 'videoBaberrage', noCache: true },
      },
      {
        path: 'cutPicture',
        component: () => import('@/views/video-demo/cutPicture'),
        name: 'cutPicture',
        meta: { title: 'cutPicture', noCache: true },
      },
    ],
  },
];
export default new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
});

export const asyncRouterMap = [
  {
    path: '/icon',
    component: Layout,
    redirect: 'icon/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true },
      },
    ],
  },
  componentsRouter,
  chartRouter,
];
