import Vue from 'vue';
import { getToken, setToken, removeToken } from '@/utils/auth';

const user = {
  state: {
    user: '',
    name: '',
    avatar: '',
    token: getToken(),
    roles: [],
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
  },
  actions: {
    loginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim();
      const params = {
        username,
        password: userInfo.password,
      };
      return new Promise((resolve, reject) => {
        Vue.prototype.$http.post('auth/login', params).then((response) => {
          const { data } = response.data;
          const token = data._id;
          commit('SET_TOKEN', token);
          commit('SET_ROLES', data.roles);
          setToken(token);
          resolve(data);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        Vue.prototype.$http.get('auth/userInfo').then((response) => {
          if (!response.data) {
            reject(new Error(response.data.msg));
          }
          const { data } = response.data;
          if (data.roles && data.roles.length > 0) {
            commit('SET_ROLES', data.roles);
          } else {
            reject(new Error(response.data.msg));
          }
          commit('SET_NAME', data.user_name);
          commit('SET_AVATAR', data.avatar);
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      });
    },
    logOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        Vue.prototype.$http.post('auth/logout', state.token).then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', '');
          removeToken();
          resolve();
        }).catch((error) => {
          reject(error);
        });
      });
    },
    fedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      });
    },
    setUserInfo({ commit, dispatch }, data) {
      const { roles, name, avatar } = data;
      commit('SET_TOKEN', roles);
      setToken(roles);
      commit('SET_ROLES', roles);
      commit('SET_NAME', name);
      commit('SET_AVATAR', avatar);
      dispatch('GenerateRoutes', data); // 根据用户的role 获取对应的菜单权限
    },
    registerUser({ dispatch }, userInfo) {
      return new Promise((resolve) => {
        Vue.prototype.$http.post('auth/user', userInfo).then((response) => {
          const { data } = response;
          dispatch('setUserInfo', data);
          resolve();
        });
      });
    },
    // 更新用户信息
    updateUser({ dispatch }, userInfo) {
      return new Promise((resolve) => {
        Vue.prototype.$http.put('auth/user', userInfo).then((response) => {
          const { data } = response;
          dispatch('setUserInfo', data);
          resolve();
        });
      });
    },
  },
};

export default user;
