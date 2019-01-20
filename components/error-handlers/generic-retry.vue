<template>
  <div class="error__container">
    <span>{{ errorMessage }}</span>
    <button @click="retry()">{{ buttonLabel }}</button>
  </div>
</template>

<script>
export default {
  name: 'generic-retry',
  props: {
    errorMessage: {
      type: String,
      default: 'Something went wrong'
    },
    buttonLabel: {
      type: String,
      default: 'Try Again',
    }
  },
  methods: {
    retry() {
      this.$emit('retry');
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";

  .error__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    span {
      display: inline-block;
      width: 100%;
      text-align: center;
      margin: 15px 0;
      color: $tertiary-color;
    }
    button {
      border: 2px solid $helper-color-dark;
      background-color: transparent;
      padding: 10px 18px;
      border-radius: 30px;
      font-family: $standard-font;
      font-size: 1rem;
      color: $helper-color-dark;
      cursor: pointer;
      transition: all 250ms ease-in-out;
    }
    button:hover {
      background-color: transparentize($helper-color-dark, 0.2);
      color: $elementary-color-light;
    }
    button:focus {
      outline: none;
    }
  }
</style>
