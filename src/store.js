import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    loading: false,
    snackbar: {},
  },
  getters: {
    getUser: state => state.user,
    getLoading: state => state.loading,
    getSnackbar: state => state.snackbar,
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
    UPDATE_SNACKBAR: (state, data) => {
      // eslint-disable-next-line no-param-reassign
      state.snackbar = data;
    },
  },
  actions: {
    updateUser: (state, data) => {
      state.commit('UPDATE_USER', data);
    },
    updateLoading: (state, data) => {
      state.commit('UPDATE_LOADING', data);
    },
    updateSnackbar: (state, data) => {
      state.commit('UPDATE_SNACKBAR', data);
    },
  },
});

export default store;
