<template>
  <div
    :class="{'main__city': isMainCity}"
    class="weather__card"
    @click="activeCity()"
  >
    <h4 class="card__title">
      {{ cityConstraints.cityName }}, {{ cityConstraints.cityCountry }}
    </h4>
    <hr class="divider">
    <div class="card__data">
      <loader v-if="loading"/>
      <weather-information
        v-else-if="isDataAvailable"
        :city="cityInformation"
      />
      <generic-retry
        v-else-if="error"
        @retry="getWeatherInformation()"
      />
    </div>
  </div>
</template>

<script>
import config from '../../config/application';
import WeatherInformation from './weather-information.vue';
import GenericRetry from '../error-handlers/generic-retry.vue';
import Loader from '../loader/loader.vue';
import VMWeatherInformation from '../../view-models/vm-city';
import City from '../../models/City';

export default {
  name: 'weather-card',
  components: {Loader, GenericRetry, WeatherInformation},
  props: {
    cityConstraints: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      error: false,
      active: false,
      loading: true,
      cityInformation: null,
      intervalId: null,
    }
  },
  computed: {
    isDataAvailable() {
      return !this.error && !this.loading && (this.cityInformation instanceof City);
    },
    isMainCity() {
      return !!this.cityConstraints.mainCity;
    },
  },
  mounted() {
    this.getWeatherInformation();
    if (this.isMainCity) this.activeCity();
  },
  beforeDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
  methods: {
    async getWeatherInformation() {
      this.loading = true;
      try {
        this.cityInformation = await VMWeatherInformation.getCityWithWeatherInformation(this.cityConstraints);
        this.error = false;
        this.tryStartAutomaticUpdate();
      } catch (e) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
    activeCity() {
      this.$store.commit('weather/setActiveCityId', (this.cityConstraints.cityId));
    },
    tryStartAutomaticUpdate() {
      if (!this.intervalId) {
        this.enableAutomaticUpdate(config.intervalForWeatherUpdate);
      }
    },
    enableAutomaticUpdate(intervalTime) {
      this.intervalId = setInterval(this.getWeatherInformation, intervalTime);
    }
  },
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/variables';
  .weather__card {
    background-color: $elementary-color-light;
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    margin: 40px;
    width: 260px;
    min-height: 220px;
    -webkit-box-shadow: 2px 2px 10px $box-shadow-color;
    -moz-box-shadow: 2px 2px 10px $box-shadow-color;
    box-shadow: 2px 2px 10px $box-shadow-color;
    order: 2;
    cursor: pointer;
    transition: all 250ms ease-in;
    .card__title {
      font-family: $standard-font;
      font-size: 1.2rem;
      font-weight: 400;
      text-align: center;
      color: $helper-color-dark;
      margin: 8px;
    }
    .card__data {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      flex-grow: 1;
    }
  }
  .weather__card:hover {
    -webkit-box-shadow: 3px 3px 10px $box-shadow-color;
    -moz-box-shadow: 3px 3px 10px $box-shadow-color;
    box-shadow: 3px 3px 10px $box-shadow-color;
  }
  .divider {
    border-top: 1px solid $divider-color;
  }
  @media only screen and (max-width: 600px) {
    .main__city {
      order: 1;
    }
    .weather__card {
      margin: 10px;
    }
  }
</style>
