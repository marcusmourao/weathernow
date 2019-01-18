<template>
  <nav>
    <a href="/">
      <img
        src="/logo.svg"
        alt="Weather Now Logo"
      >
    </a>
  </nav>
</template>

<script>
export default {
  name: 'nav-bar'
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";
  nav {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 50px;
    align-items: center;
    -webkit-box-shadow: 0 1px 10px $box-shadow-color;
    -moz-box-shadow: 0 1px 10px $box-shadow-color;
    box-shadow: 0 1px 10px $box-shadow-color;
    width: 100%;
    position: fixed;
    background-color: $elementary-color-light;
  }

  img {
    height: 30px;
    width: auto;
    object-fit: contain;
  }

</style>
