import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    from: {},
  },
  mutations: {
    UPDATE_FROM: (state, data) => {
      state.from = data;
    }
  },
  actions: {
    updateFrom: (store, val) => {
      store.commit('UPDATE_FROM', val)
    },
  }
})

export default store;
