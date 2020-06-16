import { Message } from 'element-ui';
import NProgress from 'nprogress';
import { getToken } from '@/utils/auth';
import router from './router';
import store from './store';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

const whiteList = ['/login', 'auth-redirect'];
const hasPermission = (roles, permissionRoles) => {
  if (roles.indexOf('admin') >= 0) {
    return true;
  }
  if (!permissionRoles) {
    return true;
  }
  return roles.some(role => permissionRoles.indexOf(role) >= 0);
};
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else if (store.getters.roles.length === 0) {
      store.dispatch('getUserInfo').then((res) => {
        const { roles } = res.data.data;
        store.dispatch('GenerateRoutes', { roles }).then(() => {
          // router.addRoutes(store.getters.addRouters);
          next({ ...to, replace: true });
        });
      }).catch((err) => {
        store.dispatch('fedLogOut').then(() => {
          Message.error(err || 'Verification Failed, please login again!');
          next({ path: '/' });
        });
      });
    } else if (hasPermission(store.getters.roles, to.meta.roles)) {
      next();
    } else {
      next({ path: '/401', replace: true, query: { noGoBack: true } });
    }
  } else if (whiteList.includes(to.path)) {
    next();
  } else {
    next(`/login?redirect=${to.path}`);
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
});
