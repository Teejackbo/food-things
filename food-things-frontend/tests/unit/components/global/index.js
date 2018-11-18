import Vue from 'vue'
import Vuelidate from 'vuelidate'
import PrimaryButton from '@/components/PrimaryButton.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'
import Spinner from '@/components/Spinner.vue'
import InputField from '@/components/InputField.vue'
import Checkbox from '@/components/Checkbox.vue'

export default function() {
  Vue.use(Vuelidate)
  Vue.component('PrimaryButton', PrimaryButton)
  Vue.component('SecondaryButton', SecondaryButton)
  Vue.component('InputField', InputField)
  Vue.component('Spinner', Spinner)
  Vue.component('Checkbox', Checkbox)
}
