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
          label="First Name"
          name="first_name"
        />

        <InputField
          v-model="registrationInfo.last_name"
          display="inline-block"
          inputWidth="100px"
          type="text"
          placeholder="Bloggs"
          label="Last Name"
          name="last_name"
        />

        <InputField
          v-model="registrationInfo.email"
          display="inline-block"
          inputWidth="218px"
          type="email"
          placeholder="joebloggs@example.com"
          label="Email Address"
          name="email"
        />
      </div>

      <div>
        <InputField
          v-model="registrationInfo.username"
          display="inline-block"
          type="text"
          placeholder="joe_bloggs"
          label="Username"
          name="username"
        />

        <InputField
          v-model="registrationInfo.password"
          display="inline-block"
          inputWidth="240px"
          type="password"
          placeholder="Must have at least 5 characters."
          label="Password"
          name="password"
        />
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
