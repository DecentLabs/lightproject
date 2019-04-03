<template>
  <v-app>
    <div id="app" ref="main"
         :style="{backgroundColor: bgColor, height}"
         @touchstart="onStart" @touchmove="onMove" @touchend="onTouch">
    </div>
    <p>{{ wakeLockStatus }}</p>
    <settings></settings>
    <my-version></my-version>
  </v-app>
</template>

<script>
  /* eslint-disable no-console */

  import { mapState } from 'vuex'
  import settings from './components/settings'
  import myVersion from './components/version.vue'

  export default {
    name: 'app',
    components: {settings, myVersion},
    data () {
      return {
        startX: 0,
        startY: 0,
        isFaded: false,
        height: '100vh'
      }
    },
    computed: {
      ...mapState([
        'hue',
        'lightness',
        'wakeLockDuration',
        'wakeLockStatus',
      ]),
      bgColor () {
        return this.$store.getters.bgColor
      },
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
            console.debug('up')
            lightness += deltaY * 0.2
          } else {
            console.debug('down')
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
      onTouch () {
        this.shine()
        this.startWL()
      },
      startWL () {
        this.$store.dispatch('startWL')
        this.fade()
      },
      fade () {
        window.setTimeout(() => {
          this.$store.commit('setLightness', this.lightness * 0.8)
          this.isFaded = true
        }, this.wakeLockDuration * 0.8 * 60 * 1000)
      },
      shine () {
        this.$refs.main.style.opacity = 1
        this.isFaded = false
      },
    },
    mounted () {
      this.$store.dispatch('loadSettings')
      this.height = window.innerHeight
      this.startWL()
    },
  }
</script>

<style>

  body,
  html {
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
    transition: opacity 0.3s;
    overflow: hidden;
  }

  .dark {
    color: #fefefe;
  }

  .light {
    color: #020204
  }

  .version {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
</style>
