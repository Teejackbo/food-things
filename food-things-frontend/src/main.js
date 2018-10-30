import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import './registerServiceWorker'
import './style/reset.scss'
import PrimaryButton from '@/components/PrimaryButton.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'
import Spinner from '@/components/Spinner.vue'
import InputField from '@/components/InputField.vue'

Vue.config.productionTip = false
Vue.component('PrimaryButton', PrimaryButton)
Vue.component('SecondaryButton', SecondaryButton)
Vue.component('InputField', InputField)
Vue.component('Spinner', Spinner)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
