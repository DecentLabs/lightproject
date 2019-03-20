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
    wakeLock: null,
    wakeLockStatus: '',
    wakeLockDuration: 30,
    wakeLockRequest: null,
    wakeLockTimeOut: null,
    hue: 46,
    lightness: 70
  },
  getters: {
    bgColor(state) {
      return `hsl(${state.hue}, 100%, ${state.lightness}%)`
    }
  },
  mutations: {
    setWakeLock(state, obj) {
      state.wakeLock = obj
    },
    setWakeLockRequest(state, req) {
      state.wakeLockRequest = req
    },
    setWakeLockStatus(state, status) {
      state.wakeLockStatus = status
    },
    setWakeLockDuration(state, time) {
      state.wakeLockTime = time
    },
    setHue(state, hue) {
      state.hue = hue
    },
    setLightness(state, lightness) {
      state.lightness = lightness
    },
    setWakeLockTimeOut(state, id) {
      state.wakeLockTimeOut = id
    },
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
    saveWakeLockDuration({commit}, value) {
      commit('setWakeLockDuration', value)
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
        commit('setWakeLockDuration', time)
      }
    }
  }
})

export default store
