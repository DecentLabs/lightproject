import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    wakeLockStatus: '',
    wakeLockTime: 30,
    bgColor: '',
    bgHue: 46,
    bgLightness: 70
  },
  getters: {
  },
  mutations: {
    setWakeLockStatus(state, status) {
      state.wakeLockStatus = status
    },
    setWakeLockTime(state, time) {
      state.wakeLockTime = time
    },
    setHue(state, hue) {
      state.bgHue = hue
    },
    setLightness(state, lightness) {
      state.bgLightness = lightness
    },
    setBgColor(state, color) {
      state.bgColor = color
    },
    loadSettings(state, {hue, lightness, time}) {
      state.bgHue = hue
      state.bgLightness = lightness
      state.wakeLockTime = time
    }
  },
  actions: {
    saveHue({commit}, value) {
      commit('setHue', value)
      localStorage.setItem('light-hue', value)
    },
    saveLightness({commit}, value) {
      commit('setLightness', value)
      localStorage.setItem('light-lightness', value)
    },
    saveWakeLockTime({commit}, value) {
      commit('setWakeLockTime', value)
      localStorage.setItem('light-time', value)
    },
  }
})

export default store
