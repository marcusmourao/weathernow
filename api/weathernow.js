import axios from 'axios';

const weatherAPIKey = 'c0cef6453abf7c54165726c03fe60665';
const weatherServerHost = 'https://api.openweathermap.org/data/2.5/weather';

export function getWeatherInfoByCityId(cityId) {
  const endpoint = `${weatherServerHost}?id=${cityId}&appid=${weatherAPIKey}`;
  return axios.get(endpoint);
}

const WeatherAPI = {
  getWeatherInfoByCityId,
  getWeatherAPIKey: () => weatherAPIKey,
  getWeatherServerHost: () => weatherServerHost,
};

export default WeatherAPI;
