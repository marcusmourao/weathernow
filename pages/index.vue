<template>
  <div class="container">
    <nav-bar/>
    <weather-list/>
  </div>
</template>

<script>
import VMWeather from '../view-models/vm-city';
import supportedCities from '../config/supported-cities';
import NavBar from '../components/nav-bar/nav-bar';
import WeatherList from '../components/weather-list/weather-list.vue';

export default {
  components: {WeatherList, NavBar},
  async mounted() {
    const info =  await  VMWeather.getCityWithWeatherInformation(supportedCities[0]);
    const info2 = await  VMWeather.getCityWithWeatherInformation(supportedCities[1]);
    const info3 = await  VMWeather.getCityWithWeatherInformation(supportedCities[2]);
    console.log(info, info2, info3);
  },
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
