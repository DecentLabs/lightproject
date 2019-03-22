import Vue from 'vue'
import Vuex from 'vuex'

/* eslint-disable no-console */

const STORAGE = {
  DURATION:'light-duration',
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
    setWakeLockDuration(state, duration) {
      state.wakeLockDuration = duration
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
    saveWakeLockDuration({commit, dispatch}, value) {
      commit('setWakeLockDuration', value)
      localStorage.setItem(STORAGE.DURATION, value)
      dispatch('startWL')
    },
    loadSettings({commit}) {
      const hue = localStorage.getItem(STORAGE.HUE)
      const lightness = localStorage.getItem(STORAGE.LIGHTNESS)
      const duration = localStorage.getItem(STORAGE.DURATION)

      if(hue && !isNaN(hue)) {
        commit('setHue', hue)
      }

      if(lightness && !isNaN(lightness)) {
        commit('setLightness', lightness)
      }

      if(duration && !isNaN(duration)) {
        commit('setWakeLockDuration', duration)
      }
    },
    initWL ({commit, dispatch}) {
      if ('getWakeLock' in navigator) {
        navigator.getWakeLock('screen').then(res => {
          const wakeLockObj = res
          let wakeLockRequest = wakeLockObj.createRequest()
          commit('setWakeLock', wakeLockObj)
          commit('setWakeLockRequest', wakeLockRequest)
          commit('setWakeLockStatus', 'WakeLock OK')
          console.debug('getWakeLock success', wakeLockObj)

          if (wakeLockRequest) {
            dispatch('cancelWL')
          }
        }).catch((err) => {
          console.log('Could not obtain wake lock', err)
        })
      } else {
        console.debug('getWakeLock not supported')
        commit('setWakeLockStatus', 'WakeLock not supported')
      }
    },
    cancelWL ({state, commit}) {
      const timeOutID = window.setTimeout(() => {
        state.wakeLockRequest.cancel()
        commit('setWakeLockRequest', null)
        console.debug('wakelock cancelled')
      }, state.wakeLockDuration * 60 * 1000)
      commit('setWakeLockTimeOut', timeOutID)
    },
    startWL ({state, commit, dispatch}) {
      if (state.wakeLockRequest && state.wakeLockTimeOut) {
        window.clearTimeout(state.wakeLockTimeOut)
        commit('setWakeLockRequest', state.wakeLock.createRequest())
        if (state.wakeLockRequest) {
          dispatch('cancelWL')
        }
      } else {
        dispatch('initWL')
      }
    },
  }
})

export default store
