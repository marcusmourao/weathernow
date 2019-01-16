import supportedCities from '../../../config/supported-cities';
import supportedCitiesFixtures from '../../fixtures/config/supported-cities-fixtures';

describe('Unit tests for supported cities config', () => {
  it('Test if config is defined as expected', () => {
    expect(supportedCities).to.eql(supportedCitiesFixtures);
  });
});
