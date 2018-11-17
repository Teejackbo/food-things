<template>
  <div :class="{'inline-block': display }" class="form-field">
    <slot />
    <input
      :value="value"
      :style="`width: ${inputWidth};`"
      v-bind="attributes"
      :class="{ error, valid }"
      @input="input"
      v-on="listeners"
    >
  </div>
</template>

<script>
export default {
  name: 'InputField',

  inheritAttrs: false,

  props: {
    value: {
      type: [String, Boolean, Number],
      required: false,
    },
    inputWidth: {
      type: String,
      required: false,
    },
    display: {
      type: String,
      required: false,
    },
    error: {
      type: Boolean,
      required: false,
    },
    valid: {
      type: Boolean,
      required: false,
    },
  },

  methods: {
    input(event) {
      this.$emit('input', event.target.value)
    },
  },

  computed: {
    listeners() {
      // eslint-disable-next-line
      const { input, ...listeners } = this.$listeners
      return listeners
    },

    attributes() {
      return this.$attrs
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../style/variables';

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.form-field {
  margin: 0.5em 0;
}

input {
  background: $grey-light;
  border: 1px solid $grey;
  border-radius: 5px;
  box-shadow: 0px 1px 2px $shadow-lighter;
  color: $grey-darkest;
  display: block;
  font-family: $font-body;
  font-size: 15px;
  padding: 0.3em 0.7em;

  &.offset {
    padding-left: 2em;
  }

  &.valid {
    border: 1px solid $primary;
  }

  &.error {
    animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    border: 1px solid $red;
  }
}

.inline-block {
  display: inline-block;
  margin-right: 1em;
}
</style>
