<template>
  <Spinner v-if="submitting" :fullScreen="true" />
  <div v-else>
    <h1>Sign Up</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <InputField
          v-model="registrationInfo.first_name"
          display="inline-block"
          inputWidth="80px"
          type="text"
          placeholder="Joseph"
          name="first_name"
        >
          <label for="first_name">First Name</label>
        </InputField>

        <InputField
          v-model="registrationInfo.last_name"
          display="inline-block"
          inputWidth="100px"
          type="text"
          placeholder="Bloggs"
          name="last_name"
        >
          <label for="last_name">Last Name</label>
        </InputField>

        <InputField
          v-model="registrationInfo.email"
          display="inline-block"
          inputWidth="218px"
          type="text"
          placeholder="joebloggs@example.com"
          name="email"
        >
          <label for="email">Email Address</label>
        </InputField>
      </div>

      <div>
        <InputField
          v-model="registrationInfo.username"
          display="inline-block"
          type="text"
          placeholder="joe_bloggs"
          name="username"
        >
          <label for="username">Username</label>
        </InputField>

        <InputField
          v-model="registrationInfo.password"
          display="inline-block"
          inputWidth="240px"
          type="password"
          placeholder="Must have at least 5 characters."
          name="password"
        >
          <label for="password">Password</label>
        </InputField>
      </div>
      <PrimaryButton type="success">Sign Up</PrimaryButton>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import isEmpty from 'lodash/isEmpty'
import { REGISTER_USER_ACTION } from '@/store/modules/user/types'

export default {
  name: 'SignUp',

  data: () => ({
    registrationInfo: {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
    },
    submitting: false,
  }),

  computed: mapState({
    user: state => state.user.user,
  }),

  methods: {
    ...mapActions({
      register: REGISTER_USER_ACTION,
    }),

    async handleSubmit() {
      this.submitting = true
      await this.register(this.registrationInfo)
      this.submitting = false

      if (!isEmpty(this.user)) this.$router.push({ name: 'home' })
    },
  },
}
</script>
