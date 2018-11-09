<template>
  <Spinner v-if="submitting" :fullScreen="true" />
  <div v-else>
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <InputField
        v-model="userData.username"
        type="text"
        placeholder="joe_bloggs"
        label="Username"
        name="username"
        icon="user"
      />

      <InputField
        v-model="userData.password"
        type="password"
        placeholder="•••••••••"
        label="Password"
        name="password"
        icon="key"
      />

      
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
import { ADD_ALERT_ACTION } from '@/store/modules/alerts/types'
import { LOGIN_ACTION } from '@/store/modules/user/types'

export default {
  name: 'LoginView',

  data: () => ({
    userData: {
      username: '',
      password: '',
    },
    submitting: false,
    remember: false,
  }),

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
