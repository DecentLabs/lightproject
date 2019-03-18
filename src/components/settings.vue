<template>
  <div class="form-wrapper" ref="settings">
    <form>
      <div>
        <label :class="theme" for="hue">starting color</label>
        <input type="range" id="hue" name="hue" min="0" max="360" v-model="bgHue">
      </div>
      <div>
        <label :class="theme" for="lightness">starting lightness</label>
        <input type="range" id="lightness" name="lightness" min="0" max="100" v-model="bgLightness">
      </div>
      <div>
        <label for="wakelock">wakelock time limit</label>
        <select id="wakelock" v-model="wakeLockTime">
          <option value="10">10 mins</option>
          <option value="20">20 mins</option>
          <option value="30">30 mins</option>
        </select>
      </div>
    </form>
    <button v-if="isSettingVisible" @click="showSettings(false)">hide settings</button>
    <button v-if="!isSettingVisible" @click="showSettings(true)">show settings</button>
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
      bgHue: {
        get: function () {
          return this.$store.state.hue
        },
        set: function (value) {
          this.$store.dispatch('saveHue', value)
        }
      },
      bgLightness: {
        get: function () {
          return this.$store.state.lightness
        },
        set: function (value) {
          this.$store.dispatch('saveLightness', value)
        }
      },
      wakeLockTime: {
        get: function () {
          return this.$store.state.wakeLockTime
        },
        set: function (value) {
          this.$store.dispatch('saveWakeLockTime', value)
        }
      },
    },
    methods: {
      showSettings (toShow) {
        const settings = this.$refs.settings

        if (toShow) {
          settings.style.transform = 'translateY(0)'
        } else {
          const form = settings.querySelector('form')
          settings.style.transform = `translateY(${form.clientHeight * -1 + 20}px)`
        }

        this.isSettingVisible = toShow
      }
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
