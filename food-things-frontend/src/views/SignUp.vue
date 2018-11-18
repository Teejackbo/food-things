<template>
  <Spinner v-if="submitting" :fullScreen="true" />
  <div v-else>
    <h1>Sign Up</h1>
    <form @submit.prevent="handleSubmit">
      <InputField
        v-model.trim="info.first_name"
        :valid="!$v.info.first_name.$invalid"
        :error="$v.info.first_name.$error"
        placeholder="Joseph"
        name="first_name"
        @blur="$v.info.first_name.$touch()"
      >
        <label for="first_name">First Name</label>
      </InputField>
      <div v-show="$v.info.first_name.$error">
        <ValidationMessage v-if="!$v.info.first_name.required">Please enter your first name.</ValidationMessage>
        <ValidationMessage v-if="!$v.info.first_name.alpha">Your first name must be letters.</ValidationMessage>
      </div>

      <InputField
        v-model.trim="info.last_name"
        :valid="!$v.info.last_name.$invalid"
        :error="$v.info.last_name.$error"
        placeholder="Bloggs"
        name="last_name"
        @blur="$v.info.last_name.$touch()"
      >
        <label for="last_name">Last Name</label>
      </InputField>
      <div v-show="$v.info.last_name.$error">
        <ValidationMessage v-if="!$v.info.last_name.required">Please enter your last name.</ValidationMessage>
        <ValidationMessage v-if="!$v.info.last_name.alpha">Your last name must be letters.</ValidationMessage>
      </div>

      <InputField
        v-model.trim="info.email"
        :valid="!$v.info.email.$invalid"
        :error="$v.info.email.$error"
        placeholder="joebloggs@example.com"
        name="email"
        @blur="$v.info.email.$touch()"
      >
        <label for="email">Email Address</label>
      </InputField>
      <div v-show="$v.info.email.$error">
        <ValidationMessage v-if="!$v.info.email.required">Please enter your email.</ValidationMessage>
        <ValidationMessage v-if="!$v.info.email.email">Please enter a valid email.</ValidationMessage>
      </div>

      <InputField
        v-model.trim="info.username"
        :valid="!$v.info.username.$invalid"
        :error="$v.info.username.$error"
        placeholder="joe_bloggs"
        name="username"
        @blur="$v.info.username.$touch()"
      >
        <label for="username">Username</label>
      </InputField>
      <ValidationMessage v-show="$v.info.username.$error">Please enter a username.</ValidationMessage>

      <InputField
        v-model="info.password"
        :valid="!$v.info.password.$invalid"
        :error="$v.info.password.$error"
        type="password"
        placeholder="Must have at least 5 characters."
        name="password"
        @blur="$v.info.password.$touch()"
      >
        <label for="password">Password</label>
      </InputField>
      <div v-show="$v.info.password.$error">
        <ValidationMessage v-if="!$v.info.password.required">Please enter a password.</ValidationMessage>
        <ValidationMessage v-if="!$v.info.password.min">Your password must be at least 5 characters long.</ValidationMessage>
      </div>

      <PrimaryButton type="success">Sign Up</PrimaryButton>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import isEmpty from 'lodash/isEmpty'
import { required, alpha, email, minLength } from 'vuelidate/lib/validators'
import { REGISTER_USER_ACTION } from '@/store/modules/user/types'
import ValidationMessage from '@/components/ValidationMessage'

export default {
  name: 'SignUp',

  components: {
    ValidationMessage,
  },

  data: () => ({
    info: {
      first_name: null,
      last_name: null,
      email: null,
      username: null,
      password: null,
    },
    submitting: false,
  }),

  validations: {
    info: {
      first_name: { required, alpha },
      last_name: { required, alpha },
      email: { required, email },
      username: { required },
      password: { required, min: minLength(5) },
    },
  },

  computed: mapState({
    user: state => state.user.user,
  }),

  methods: {
    ...mapActions({
      register: REGISTER_USER_ACTION,
    }),

    async handleSubmit() {
      this.$v.info.$touch()
      if (this.$v.info.$error) return

      this.submitting = true
      await this.register(this.info)
      this.submitting = false

      if (!isEmpty(this.user)) this.$router.push({ name: 'home' })
    },
  },
}
</script>
