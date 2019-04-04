<template>
  <v-container class="form-wrapper" :class="!isSettingVisible && 'hidden'" ref="settings">
    <form>
      <v-label :dark="isDark">wakelock time limit</v-label>
      <v-slider v-model="wakeLockDuration"
                thumb-label="always"
                :thumb-size="22"
                :dark="isDark"
                max="30"
      ></v-slider>
    </form>
    <v-btn v-if="isSettingVisible"
           @click="showSettings"
           depressed round large :dark="!isDark">hide settings
    </v-btn>
    <v-btn v-if="!isSettingVisible"
           @click="showSettings"
           depressed round large :dark="!isDark">show settings
    </v-btn>
  </v-container>
</template>

<script>
  /* eslint-disable no-console */

  export default {
    name: 'app',
    data () {
      return {
        isSettingVisible: false,
        isFullScreen: false
      }
    },
    computed: {
      wakeLockDuration: {
        get: function () {
          return this.$store.state.wakeLockDuration
        },
        set: function (value) {
          this.$store.dispatch('saveWakeLockDuration', value)
        },
      },
      isDark () {
        return parseInt(this.$store.state.lightness, 10) < 40
      },
    },
    methods: {
      setFullScreen () {
        if (document.fullscreenElement || document.webkitFullscreenElement) {
          document.exitFullscreen()
        } else {
          document.body.requestFullscreen()
          this.isFullScreen = true
        }
      },
      showSettings () {
        this.isSettingVisible = !this.isSettingVisible
      },
    }
  }
</script>

<style scoped>
  .form-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform .6s;
    z-index: 100;
  }

  .form-wrapper.hidden {
    transform: translateY(calc(-100% + 80px));
  }

  form {
    padding: 20px;
    text-align: left;
  }

  label {
    display: inline-block;
    margin: 0 15px 10px 0;
  }

  input {
    position: relative;
    width: 100px;
    height: 10px;
    font-size: 15px;
    z-index: 3;
  }

  button {
    height: 20px;
  }

  .v-input__slot {
    margin-bottom: 0;
  }
</style>
