import Vue from 'vue';
import 'normalize.css/normalize.css';

import Cookies from 'js-cookie';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import videoPlayer from 'vue-video-player';

import '@/styles/index.scss'; // global css

import App from './App';
import router from './router';
import store from './store';
import './plugin';

import i18n from './lang';
import './icons';
import './permission';
import './errorLog';
import * as filters from './filter';
import directives from './directive';

Vue.use(videoPlayer);

Vue.use(Element, {
  size: Cookies.get('size') || 'medium',
  i18n: (key, value) => i18n.t(key, value),
});
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
Vue.use(directives);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
