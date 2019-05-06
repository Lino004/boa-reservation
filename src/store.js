import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
  },
  getters: {
    getUser: state => state.user,
  },
  mutations: {
    UPDATE_USER: (state, data) => {
      Object.assign(state.user, data);
    },
  },
  actions: {
    updateUser: (state, data) => {
      state.commit('UPDATE_USER', data);
    },
  },
});
