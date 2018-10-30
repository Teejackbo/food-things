<template>
  <div :class="alert.type" class="alert">
    {{ alert.message }}
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { REMOVE_ALERT_ACTION } from '@/store/modules/alerts/types'

export default {
  name: 'Alert',

  props: {
    alert: {
      value: Object,
      required: true,
    },
  },

  methods: {
    ...mapActions({
      removeAlert: REMOVE_ALERT_ACTION,
    }),
  },

  mounted() {
    setTimeout(() => {
      this.removeAlert(this.alert)
    }, this.alert.timeout || 3000)
  },
}
</script>

<style lang="scss" scoped>
@import '../style/variables';

.alert {
  background: $grey-lightest;
  border-left: 5px solid $grey-darkest;
  box-shadow: 0 2px 10px $shadow-lighter;
  margin: 1.5em 0;
  padding: 1em;
  position: relative;
  text-align: center;
  transition: all 0.5s;
  width: 100%;

  &::before {
    align-items: center;
    background: $grey-darkest;
    border-radius: 50%;
    color: $white;
    content: '?';
    display: flex;
    font-weight: 600;
    height: 20px;
    justify-content: center;
    left: -12px;
    position: absolute;
    top: -10px;
    width: 20px;
  }
}

.error {
  border-left: 5px solid $red;

  &::before {
    background: $red;
    content: '!';
  }
}

.warning {
  border-left: 5px solid $yellow;

  &::before {
    background: $yellow;
    content: '!';
  }
}

.success {
  border-left: 5px solid $primary;

  &::before {
    background: $primary;
    content: '✓';
  }
}
</style>
