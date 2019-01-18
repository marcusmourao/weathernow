import {shallowMount} from '@vue/test-utils';
import WeatherList from '../../../../components/weather-list/weather-list.vue';
import supportedCities from '../../../../config/supported-cities';


describe('Unit tests for Weather List Component', () => {
  const wrapper = shallowMount(WeatherList);
  it('Test if component has expected cities configured in data', () => {
    expect(wrapper.vm.cities).to.equal(supportedCities);
  });
  it('Test if component renders expected section', () => {
    const section = wrapper.find('section');
    expect(section.exists()).to.equal(true);
    expect(section.classes()).to.contains('weather-list__container');
  });
  it('Test if component renders expected Weather Cards', () => {
    const weatherCards = wrapper.findAll({name: 'weather-card'});
    expect(weatherCards.length).to.equal(supportedCities.length);
    supportedCities.forEach((city, index) => {
      expect(weatherCards.at(index).props().cityConstraints).to.eql(city);
    });
  });
});
