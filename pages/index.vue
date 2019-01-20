<template>
  <div class="container">
    <nav-bar/>
    <weather-list/>
  </div>
</template>

<script>
import NavBar from '../components/nav-bar/nav-bar.vue';
import WeatherList from '../components/weather-list/weather-list.vue';

export default {
  components: {WeatherList, NavBar},
}
</script>

<style>
  .container {
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
