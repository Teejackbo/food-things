<template>
  <Login />
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Login from '@/components/Login.vue'
import { ADD_ALERT_ACTION } from '@/store/modules/alerts/types'

export default {
  name: 'LoginView',

  components: {
    Login,
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
    }),
  },
}
</script>
