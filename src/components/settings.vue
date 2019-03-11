<template>
  <form>
    <label>starting color</label>
    <input type="range" id="hue" name="hue" min="0" max="360" :value="bgHue">
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
        console.log(value)
        this.$store.commit('setStartingColor', `hsl(${value}, 100%, ${this.lightness}%)`)
      }
    }
  },
  mounted() {
    this.$store.commit('setStartingColor', `hsl(${this.hue}, 100%, ${this.lightness}%)`)
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
