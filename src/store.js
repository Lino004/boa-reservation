import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    date: '',
    ficheValid: false
  },
  getters: {
    getFicheValid: state => state.ficheValid,
    getdate: state => state.date,
  },
  mutations: {
    UPDATE_FICHEVALID: (state, data) => {
      state.ficheValid = data;
    },
    UPDATE_DATE: (state, data) => {
      state.date = data;
    },
  },
  actions: {}
})

export default store;
