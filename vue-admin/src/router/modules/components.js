import Layout from '@/views/layout/Layout';

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noredirect',
  name: 'ComponentDemo',
  meta: {
    title: 'components',
    icon: 'component',
  },
  children: [
    {
      path: 'vuequill',
      component: () => import('@/views/components-demo/vueQuill'),
      name: 'vueQuill',
      meta: { title: 'vuequill' },
    },
    {
      path: 'markDown',
      component: () => import('@/views/components-demo/markDown'),
      name: 'markDown',
      meta: { title: 'markDown' },
    },
    {
      path: 'stickyTop',
      component: () => import('@/views/components-demo/stickyTop'),
      name: 'stickyTop',
      meta: { title: 'stickyTop' },
    },
    {
      path: 'countTo',
      component: () => import('@/views/components-demo/countTo'),
      name: 'countTo',
      meta: { title: 'countTo' },
    },
    {
      path: 'mixinPage',
      component: () => import('@/views/components-demo/mixinPage'),
      name: 'mixinPage',
      meta: { title: 'mixinPage' },
    },
    {
      path: 'dragDialog',
      component: () => import('@/views/components-demo/dragDialog'),
      name: 'dragDialog',
      meta: { title: 'dragDialog' },
    },
    {
      path: 'dndListPage',
      component: () => import('@/views/components-demo/dndListPage'),
      name: 'dndListDemo',
      meta: { title: 'dndListDemo' },
    },
  ],
};

export default componentsRouter;
