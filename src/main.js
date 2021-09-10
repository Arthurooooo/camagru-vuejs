import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store';
import VueImg from 'v-img'
import VueLoadImage from 'vue-load-image'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as VeeValidate from 'vee-validate';

import vuetify from './plugins/vuetify'

Vue.prototype.$api_url = 'http://localhost:8080/api'

Vue.config.productionTip = false;

Vue.use(VeeValidate);

Vue.use(VueImg);
Vue.use(VueLoadImage);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')