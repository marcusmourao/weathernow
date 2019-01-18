import WeatherAPI from '../api/WeatherAPI';
import City from '../models/City';


function validateCityInformation(cityConstraints, cityInformation) {
  if (cityConstraints.cityId === cityInformation.id && cityConstraints.cityName === cityInformation.name) {
    return true;
  }
  throw Error('Mismatch Information');
}

function formatInformation(cityInformation) {
  return {
    id: cityInformation.id,
    name: cityInformation.name,
    country: cityInformation.sys.country,
    temperature: cityInformation.main.temp,
    humidity: cityInformation.main.humidity,
    pressure: cityInformation.main.pressure,
  }
}

function buildCityModel(cityInformation) {
  return new City(cityInformation)
}

async function getCityWithWeatherInformation(cityConstraints) {
  try {
    const cityInformation = await WeatherAPI.getWeatherInfoByCityId(cityConstraints.cityId);
    if (validateCityInformation(cityConstraints, cityInformation)) {
      const formattedInformation = formatInformation(cityInformation);
      return buildCityModel(formattedInformation);
    }
  } catch (e) {
    throw e;
  }
}

const vmCity = {
  getCityWithWeatherInformation,
  validateCityInformation,
  formatInformation,
  buildCityModel,
};

export default vmCity;
