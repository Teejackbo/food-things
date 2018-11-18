<template>
  <Spinner v-if="submitting" :fullScreen="true" />
  <div v-else>
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <InputField
        v-model="userData.username"
        :valid="!$v.userData.username.$invalid"
        :error="$v.userData.username.$error"
        placeholder="joe_bloggs"
        name="username"
        @blur="$v.userData.username.$touch()"
      >
        <label for="username">Username</label>
      </InputField>
      <ValidationMessage v-show="$v.userData.username.$error">Please enter a username.</ValidationMessage>

      <InputField
        v-model="userData.password"
        :valid="!$v.userData.password.$invalid"
        :error="$v.userData.password.$error"
        type="password"
        placeholder="•••••••••"
        name="password"
        @blur="$v.userData.password.$touch()"
      >
        <label for="password">Password</label>
      </InputField>
      <ValidationMessage v-show="$v.userData.password.$error">Please enter a password.</ValidationMessage>

      <label>
        Remember Me?
        <Checkbox v-model="remember" />
      </label>

      <PrimaryButton type="success" data-cy-login-btn>Login</PrimaryButton>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { ADD_ALERT_ACTION } from '@/store/modules/alerts/types'
import { LOGIN_ACTION } from '@/store/modules/user/types'
import ValidationMessage from '@/components/ValidationMessage.vue'

export default {
  name: 'LoginView',

  components: {
    ValidationMessage,
  },

  data: () => ({
    userData: {
      username: '',
      password: '',
    },
    submitting: false,
    remember: false,
  }),

  validations: {
    userData: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },

  computed: mapState({
    id: state => state.user.user.id,
  }),

  created() {
    if (this.id) {
      this.$router.replace({ name: 'home' })
      this.alert({
        message: 'You are already logged in.',
        type: 'error',
        timeout: 3000,
      })
    }
  },

  methods: {
    ...mapActions({
      alert: ADD_ALERT_ACTION,
      login: LOGIN_ACTION,
    }),

    async handleSubmit() {
      this.$v.userData.$touch()
      if (this.$v.userData.$error) return

      this.submitting = true
      await this.login({
        loginInfo: this.userData,
        remember: this.remember,
        alert: true,
      })
      this.submitting = false

      if (this.id) this.$router.push({ name: 'home' })
    },
  },
}
</script>
