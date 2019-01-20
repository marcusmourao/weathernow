import axios from 'axios';
import LocalStorage from '../helpers/storage';
import config from '../config/application';
import DateHelper from '../helpers/date';

const {weatherAPIKey, weatherServerHost} = config;

class WeatherAPI {
  static getWeatherAPIKey() {
    return weatherAPIKey;
  }
  static getWeatherServerHost() {
    return weatherServerHost;
  }

  static calculateCacheExpirationDate() {
    const currentDate = DateHelper.getDateNow();
    return new Date(currentDate + (config.cacheTTL)).toISOString();
  }

  static saveDataInLocalStorage(cityId, data) {
    const cacheExpirationDate = this.calculateCacheExpirationDate();
    const cachedInformation = {
      expirationDate: cacheExpirationDate,
      data,
    };
    LocalStorage.saveItemInLocalStorage(cityId, cachedInformation);
  }

  static handleGetWeatherInfoSuccess(cityId, response) {
    this.saveDataInLocalStorage(cityId, response.data);
    return response.data;
  }

  static isCacheValid(cityId) {
    const weatherInfo = LocalStorage.getItemFromLocalStorage(cityId);
    if (weatherInfo) {
      const currentDate = DateHelper.getCurrentISODateString();
      return weatherInfo.expirationDate >= currentDate;
    }
    return false;
  }

  static async getWeatherInfoFromCache(cityId) {
    return LocalStorage.getItemFromLocalStorage(cityId).data;
  }

  static getWeatherInfoByCityId(cityId) {
    if (this.isCacheValid(cityId)) {
      return this.getWeatherInfoFromCache(cityId);
    }
    const endpoint = `${weatherServerHost}?id=${cityId}&units=metric&appid=${weatherAPIKey}`;
    return axios.get(endpoint).then((response) => {
      return this.handleGetWeatherInfoSuccess(cityId, response)
    });
  }

}

export default WeatherAPI;
