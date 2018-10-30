<template>
  <div id="app">
    <Navigation />
    <div class="container">
      <transition
        name="fade-height"
        mode="out-in"
        @beforeLeave="beforeLeave"
        @enter="enter"
        @afterEnter="afterEnter"
      >
        <router-view />
      </transition>
    </div>
    <AlertList />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Navigation from '@/components/Navigation.vue'
import AlertList from '@/components/AlertList.vue'
import { FETCH_FROM_STORAGE_ACTION } from '@/store/modules/user/types'

export default {
  name: 'App',

  components: {
    Navigation,
    AlertList,
  },

  created() {
    this.fetchUser()
  },

  data: () => ({
    prevHeight: 0,
  }),

  methods: {
    ...mapActions({
      fetchUser: FETCH_FROM_STORAGE_ACTION,
    }),

    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height
    },

    enter(element) {
      const { height } = getComputedStyle(element)

      element.style.height = this.prevHeight

      setTimeout(() => {
        element.style.height = height
      })
    },

    afterEnter(element) {
      element.style.height = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  margin: auto;
  width: 80%;
}

.fade-height-enter-active,
.fade-height-leave-active {
  transition-duration: 0.2s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}

.fade-height-enter,
.fade-height-leave-active {
  opacity: 0;
}
</style>
