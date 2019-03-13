import Vue from 'vue'
import Vuex from 'vuex'

const STORAGE = {
  TIME:'light-time',
  HUE: 'light-hue',
  LIGHTNESS: 'light-lightness'
}


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    wakeLockStatus: '',
    wakeLockTime: 30,
    bgHue: 46,
    bgLightness: 70
  },
  getters: {
    bgColor(state) {
      return `hsl(${state.hue}, 100%, ${state.lightness}%)`
    }
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
    }
  },
  actions: {
    saveHue({commit}, value) {
      commit('setHue', value)
      localStorage.setItem(STORAGE.HUE, value)
    },
    saveLightness({commit}, value) {
      commit('setLightness', value)
      localStorage.setItem(STORAGE.LIGHTNESS, value)
    },
    saveWakeLockTime({commit}, value) {
      commit('setWakeLockTime', value)
      localStorage.setItem(STORAGE.TIME, value)
    },
    loadSettings({commit}) {
      const hue = localStorage.getItem(STORAGE.HUE)
      const lightness = localStorage.getItem(STORAGE.LIGHTNESS)
      const time = localStorage.getItem(STORAGE.TIME)
      if(hue) {
        commit('setHue', hue)
      }

      if(lightness) {
        commit('setLightness', lightness)
      }

      if(time) {
        commit('setWakeLockTime', time)
      }
    }
  }
})

export default store
