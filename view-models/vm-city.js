import WeatherAPI from "../api/WeatherAPI";

function validateCityInformation(cityConstraints, cityInformation) {
  if (cityConstraints.cityId === cityInformation.id && cityConstraints.cityName === cityInformation.name) {
    return true;
  }
  throw Error('Mismatch Information');
}

async function getCityWeatherInformation(cityConstraints) {
  try {
    const cityInformation = await WeatherAPI.getWeatherInfoByCityId(cityConstraints.cityId);
    if (validateCityInformation(cityConstraints, cityInformation)) {
      return cityInformation;
    }
  } catch (e) {
    throw e;
  }
}

const vmCity = {
  getCityWeatherInformation,
  validateCityInformation,
};

export default vmCity;
