import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/views/layout/Layout';

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
];
export default new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
});
