import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store';
import VueImg from 'v-img'
import VueLoadImage from 'vue-load-image'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import Icon from 'vue-awesome/components/Icon';
export const bus = new Vue();

Vue.prototype.$bus = bus;

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);


Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.component('v-icon', Icon);


Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueImg);
Vue.use(VueLoadImage);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// try {
//   JSON.parse("non-JSON data")
// } catch(e) {
//   console.log('Exception: ', e)
// }