import {stub} from 'sinon';
import WeatherAPI from '../../../api/WeatherAPI';
import VMCity from '../../../view-models/vm-city';

const fixtures = {
  cityConstraints: {
    cityId: 3421319,
    cityName: 'Nuuk',
    cityCountry: 'GL',
  },
  correctCityInformationResponse:  {
    "main":{
      "temp":290.886,
      "pressure":888.92,
      "humidity":98,
      "temp_min":290.886,
      "temp_max":290.886,
      "sea_level":1027.68,
      "grnd_level":888.92
    },
    "sys":{
      "message":0.0024,
      "country":"GL",
      "sunrise":1547714274,
      "sunset":1547763531
    },
    id: 3421319,
    name: 'Nuuk',
  },
  mismatchCityId: {
    id: 123,
  },
  mismatchCityName: {
    name: 'Wrong name'
  },
  mismatchCityInformationResponse: {
    "main":{
      "temp":290.886,
      "pressure":888.92,
      "humidity":98,
      "temp_min":290.886,
      "temp_max":290.886,
      "sea_level":1027.68,
      "grnd_level":888.92
    },
    "sys":{
      "message":0.0024,
      "country":"BR",
      "sunrise":1547714274,
      "sunset":1547763531
    },
    "id":3445709,
    "name":"Urubici",
  },
  mismatchErrorMessage: 'Mismatch Information',
};

describe('Unit tests for View Model City', () => {
  it('Test if method getCityWeatherInformation calls WeatherAPI correct', async () => {
    const stubWeatherAPI = stub(WeatherAPI, 'getWeatherInfoByCityId').resolves(true);
    try {
      await VMCity.getCityWeatherInformation(fixtures.cityConstraints);
    } catch (e) {
      // nothing to do in this case
    } finally {
      expect(stubWeatherAPI.calledOnce).to.equal(true);
      expect(stubWeatherAPI.getCall(0).args[0]).to.equal(fixtures.cityConstraints.cityId);
      WeatherAPI.getWeatherInfoByCityId.restore();
    }
  });
  it('Test if method validateCityInformation is returning true when data is equal', () => {
    expect(VMCity.validateCityInformation(
      fixtures.cityConstraints,
      fixtures.correctCityInformationResponse,
    )).to.equal(true);
  });
  it('Test if method validateCityInformation is throwing when cityId is different', () => {
    try {
      VMCity.validateCityInformation(fixtures.cityConstraints, fixtures.mismatchCityId);
    } catch (e) {
      expect(e).to.be.an.instanceOf(Error);
      expect(e.message).to.equal(fixtures.mismatchErrorMessage)
    }
  });
  it('Test if method validateCityInformation is throwing when cityName is different', () => {
    try {
      VMCity.validateCityInformation(fixtures.cityConstraints, fixtures.mismatchCityName);
    } catch (e) {
      expect(e).to.be.an.instanceOf(Error);
      expect(e.message).to.equal(fixtures.mismatchErrorMessage)
    }
  });
  it('Test if method getCityWeatherInformation throw an error when API return mismatch city information', () => {
    stub(WeatherAPI, 'getWeatherInfoByCityId').resolves(fixtures.mismatchCityInformationResponse);
    expect(VMCity.getCityWeatherInformation(fixtures.cityConstraints)).to.be.rejectedWith(fixtures.mismatchErrorMessage);
    WeatherAPI.getWeatherInfoByCityId.restore();
  });
});
