import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store/'
import './registerServiceWorker'
import './style/reset.scss'
import PrimaryButton from '@/components/PrimaryButton.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'
import Spinner from '@/components/Spinner.vue'
import InputField from '@/components/InputField.vue'
import Checkbox from '@/components/Checkbox.vue'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.component('PrimaryButton', PrimaryButton)
Vue.component('SecondaryButton', SecondaryButton)
Vue.component('InputField', InputField)
Vue.component('Spinner', Spinner)
Vue.component('Checkbox', Checkbox)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
