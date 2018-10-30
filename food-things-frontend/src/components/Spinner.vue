<template>
  <div v-if="fullScreen" class="wrapper">
    <transition name="fade">
      <div class="spinner"/>
    </transition>
  </div>
  <transition v-else name="fade">
    <div class="spinner"/>
  </transition>
</template>

<script>
export default {
  name: 'Spinner',
  props: {
    fullScreen: {
      type: Boolean,
      required: false,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../style/variables';

.wrapper {
  align-items: center;
  display: flex;
  height: 80vh;
  justify-content: center;
  width: 100%;
}

.spinner {
  animation: spin 1s linear infinite;
  border: 4px solid transparent;
  border-bottom-color: $primary;
  border-top-color: $primary;
  border-radius: 50%;
  height: 5em;
  width: 5em;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
