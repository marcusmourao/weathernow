<template>
  <div/>
</template>

<script>
import VMWeather from '../view-models/vm-city';
import supportedCities from '../config/supported-cities';

export default {
  async mounted() {
    const info =  await  VMWeather.getCityWithWeatherInformation(supportedCities[0]);
    const info2 = await  VMWeather.getCityWithWeatherInformation(supportedCities[1]);
    const info3 = await  VMWeather.getCityWithWeatherInformation(supportedCities[2]);
    console.log(info, info2, info3);
  },
}
</script>

<style>

</style>
