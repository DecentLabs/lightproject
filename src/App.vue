<template>
  <v-app>
    <div id="app" ref="main"
         :style="{backgroundColor: bgColor}"
         @touchstart="onStart" @touchmove="onMove" @touchend="onTouch">
    </div>
    <p>{{ wakeLockStatus }}</p>
    <settings @start="startWL"></settings>
  </v-app>
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
        startY: 0,
        isFaded: false,
      }
    },
    computed: {
      ...mapState([
        'hue',
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
        if (this.isFaded) {
          this.shine()
          this.startWL()
        }
      },
      startWL () {
        this.$store.dispatch('startWL')
        this.fade()
      },
      fade () {
        window.setTimeout(() => {
          this.$refs.main.style.opacity = 0.7
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
    },
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
    transition: opacity 0.3s;
  }

  .dark {
    color: #fefefe;
  }

  .light {
    color: #020204
  }
</style>
