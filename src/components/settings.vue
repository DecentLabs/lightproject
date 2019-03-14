<template>
  <div class="form-wrapper">
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
  </div>
</template>

<script>
/* eslint-disable no-console */

export default {
  name: 'app',
  computed: {
    bgHue: {
      get: function() {
        return this.$store.state.hue
      },
      set: function(value) {
        this.$store.dispatch('saveHue', value)
      }
    },
    bgLightness: {
      get: function() {
        return this.$store.state.lightness
      },
      set: function(value) {
        this.$store.dispatch('saveLightness', value)
      }
    },
    wakeLockTime: {
      get: function() {
        return this.$store.state.wakeLockTime
      },
      set: function(value) {
        this.$store.dispatch('saveWakeLockTime', value)
      }
    },
  }
}
</script>

<style scoped>
  .form-wrapper {
    display: flex;
    justify-content: center;
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
</style>
