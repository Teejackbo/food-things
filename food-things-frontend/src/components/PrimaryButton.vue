<template>
  <button v-bind="attributes" :class="type" v-on="listeners"><slot /></button>
</template>

<script>
export default {
  name: 'PrimaryButton',

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
  background: $grey-darkest;
  border: 0;
  border-radius: 7px;
  box-shadow: 0 1px 8px $shadow;
  color: $grey;
  font-family: $font-heading;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 1em;
  padding: 0.4em 1em;
  text-shadow: 0 1px 3px $shadow;
  text-transform: uppercase;
  transition: background 0.3s, transform 0.3s, box-shadow 0.3s, text-shadow 0.3s;

  &:hover {
    background: lighten($grey-darkest, 5%);
    box-shadow: 0 4px 12px $shadow-lighter;
    text-shadow: 0 2px 5px $shadow;
    transform: translateY(-2px);
  }
}

.error {
  background: $red-darker;

  &:hover {
    background: lighten($red-darker, 3%);
  }
}

.success {
  background: $primary-darker;

  &:hover {
    background: lighten($primary-darker, 4%);
  }
}

.warning {
  background: $yellow-darker;
  color: $grey-darkest;

  &:hover {
    background: lighten($yellow-darker, 6%);
  }
}
</style>
