<template>
  <Spinner :fullScreen="true" />
</template>


<script>
import { mapState, mapActions } from 'vuex'
import { ADD_ALERT_ACTION } from '@/store/modules/alerts/types'
import { LOGOUT_ACTION } from '@/store/modules/user/types'

export default {
  name: 'LogoutView',

  computed: mapState({
    id: state => state.user.user.id,
  }),

  methods: {
    ...mapActions({
      alert: ADD_ALERT_ACTION,
      logout: LOGOUT_ACTION,
    }),
  },

  async mounted() {
    if (!this.id) {
      this.alert({
        type: 'error',
        message: 'You are not logged in.',
        timeout: 3000,
      })
      this.$router.replace({ name: 'login' })
      return
    }

    await this.logout()
    if (!this.id) {
      this.$router.replace({ name: 'home' })
    }
  },
}
</script>
