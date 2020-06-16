const tagsView = {
  state: {
    visitedViews: [],
    cachedViews: [],
  },
  mutations: {
    ADD_VISITED_VIEW: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return;
      state.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name',
        }),
      );
    },
    ADD_CACHED_VIEW: (state, view) => {
      if (state.cachedViews.includes(view.name)) return;
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name);
      }
    },
    DEL_VISITED_VIEW: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1);
          break;
        }
      }
    },
    DEL_CACHED_VIEW: (state, view) => {
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i);
          state.cachedViews.splice(index, 1);
          break;
        }
      }
    },
    DEL_OTHER_VISITED_VIEW: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews = state.visitedViews.splice(i, i + 1);
          break;
        }
      }
    },
    DEL_OTHER_CACHED_VIEW: (state, view) => {
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i);
          state.cachedViews = state.cachedViews.splice(index, index + 1);
          break;
        }
      }
    },
    DEL_ALL_VISITED_VIEW: (state) => {
      state.visitedViews = [];
    },
    DEL_ALL_CACHED_VIEW: (state) => {
      state.cachedViews = [];
    },
    UPDATE_VISITED_VIEW: (state, view) => {
      for (let v of state.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    },
  },
  actions: {
    addView({ dispatch }, view) {
      dispatch('addVisitedView', view);
      dispatch('addCachedView', view);
    },
    addVisitedView({ commit }, view) {
      commit('ADD_VISITED_VIEW', view);
    },
    addCachedView({ commit }, view) {
      commit('ADD_CACHED_VIEW', view);
    },
    delView({ dispatch, state }, view) {
      return new Promise((resolve) => {
        dispatch('delVisitedView', view);
        dispatch('delCachedView', view);
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews],
        });
      });
    },
    delVisitedView({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEW', view);
        resolve([...state.visitedViews]);
      });
    },
    delCachedView({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_CACHED_VIEW', view);
        resolve([...state.cachedViews]);
      });
    },
    delOtherViews({ dispatch, state }, view) {
      return new Promise((resolve) => {
        dispatch('delOtherVisitedViews', view);
        dispatch('delOtherCachedViews', view);
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews],
        });
      });
    },
    delOtherVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_OTHER_VISITED_VIEW', view);
        resolve([...state.visitedViews]);
      });
    },
    delOtherCachedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_OTHER_CACHED_VIEW', view);
        resolve([...state.cachedViews]);
      });
    },
    delAllViews({ dispatch, state }) {
      return new Promise((resolve) => {
        dispatch('delAllVisitedViews');
        dispatch('delAllCachedViews');
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews],
        });
      });
    },
    delAllVisitedViews({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VISITED_VIEW');
        resolve([...state.visitedViews]);
      });
    },
    delAllCachedViews({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_CACHED_VIEW');
        resolve([...state.cachedViews]);
      });
    },
    updateVisitedView({ commit }, view) {
      commit('UPDATE_VISITED_VIEW', view);
    },
  },
};
export default tagsView;
