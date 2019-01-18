import axios from 'axios';
import {stub} from 'sinon';
import WeatherAPI from '../../../api/WeatherAPI'
import fixtures from '../../fixtures/api/weather-api-fixtures';

describe('Unit tests for Weather Now API', () => {
  it('Test if function getWeatherAPIKey return expected value', () => {
    expect(WeatherAPI.getWeatherAPIKey()).to.equal(fixtures.apiKey);
  });
  it('Test if function getWeatherServerHost return expected value', () => {
    expect(WeatherAPI.getWeatherServerHost()).to.equal(fixtures.serverHost);
  });
  it('Test if function getWeatherInfo calls axios with correct parameter', () => {
    const stubAxiosGet = stub(axios, 'get').resolves({data: {}});
    const cityId = fixtures.cityId;
    const expectedArg = fixtures.getWeatherByCityId.finalEndPoint;
    WeatherAPI.getWeatherInfoByCityId(cityId);
    expect(stubAxiosGet.calledOnce).to.equal(true);
    expect(stubAxiosGet.getCall(0).args[0]).to.equal(expectedArg);
    axios.get.restore();
  });
});
