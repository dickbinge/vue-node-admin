import Vue from 'vue';
import axios from 'axios';
import { Message } from 'element-ui';
import { getToken } from '@/utils/auth';

const root = `${window.location.protocol}//${window.location.host}`;
const _axios = axios.create({
  baseURL: `${root}/sys`,
  timeout: 30 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
});

_axios.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers['X-Token'] = getToken();
    }
    if (config.method === 'get') {
      config.params = {
        _t: Date.parse(new Date()) / 1000,
        ...config.params,
      };
    }
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  },
);

_axios.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data.code === 401) { // 用户信息登出
      window.location.href = '/#/login';
      return Promise.reject(data);
    }
    if (data.code === 0) {
      return response;
    }
    if (data.code === 500) {
      Message({
        message: data.msg || '服务器内部异常！',
        type: 'error',
        duration: 5 * 1000,
      });
      return Promise.reject(data);
    }
    return response;
  },
  (error) => {
    console.log(`err: ${error}`);
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
  },
);

Plugin.install = (Vue) => {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
    $http: {
      get() {
        return _axios;
      },
    },
  });
};
Vue.use(Plugin);

export default Plugin;
