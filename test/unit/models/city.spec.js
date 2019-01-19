import moment from 'moment';
import City from '../../../models/City';
import viewModelFixtures from '../../fixtures/view-model/vm-cities';

const fixtures = {
  ...viewModelFixtures,
};

describe('Unit tests for City model', () => {
  fixtures.cityModel = new City(fixtures.formattedCityInformation);
  it('Test if constructor generates an instance of City', () => {
    const city = new City(fixtures.formattedCityInformation);
    expect(city).to.be.an.instanceOf(City);
  });
  describe('Unit tests for all properties getters/setters from model', () => {
    const parameters = {
      ...fixtures.formattedCityInformation,
      updatedAt: fixtures.currentISODateString,
    };
    const city = new City(fixtures.formattedCityInformation);
    const properties = Object.keys(parameters);
    properties.forEach((property) => {
      it(`Test if constructor generates a City with correct data in property ${property} and setter is working`, () => {
        const patchParameter = 1;
        expect(city[property]).to.equal(parameters[property]);
        city[property] = patchParameter;
        expect(city[property]).to.equal(patchParameter);
      });
    });
    it('Test if updatedAtToString is returning expected value', () => {
      expect(city.updatedAtToString).to.equal(moment(city.updatedAt).format('h:mm:ss a'))
    });
  });
});
