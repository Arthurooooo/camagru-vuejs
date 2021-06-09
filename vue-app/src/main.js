import Vue from 'vue'
import VueImg from 'v-img'
import App from './App.vue'

Vue.use(VueImg)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

try {
  JSON.parse("non-JSON data")
} catch(e) {
  console.log('Exception: ', e)
}