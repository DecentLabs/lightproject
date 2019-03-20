<template>
  <div class="form-wrapper" ref="settings">
    <form>
      <div>
        <label for="wakelock">wakelock time limit</label>
        <!--<select id="wakelock" v-model="wakeLockDuration">-->
          <!--<option value="19">10 mins</option>-->
          <!--<option value="20">20 mins</option>-->
          <!--<option value="30">30 mins</option>-->
        <!--</select>-->
        <v-slider v-model="wakeLockDuration"
                  thumb-label="always"
                  thumb-color="black"
                  :thumb-size="22">

        </v-slider>
      </div>
    </form>
    <button v-if="isSettingVisible" @click="showSettings(false)">hide settings</button>
    <button v-if="!isSettingVisible" @click="showSettings(true)">show settings</button>
    <button @click="startLight">start</button>
  </div>
</template>

<script>
  /* eslint-disable no-console */

  export default {
    name: 'app',
    data () {
      return {
        isSettingVisible: true
      }
    },
    computed: {
      wakeLockDuration: {
        get: function () {
          return this.$store.state.wakeLockDuration
        },
        set: function (value) {
          this.$store.dispatch('saveWakeLockDuration', value)
        }
      },
    },
    methods: {
      startLight() {
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
</style>
