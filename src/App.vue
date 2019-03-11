<template>
  <div id="app" :style="{backgroundColor: bgColor}"
    @touchstart="onStart" @touchmove="onMove"
  >
    <p>{{ wlStatus }}</p>
  </div>
</template>

<script>
/* eslint-disable no-console */

import { initWakeLock }from './utils/wakelock'

export default {
  name: 'app',
  data() {
    return {
      startX: 0,
      startY: 0,
      lightness: 70,
      hue: 70
    }
  },
  computed: {
    bgColor() {
      return `hsl(${this.hue}, 100%, ${this.lightness}%)`
    },
    wlStatus() {
      return this.$store.state.wakeLockStatus
    }
  },
  methods: {
    onStart(e) {
      this.startX = e.touches[0].clientX
      this.startY = e.touches[0].clientY
    },
    onMove(e) {
      let posY = e.changedTouches[0].clientY
      let posX = e.changedTouches[0].clientX
      let deltaY = Math.abs(posY - this.startY)
      let deltaX = Math.abs(posX - this.startX)

      if (deltaY > 0 && deltaX < 10) {
        if  (posY < this.startY) {
          console.log('up')
          this.lightness += deltaY * 0.2
        } else {
          console.log('down')
          this.lightness -= deltaY * 0.2
        }
      }

      if (deltaX > 0 && deltaY < 10) {
        if (posX > this.startX) {
          this.hue += deltaX * 0.2
        } else {
          this.hue -= deltaX * 0.2
        }
      }

      this.startY = posY
      this.startX = posX
    }
  },
  mounted() {
    initWakeLock().then(res => {
      const status = res
      this.$store.commit('setWakeLockStatus', status)
    })
  }
}
</script>

<style>

body {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

#app {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  text-align: center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
