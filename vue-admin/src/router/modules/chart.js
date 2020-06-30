import Layout from '@/views/layout/Layout';

const chartRouter = {
  path: 'chart',
  component: Layout,
  redirect: 'noredirect',
  name: 'chartDemo',
  meta: {
    title: 'components',
    icon: 'chart',
  },
  children: [
    {
      path: 'keyBoard',
      component: () => import('@/views/chart-demo/keyBoardPage'),
      name: 'keyBoard',
      meta: { title: 'keyBoard' },
    },
  ],
};

export default chartRouter;
