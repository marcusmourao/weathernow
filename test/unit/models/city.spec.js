import {stub} from 'sinon';
import City from '../../../models/City';
import DateHelper from '../../../helpers/date';
import viewModelFixtures from '../../fixtures/view-model/vm-cities';

const fixtures = {
  ...viewModelFixtures,
};

stub(DateHelper, 'getCurrentISODateString').returns(fixtures.currentISODateString);

fixtures.cityModel = new City(fixtures.formattedCityInformation);

describe('Unit tests for City model', () => {
  after(() => {
    DateHelper.getCurrentISODateString.restore();
  });
  it('Test if constructor generates an instance of City', () => {
    const city = new City(fixtures.formattedCityInformation);
    expect(city).to.be.an.instanceOf(City);
    expect(city).to.eql(fixtures.cityModel);
  });
  describe('Unit tests for all properties getters/setters from model', () => {
    const parameters = {
      ...fixtures.formattedCityInformation,
      updateAt: fixtures.currentISODateString,
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
  });
});
