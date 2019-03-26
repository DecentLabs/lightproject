import Vue from 'vue'
import App from './App.vue'
import store from './store.js'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './registerServiceWorker'

Vue.use(Vuetify)

Vue.config.productionTip = false

if ( 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js').then(() => {
    console.log("Service Worker Registered!")
  })
}

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
