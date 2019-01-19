import City from '../../../models/City';
import viewModelFixtures from '../../fixtures/view-model/vm-cities';

const fixtures = {
  cityInstance: new City(viewModelFixtures.formattedCityInformation),
};

export default fixtures;
