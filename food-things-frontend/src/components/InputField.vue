<template>
  <div :class="{'inline-block': display }" class="form-field">
    <label v-if="label" :for="attributes.name">{{ label }}</label>
    <div v-if="icon" class="input-wrapper">
      <img :src="require(`../assets/icons/icon-${icon}.svg`)" class="icon">
      <input
        :value="value"
        :style="`width: ${inputWidth};`"
        v-bind="attributes"
        class="offset"
        @input="input"
        v-on="listeners"
      >
    </div>
    <div v-else class="input-wrapper">
      <input
        :value="value"
        :style="`width: ${inputWidth};`"
        v-bind="attributes"
        @input="input"
        v-on="listeners"
      >
    </div>
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
    label: {
      type: String,
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
    icon: {
      type: String,
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

.form-field {
  margin: 1em 0;
}

input {
  background: $grey-light;
  border: 0;
  box-shadow: 0px 1px 2px $shadow-lighter;
  color: $grey-darkest;
  display: block;
  font-family: $font-body;
  font-size: 15px;
  padding: 0.3em 0.7em;

  &.offset {
    padding-left: 2em;
  }

  &[type='checkbox'] {
    background: $grey-light;
  }
}

.input-wrapper {
  position: relative;
}

.inline-block {
  display: inline-block;
  margin-right: 1em;
}

.icon {
  height: 20px;
  position: absolute;
  top: 5px;
  left: 5px;
  width: 20px;
}
</style>
