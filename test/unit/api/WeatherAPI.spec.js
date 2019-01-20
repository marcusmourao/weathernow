import axios from 'axios';
import {stub} from 'sinon';
import WeatherAPI from '../../../api/WeatherAPI'
import fixtures from '../../fixtures/api/weather-api-fixtures';
import config from '../../../config/application';
import DateHelper from '../../../helpers/date';
import LocalStorage from '../../../helpers/storage';

describe('Unit tests for Weather Now API', () => {
  const localFixtures = {
    cityId: 123345,
    response: {
      data: {},
    },
  };
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
  it('Test if function calculateCacheExpirationDate is returning expected value', () => {
    const dateNow = DateHelper.getDateNow();
    const expectedValue = new Date(dateNow + config.cacheTTL).toISOString();
    expect(WeatherAPI.calculateCacheExpirationDate()).to.equal(expectedValue);
  });
  it('Test if function saveDataIndataLocalStorage is calling LocalStorage helper as expected', () => {
    localFixtures.finalParameters = {
      expirationDate: WeatherAPI.calculateCacheExpirationDate(),
      data: localFixtures.response
    };
    const stubLocalStorage = stub(LocalStorage, 'saveItemInLocalStorage');
    WeatherAPI.saveDataInLocalStorage(localFixtures.cityId, localFixtures.response);
    expect(stubLocalStorage.calledOnce).to.equal(true);
    expect(stubLocalStorage.getCall(0).args[0]).to.equal(localFixtures.cityId);
    expect(stubLocalStorage.getCall(0).args[1]).to.eql(localFixtures.finalParameters);
    LocalStorage.saveItemInLocalStorage.restore();
  });
  it('Test if function handleGetWeatherInfoSuccess is working as expected', () => {
    const stubSaveData = stub(WeatherAPI, 'saveDataInLocalStorage');
    const data = WeatherAPI.handleGetWeatherInfoSuccess(localFixtures.cityId, localFixtures.response);
    expect(stubSaveData.called).to.equal(true);
    expect(stubSaveData.getCall(0).args[0]).to.equal(localFixtures.cityId);
    expect(stubSaveData.getCall(0).args[1]).to.equal(localFixtures.response.data);
    expect(data).to.eql(localFixtures.response.data);
    WeatherAPI.saveDataInLocalStorage.restore();
  });
  it('Test if isCacheValid returns false when cache is empty', () => {
    stub(LocalStorage, 'getItemFromLocalStorage').returns(null);
    expect(WeatherAPI.isCacheValid(localFixtures.cityId)).to.equal(false);
    LocalStorage.getItemFromLocalStorage.restore();
  });
  it('Test if isCacheValid returns false when cache has expired', () => {
    const expirationDate = new Date(DateHelper.getDateNow() - config.cacheTTL * 2).toISOString();
    stub(LocalStorage, 'getItemFromLocalStorage').returns({expirationDate});
    expect(WeatherAPI.isCacheValid(localFixtures.cityId)).to.equal(false);
    LocalStorage.getItemFromLocalStorage.restore();
  });
  it('Test if isCacheValid returns true when cache is valid', () => {
    const expirationDate = new Date(DateHelper.getDateNow() + config.cacheTTL).toISOString();
    stub(LocalStorage, 'getItemFromLocalStorage').returns({expirationDate});
    expect(WeatherAPI.isCacheValid(localFixtures.cityId)).to.equal(true);
    LocalStorage.getItemFromLocalStorage.restore();
  });
  it('Test if getWeatherInfoFromCache is calling LocalStorage and returning expected value', async () => {
    const stubLocalStorage = stub(LocalStorage, 'getItemFromLocalStorage').returns(localFixtures.response);
    const weatherInfo = await WeatherAPI.getWeatherInfoFromCache(localFixtures.cityId);
    expect(stubLocalStorage.calledOnce).to.equal(true);
    expect(stubLocalStorage.getCall(0).args[0]).to.equal(localFixtures.cityId);
    expect(weatherInfo).to.eql(localFixtures.response.data);
    LocalStorage.getItemFromLocalStorage.restore();
  });
});
