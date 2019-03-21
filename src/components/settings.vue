<template>
  <v-container class="form-wrapper" ref="settings">
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
           @click="showSettings(false)"
           depressed round large :dark="!isDark">hide settings</v-btn>
    <v-btn v-if="!isSettingVisible"
           @click="showSettings(true)"
           depressed round large :dark="!isDark">show settings</v-btn>
    <v-btn @click="startLight"
           depressed fab large  :dark="!isDark">start</v-btn>
  </v-container>
</template>

<script>
  /* eslint-disable no-console */

  export default {
    name: 'app',
    data () {
      return {
        isSettingVisible: true,
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
      }
    },
    methods: {
      startLight () {
        this.$emit('start')
        this.setFullScreen()
      },
      setFullScreen () {
        if (document.fullscreenElement || document.webkitFullscreenElement) {
          document.exitFullscreen()
        } else {
          document.body.requestFullscreen()
        }
      },
      showSettings (toShow) {
        const settings = this.$refs.settings

        if (toShow) {
          settings.style.transform = 'translateY(0)'
        } else {
          const form = settings.querySelector('form')
          settings.style.transform = `translateY(${form.clientHeight * -1 + 20}px)`
        }

        this.isSettingVisible = toShow
      },
    },
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
