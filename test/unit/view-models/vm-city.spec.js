import {stub} from 'sinon';
import WeatherAPI from '../../../api/WeatherAPI';
import VMCity from '../../../view-models/vm-city';
import City from '../../../models/City';
import DateHelper from "../../../helpers/date";
import viewModelFixtures from '../../fixtures/view-model/vm-cities';

const fixtures = {
  ...viewModelFixtures,
};


stub(DateHelper, 'getCurrentISODateString').returns(fixtures.currentISODateString);

fixtures.cityModel = new City(fixtures.formattedCityInformation);


describe('Unit tests for View Model City', () => {
  after(() => {
    DateHelper.getCurrentISODateString.restore();
  });
  it('Test if method getCityWithWeatherInformation calls WeatherAPI correct', async () => {
    const stubWeatherAPI = stub(WeatherAPI, 'getWeatherInfoByCityId').resolves(true);
    try {
      await VMCity.getCityWithWeatherInformation(fixtures.cityConstraints);
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
  it('Test if method getCityWithWeatherInformation returns a City instance when API returns correct city information', async () => {
    stub(WeatherAPI, 'getWeatherInfoByCityId').resolves(fixtures.correctCityInformationResponse);
    const city = await VMCity.getCityWithWeatherInformation(fixtures.cityConstraints);
    expect(city).to.be.an.instanceOf(City);
    expect(city).to.eql(fixtures.cityModel);
    WeatherAPI.getWeatherInfoByCityId.restore();
  });
  it('Test if method getCityWithWeatherInformation throw an error when API return mismatch city information', () => {
    stub(WeatherAPI, 'getWeatherInfoByCityId').resolves(fixtures.mismatchCityInformationResponse);
    expect(VMCity.getCityWithWeatherInformation(fixtures.cityConstraints)).to.be.rejectedWith(fixtures.mismatchErrorMessage);
    WeatherAPI.getWeatherInfoByCityId.restore();
  });
  it('Test if method formatInformation is returning expected value', () => {
    expect(VMCity.formatInformation(fixtures.correctCityInformationResponse)).to.eql(fixtures.formattedCityInformation);
  });
  it('Test if method buildCityModel is returning expected instance of City', () => {
    const city = VMCity.buildCityModel(fixtures.formattedCityInformation);
    expect(city).to.be.an.instanceOf(City);
    expect(city).to.eql(fixtures.cityModel);
  });
});
