<template>
  <nav>
    <section class="nav-left">
      <router-link :to="{ name: 'home' }">Feed</router-link>
    </section>
    <section class="nav-right">
      <router-link :to="{ name: 'create-food' }">Create Food</router-link>
      <router-link v-if="user.id" :to="{ name: 'logout' }">Logout</router-link>
      <router-link v-else :to="{ name: 'login' }">Login</router-link>
      <router-link v-if="!user.id" :to="{ name: 'sign-up' }">Sign Up</router-link>
    </section>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Navigation',
  computed: mapState({
    user: state => state.user.user,
  }),
}
</script>

<style lang="scss" scoped>
@import '../style/variables';

nav {
  align-items: center;
  background: linear-gradient(to bottom, $primary, lighten($primary, 4%));
  box-shadow: 0px 3px 8px $shadow;
  display: flex;
  font-family: $font-body;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 1.5em 2em;
}

a {
  color: $white;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.6px;
  margin: 0 1em;
  text-decoration: none;
  text-shadow: 0 2px 5px $shadow;
  text-transform: uppercase;
  transition: color 0.3s, text-shadow 0.3s;

  &:hover {
    color: $white-lightest;
    text-shadow: 0 3px 8px $shadow;
  }
}
</style>
