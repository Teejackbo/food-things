<template>
  <button v-bind="attributes" :class="type" v-on="listeners"><slot /></button>
</template>

<script>
export default {
  name: 'SecondaryButton',

  props: {
    type: {
      type: String,
      required: false,
    },
  },

  computed: {
    listeners() {
      // eslint-disable-next-line
      return this.$listeners
    },

    attributes() {
      return this.$attrs
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../style/variables';

button {
  background: $grey-lightest;
  border: 0;
  border-radius: 7px;
  color: $grey-darker;
  display: block;
  font-family: $font-heading;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 1em;
  padding: 0.4em 1em;
  text-transform: uppercase;
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: darken($grey-lightest, 0.5%);
    transform: translateY(-1px);
  }
}

.error {
  background: $red-lighter;
  color: $red-darkest;

  &:hover {
    background: darken($red-lighter, 0.5%);
  }
}

.success {
  background: $primary-lighter;
  color: $primary-darkest;

  &:hover {
    background: darken($primary-lighter, 3%);
  }
}

.warning {
  background: $yellow-lighter;
  color: $yellow-darkest;

  &:hover {
    background: darken($yellow-lighter, 2%);
  }
}
</style>
