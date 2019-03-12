<template>
  <form>
    <div>
      <label :class="theme">starting color</label>
      <input type="range" id="hue" name="hue" min="0" max="360" v-model="bgHue">
    </div>
    <div>
      <label :class="theme">starting lightness</label>
      <input type="range" id="lightness" name="lightness" min="0" max="100" v-model="bgLightness">
    </div>
  </form>
</template>

<script>
/* eslint-disable no-console */

export default {
  name: 'app',
  computed: {
    bgHue: {
      get: function() {
        return this.$store.state.bgHue
      },
      set: function(value) {
        this.$store.commit('setHue', value)
        this.$store.commit('setBgColor', `hsl(${value}, 100%, ${this.bgLightness}%)`)
      }
    },
    bgLightness: {
      get: function() {
        return this.$store.state.bgLightness
      },
      set: function(value) {
        this.$store.commit('setLightness', value)
        this.$store.commit('setBgColor', `hsl(${this.bgHue}, 100%, ${value}%)`)
      }
    }
  }
}
</script>

<style scoped>
  input {
    position: relative;
    width: 100px;
    height: 10px;
    font-size: 15px;
    z-index: 3;
    color: #000;
  }
</style>
