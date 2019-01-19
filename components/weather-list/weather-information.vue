<template>
  <div class="information__container">
    <div class="temperature__container">
      <span
        :class="temperatureStyle"
        class="weather__temperature">
        {{ Math.floor(city.temperature) }}
      </span>
    </div>
    <div class="weather-information__footer">
      <div
        v-show="isActive"
        class="weather-information__extra-info">
        <div class="information__detail">
          <h6>HUMIDITY</h6>
          <span class="humidity"> {{ city.humidity }} </span>
        </div>
        <div class="information__detail">
          <h6>PRESSURE</h6>
          <span class="pressure"> {{ city.pressure }} </span>
        </div>
      </div>
      <span class="weather-information__updated-at">
        Updated at {{ city.updatedAtToString }}
      </span>
    </div>
  </div>
</template>

<script>
import City from '../../models/City';

export default {
  name: 'weather-information',
  props: {
    city: {
      type: City,
      required: true,
    }
  },
  computed: {
    temperatureStyle() {
      if (this.city.temperature <= 5) {
        return 'cold';
      } else if (this.city.temperature > 5 && this.city.temperature <= 25) {
        return 'mild';
      } else {
        return 'hot';
      }
    },
    isActive() {
      return this.$store.state.weather.activeCityId === this.city.id;
    },
  },
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/variables";

  .information__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    flex-grow: 1;
    .cold {
      color: $primary-color;
    }
    .mild {
      color: $secondary-color;
    }
    .hot {
      color: $tertiary-color;
    }
  }
  .weather__temperature {
    display: flex;
    justify-content: center;
    font-size: 5rem;
    font-weight: 400;
    width: 100%;
    text-align: center;
  }
  .weather__temperature:after {
    font-size: 3rem;
    content: "\00b0";
    margin-top: 10px;
  }
  .weather-information__footer {
    padding: 10px;
    width: 100%;
    background-color: $card-footer-background;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .weather-information__updated-at {
    text-align: center;
    font-weight: 300;
    color: $helper-color-light;
    font-size: 0.75rem;
    width: 100%;
  }
  .weather-information__extra-info {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    margin: 10px 0;
  }
  .information__detail {
    width: 50%;
    text-align: center;
    h6 {
      font-size: 0.8rem;
      color: $helper-color-light;
      font-weight: 300;
      margin-bottom: 5px;
    }
    span {
      color: $helper-color-dark;
      font-size: 1.1rem;
    }
    span:after {
      font-size: 0.8rem;
      margin-left: -3px;
    }
  }
  .humidity:after {
    content: '%';
  }
  .pressure:after {
    content: 'hPA';
  }
  .temperature__container {
    padding: 30px;
  }
</style>
