import './firebase'
import Vue from 'vue'
import App from './App.vue'
import VeeValidate from 'vee-validate'
import router from './router'
import { firestorePlugin } from 'vuefire'

Vue.use(firestorePlugin)
Vue.use(VeeValidate)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
