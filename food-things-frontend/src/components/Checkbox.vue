<template>
  <div
    :class="{ checked }"
    class="checkbox"
    tabindex="0"
    @click="toggle"
    @keyup.space="toggle"
  >
    {{ checked ? '✓' : '' }}
  </div>
</template>

<script>
export default {
  name: 'Checkbox',

  data() {
    return {
      checked: this.value || false,
    }
  },

  props: {
    value: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  methods: {
    toggle() {
      this.checked = !this.checked
      this.$emit('input', this.checked)
    },
  },
}
</script>

<style lang="scss">
@import '../style/variables';

.checkbox {
  align-items: center;
  background: $grey;
  border-radius: 5px;
  box-shadow: 0px 2px 2px $shadow;
  color: $grey-light;
  display: flex;
  font-size: 21px;
  height: 28px;
  justify-content: center;
  margin: 0.6em 0;
  padding: 0.05em;
  transition: background 0.15s;
  user-select: none;
  width: 28px;

  &.checked {
    background: $primary;
  }
}
</style>
