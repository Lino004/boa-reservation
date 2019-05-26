import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    loading: false,
  },
  getters: {
    getUser: state => state.user,
    getLoading: state => state.loading,
  },
  mutations: {
    UPDATE_USER: (state, data) => {
      // eslint-disable-next-line no-param-reassign
      state.user = data;
    },
    UPDATE_LOADING: (state, data) => {
      // eslint-disable-next-line no-param-reassign
      state.loading = data;
    },
  },
  actions: {
    updateUser: (state, data) => {
      state.commit('UPDATE_USER', data);
    },
    updateLoading: (state, data) => {
      state.commit('UPDATE_LOADING', data);
    },
  },
});

export default store;
