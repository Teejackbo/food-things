<template>
  <span><slot /></span>
</template>

<script>
export default {
  name: 'ValidationMessage',
}
</script>

<style lang="scss" scoped>
@import '../style/variables';
span {
  color: $red;
  display: block;
  font-family: $font-heading;
  font-size: 15px;
  margin-bottom: 0.5em;
}
</style>
