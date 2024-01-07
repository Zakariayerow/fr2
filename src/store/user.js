export default {
  state: {
    user: {}
  },

  getters: {
    getAuthUser(state) {
      return state.user;
    }
  },

  mutations: {
    setAuthUser(state, data) {
      state.user = data;
    }
  },

  actions: {
    setAuthUser({ commit }, data) {
      commit('setAuthUser', data);
    }
  }
}