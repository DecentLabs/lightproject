import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    wakeLockStatus: ''
  },
  getters: {},
  mutations: {
    setWakeLockStatus(state, status) {
      state.wakeLockStatus = status
    }
  },
  actions: {}
})

export default store
