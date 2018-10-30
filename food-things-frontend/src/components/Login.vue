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
        icon="user"
      />

      <InputField
        v-model="userData.password"
        type="password"
        placeholder="•••••••••"
        label="Password"
        icon="key"
      />

      <InputField
        v-model="remember"
        type="checkbox"
        label="Remember Me"
      />

      <PrimaryButton type="success">Login</PrimaryButton>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { LOGIN_ACTION } from '@/store/modules/user/types'

export default {
  name: 'Login',

  data: () => ({
    userData: {
      username: '',
      password: '',
    },
    submitting: false,
    remember: false,
  }),

  computed: mapState({
    user: state => state.user.user,
  }),

  methods: {
    ...mapActions({
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

      if (this.user) this.$router.push({ name: 'home' })
    },
  },
}
</script>
