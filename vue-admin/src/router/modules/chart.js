import Layout from '@/views/layout/Layout';

const chartRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noredirect',
  name: 'chartDemo',
  meta: {
    title: 'charts',
    icon: 'chart',
  },
  children: [
    {
      path: 'keyBoard',
      component: () => import('@/views/chart-demo/keyBoardPage'),
      name: 'KeyboardChart',
      meta: { title: 'keyboardChart', noCache: true },
    },
  ],
};

export default chartRouter;
