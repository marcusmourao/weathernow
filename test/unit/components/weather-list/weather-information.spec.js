import Vuex from 'vuex';
import {shallowMount, createLocalVue} from '@vue/test-utils';
import cityModelFixtures from '../../../fixtures/model/city-model-fixtures';
import WeatherInformation from '../../../../components/weather-list/weather-information.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

function buildStore(cityId) {
  return new Vuex.Store({
    modules: {
      weather: {
        state: {
          activeCityId: cityId,
        },
        mutations: {
          'weather/setActiveCityId': () => {},
        }
      }
    }
  });

}

const store = buildStore(null);

describe('Unit tests for Weather Information Component', () => {
  const wrapper = shallowMount(WeatherInformation, {propsData: {city: cityModelFixtures.cityInstance}, localVue, store});
  it('Test if component has expected props city', () => {
    expect(wrapper.vm.city).to.equal(cityModelFixtures.cityInstance);
  });
  describe('Test if component renders correct', () => {
    it('Test if component has information__container class', () => {
      expect(wrapper.classes()).to.contains('information__container');
    });
    it('Test if component has div.temperature__container', () => {
      const temperatureContainer = wrapper.find('div.temperature__container');
      expect(temperatureContainer.exists()).to.equal(true);
    });
    it('Test if component renders temperature correct', () => {
      const temperature = wrapper.find('span.weather__temperature');
      expect(temperature.exists()).to.equal(true);
      expect(temperature.text()).to.equal(Math.floor(cityModelFixtures.cityInstance.temperature).toString(10));
    });
    it('Test if component has div.weather-information__footer', () => {
      const footer = wrapper.find('.weather-information__footer');
      expect(footer.exists()).to.equal(true);
    });
    it('Test if component do not display weather-information__extra-info when is not active', () => {
      const weatherExtraInfo = wrapper.find('.weather-information__extra-info');
      expect(wrapper.vm.isActive).to.equal(false);
      expect(weatherExtraInfo.exists()).to.equal(true);
      expect(weatherExtraInfo.isVisible()).to.equal(false);
    });
    it('Test if component render updatedAt correct', () => {
      const updatedAt = wrapper.find('span.weather-information__updated-at');
      expect(updatedAt.exists()).to.equal(true);
      expect(updatedAt.text()).to.equal(`Updated at ${wrapper.vm.city.updatedAtToString}`);
    });
  });
  describe('Test if computed property temperatureStyle is returning expected value', () => {
    const temperaturesTestSuit = [
      {
        temperature: 4,
        expectedValue: 'cold',
      },
      {
        temperature: 5,
        expectedValue: 'cold',
      },
      {
        temperature: 6,
        expectedValue: 'mild',
      },
      {
        temperature: 24,
        expectedValue: 'mild',
      },
      {
        temperature: 25,
        expectedValue: 'mild',
      },
      {
        temperature: 26,
        expectedValue: 'hot',
      },
    ];
    const wrapperForTemperatureTests = shallowMount(WeatherInformation, {
      propsData: {
        city: cityModelFixtures.cityInstance,
      },
      localVue,
      store
    });
    temperaturesTestSuit.forEach((testConstraint) => {
      it(`Test if computed property temperatureStyle returns
       ${testConstraint.expectedValue} with temperature ${testConstraint.temperature}`, () => {
        wrapperForTemperatureTests.setProps({
          city: {
            ...cityModelFixtures.cityInstance,
            temperature: testConstraint.temperature
          }
        });
        expect(wrapperForTemperatureTests.vm.temperatureStyle).to.equal(testConstraint.expectedValue);
        const temperature = wrapperForTemperatureTests.find('span.weather__temperature');
        expect(temperature.classes()).to.contain(testConstraint.expectedValue);
      });
    });
  });
  describe('Unit tests for component when it is active', () => {
    const storeWithCityIdActive = buildStore(cityModelFixtures.cityInstance.id);
    const wrapperActive = shallowMount(WeatherInformation, {
      propsData: {
        city: cityModelFixtures.cityInstance
      },
      localVue,
      store: storeWithCityIdActive
    });
    it('Test if computed property isActive is true', () => {
      expect(wrapperActive.vm.isActive).to.equal(true);
    });
    it('Test if component is displaying div.weather-information__extra-info', () => {
      const weatherExtraInfo = wrapperActive.find('.weather-information__extra-info');
      expect(weatherExtraInfo.exists()).to.equal(true);
      expect(weatherExtraInfo.isVisible()).to.equal(true);
    });
    it('Test if component renders information detail correct', () => {
      const informationDetail = wrapperActive.findAll('.information__detail');
      expect(informationDetail.length).to.equal(2);
      const humidity = informationDetail.at(0);
      const pressure = informationDetail.at(1);

      const humidityTitle = humidity.find('h6');
      const humidityInformation = humidity.find('span.humidity');
      expect(humidityTitle.exists()).to.equal(true);
      expect(humidityInformation.exists()).to.equal(true);
      expect(humidityTitle.text()).to.equal('HUMIDITY');
      expect(humidityInformation.text()).to.equal(wrapperActive.vm.city.humidity.toString(10));

      const pressureTitle = pressure.find('h6');
      const pressureInformation = pressure.find('span.pressure');
      expect(pressureTitle.exists()).to.equal(true);
      expect(pressureInformation.exists()).to.equal(true);
      expect(pressureTitle.text()).to.equal('PRESSURE');
      expect(pressureInformation.text()).to.equal(wrapperActive.vm.city.pressure.toString(10));
    });
  });
});
