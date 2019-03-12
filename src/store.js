import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    wakeLockStatus: '',
    bgColor: '',
    bgHue: 46
  },
  getters: {
  },
  mutations: {
    setWakeLockStatus(state, status) {
      state.wakeLockStatus = status
    },
    setHue(state, hue) {
      state.bgHue = hue
    },
    setBgColor(state, color) {
      state.bgColor = color
    }
  },

})

export default store
