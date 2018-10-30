<template>
  <transition-group name="slide-fade" tag="section">
    <Alert
      v-for="(alert, index) in alerts"
      :key="index"
      :alert="alert" />
  </transition-group>
</template>

<script>
import { mapState } from 'vuex'
import Alert from './Alert.vue'

export default {
  name: 'AlertList',

  components: {
    Alert,
  },

  computed: mapState({
    alerts: state => state.alerts.alerts,
  }),
}
</script>

<style lang="scss" scoped>
@import '../style/variables';

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}

.slide-fade-leave-active {
  position: absolute;
  bottom: 0;
  right: 0;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}

section {
  @media (max-width: 767px) {
    bottom: 1em;
    right: 3em;
    width: 50%;
  }
  bottom: 3em;
  position: fixed;
  right: 4em;
  z-index: 100;
  width: 12%;
}
</style>
