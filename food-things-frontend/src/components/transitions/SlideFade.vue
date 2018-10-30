<template>
  <transition :mode="mode" name="slide-fade">
    <slot />
  </transition>
</template>

<script>
export default {
  name: 'SlideFade',
  props: {
    mode: {
      type: String,
      required: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
</style>
