import axios from 'axios';
import {stub} from 'sinon';
import WeatherAPI from '../../../api/weathernow'

describe('Unit tests for Weather Now API', () => {
  it('Test if function getWeatherAPIKey return expected value', () => {
    expect(WeatherAPI.getWeatherAPIKey()).to.equal('c0cef6453abf7c54165726c03fe60665');
  });
  it('Test if function getWeatherServerHost return expected value', () => {
    expect(WeatherAPI.getWeatherServerHost()).to.equal('https://api.openweathermap.org/data/2.5/weather');
  });
  it('Test if function getWeatherInfo calls axios with correct parameter', () => {
    const stubAxiosGet = stub(axios, 'get');
    const cityId = 123;
    const expectedArg = 'https://api.openweathermap.org/data/2.5/weather?id=123&appid=c0cef6453abf7c54165726c03fe60665';
    WeatherAPI.getWeatherInfoByCityId(cityId);
    expect(stubAxiosGet.calledOnce).to.equal(true);
    expect(stubAxiosGet.getCall(0).args[0]).to.equal(expectedArg)

  });
});
