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
  ],
};

export default componentsRouter;
