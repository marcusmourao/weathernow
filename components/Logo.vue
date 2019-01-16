<template>
  <p>Hello World</p>
</template>

<script>
  export default {
    data() {
      return {
        state: 'state full',
      };
    },
    mounted() {
      console.log('hello');
    }
  }
</script>

<style scoped lang="scss">
  p {
    color: #000;
  }
</style>
