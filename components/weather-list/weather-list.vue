<template>
  <section class="weather-list__container">
    <weather-card
      v-for="city in cities"
      :key="city.cityId"
      :city-constraints="city"
    />
  </section>
</template>

<script>
import supportedCities from '../../config/supported-cities';
import WeatherCard from './weather-card.vue';

export default {
  name: 'weather-list',
  components: {WeatherCard},
  data() {
    return {
      cities: supportedCities,
    };
  },
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";
  .weather-list__container {
    background-color: $app-background-color;
    display: flex;
    flex-wrap: wrap;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
</style>
