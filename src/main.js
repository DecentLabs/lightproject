import Vue from 'vue'
import App from './App.vue'
import store from './store.js'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
