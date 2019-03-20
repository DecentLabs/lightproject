<template>
  <div id="app" ref="main"
       :class="theme" :style="{backgroundColor: bgColor}"
       @touchstart="onStart" @touchmove="onMove"
  >
    <p>{{ wakeLockStatus }}</p>
    <div>
      <settings @start="startWL"></settings>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-console */

  import { mapState } from 'vuex'
  import settings from './components/settings'

  export default {
    name: 'app',
    components: {settings},
    data () {
      return {
        startX: 0,
        startY: 0
      }
    },
    computed: {
      ...mapState([
        'wakeLock',
        'wakeLockStatus',
        'wakeLockRequest',
        'wakeLockDuration',
        'wakeLockTimeOut',
        'startTime'
      ]),
      bgColor () {
        return this.$store.getters.bgColor
      },
      theme () {
        return parseInt(this.$store.state.lightness, 10) < 40 ? 'dark' : 'light'
      }
    },
    methods: {
      onStart (e) {
        this.startX = e.touches[0].clientX
        this.startY = e.touches[0].clientY
      },
      onMove (e) {
        let hue = this.$store.state.hue
        let lightness = this.$store.state.lightness

        let posY = e.changedTouches[0].clientY
        let posX = e.changedTouches[0].clientX
        let deltaY = Math.abs(posY - this.startY)
        let deltaX = Math.abs(posX - this.startX)

        if (deltaY > 0 && deltaX < 10) {
          if (posY < this.startY) {
            console.log('up')
            lightness += deltaY * 0.2
          } else {
            console.log('down')
            lightness -= deltaY * 0.2
          }
        }

        if (deltaX > 0 && deltaY < 10) {
          if (posX > this.startX) {
            hue += deltaX * 0.2
          } else {
            hue -= deltaX * 0.2
          }
        }

        this.startY = posY
        this.startX = posX
        this.$store.dispatch('saveHue', hue)
        this.$store.dispatch('saveLightness', lightness)
      },
      initWL() {
        if ('getWakeLock' in navigator) {
          navigator.getWakeLock('screen').then(res => {
            const wakeLockObj = res
            let wakeLockRequest = wakeLockObj.createRequest();
            this.$store.commit('setWakeLock', wakeLockObj)
            this.$store.commit('setWakeLockRequest', wakeLockRequest)
            this.$store.commit('setWakeLockStatus', 'WakeLock OK')
            console.log('getWakeLock success', wakeLockObj)

            console.log(wakeLockRequest)
            if (wakeLockRequest) {
              this.cancelWL()
            }
          }).catch((err) => {
            status = 'wakelock error'
            console.log('Could not obtain wake lock', err);
          });
        } else {
          console.log('getWakeLock not supported')
          this.$store.commit('setWakeLockStatus', 'WakeLock not supported')

        }
      },
      cancelWL() {
        const timeOutID = window.setTimeout(() => {
          this.wakeLockRequest.cancel();
          this.$store.commit('setWakeLockRequest', null)
        }, this.wakeLockDuration * 60 * 1000)
        this.$store.commit('setTimeOutID', timeOutID)
      },
      startWL() {
        if (this.wakeLockRequest && this.wakeLockTimeOut) {
          window.clearTimeout(this.wakeLockTimeOut)
          this.$store.commit('setWakeLockRequest', this.wakeLock.createRequest())
          if (this.$store.state.wakeLockRequest) {
            this.cancelWL()
          }
        } else {
          this.initWL()
        }
      }
    },
    mounted () {
      this.$store.dispatch('loadSettings')
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

  .dark {
    color: #fefefe;
  }

  .light {
    color: #020204
  }
</style>
