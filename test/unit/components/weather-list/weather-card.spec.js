import Vuex from 'vuex';
import {stub} from 'sinon';
import {shallowMount, createLocalVue, mount} from '@vue/test-utils';
import WeatherCard from '../../../../components/weather-list/weather-card.vue';
import vmFixtures from '../../../fixtures/view-model/vm-cities';
import cityModelFixtures from '../../../fixtures/model/city-model-fixtures';
import VMWeatherInformation from '../../../../view-models/vm-city';
import config from '../../../../config/application'

const localVue = createLocalVue();
localVue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    weather: {
      state: {
        activeCityId: null,
      },
      mutations: {
        'weather/setActiveCityId': () => {},
      }
    }
  }
});

const {cityConstraints} = vmFixtures;

describe('Unit tests for Weather Card', () => {
  const wrapper = shallowMount(WeatherCard, {propsData: {cityConstraints}, localVue, store});
  it('Test if component has class main_city when computed property isMainCity is true', () => {
    const wrapperMainCity = shallowMount(WeatherCard, {propsData: {cityConstraints}, localVue, store});
    expect(wrapperMainCity.vm.isMainCity).to.equal(false);
    expect(wrapperMainCity.classes()).to.not.contains('main__city');

    wrapperMainCity.setProps({cityConstraints: {
      ...cityConstraints,
      mainCity: true,
    }});

    expect(wrapperMainCity.vm.isMainCity).to.equal(true);
    expect(wrapperMainCity.classes()).to.contains('main__city');
  });
  it('Test if component has .weather__card class', () => {
    expect(wrapper.classes()).to.contain('weather__card');
  });
  it('Test it when clicked, card call method activeCity', () => {
    const stubActiveCity = stub(wrapper.vm, 'activeCity');
    wrapper.trigger('click');
    expect(stubActiveCity.calledOnce).to.equal(true);
    wrapper.vm.activeCity.restore();
  });
  it('Test if component renders city name and country correct', () => {
    const cardTitle = wrapper.find('h4');
    expect(cardTitle.exists()).to.equal(true);
    expect(cardTitle.classes()).to.contain('card__title');
    expect(cardTitle.text()).to.equal(`${cityConstraints.cityName}, ${cityConstraints.cityCountry}`)
  });
  it('Test if component renders a divider', () => {
    const divider = wrapper.find('hr');
    expect(divider.exists()).to.equal(true);
    expect(divider.classes()).to.contains('divider');
  });
  it('Test if component renders a div.card__data', () => {
    const cardData = wrapper.find('div.card__data');
    expect(cardData.exists()).to.equal(true);
  });
  it('Test if component renders loader when is loading', () => {
    const wrapper = shallowMount(WeatherCard, {propsData: {cityConstraints}, localVue, store});
    wrapper.vm.loading = true;
    const loader = wrapper.find({name: 'loader'});
    const weatherInformation = wrapper.find({name: 'weather-information'});
    const genericRetry = wrapper.find({name: 'generic-retry'});

    expect(loader.exists()).to.equal(true);
    expect(loader.isVisible()).to.equal(true);
    expect(weatherInformation.exists()).to.equal(false);
    expect(genericRetry.exists()).to.equal(false);
  });
  it('Test if component renders weather information when is not loading and not error', () => {
    stub(VMWeatherInformation, 'getCityWithWeatherInformation').resolves(cityModelFixtures.cityInstance);
    const wrapper = shallowMount(WeatherCard, {propsData: {cityConstraints}, localVue, store});
    wrapper.vm.cityInformation = cityModelFixtures.cityInstance;
    wrapper.vm.loading = false;
    wrapper.vm.error = false;
    const loader = wrapper.find({name: 'loader'});
    const weatherInformation = wrapper.find({name: 'weather-information'});
    const genericRetry = wrapper.find({name: 'generic-retry'});

    expect(wrapper.vm.isDataAvailable).to.equal(true);
    expect(loader.exists()).to.equal(false);
    expect(weatherInformation.exists()).to.equal(true);
    expect(weatherInformation.props().city).to.eql(cityModelFixtures.cityInstance);
    expect(genericRetry.exists()).to.equal(false);
    VMWeatherInformation.getCityWithWeatherInformation.restore();
  });
  it('Test if component renders generic retry when error is true', () => {
    const wrapper = shallowMount(WeatherCard, {propsData: {cityConstraints}, localVue, store});
    wrapper.vm.loading = false;
    wrapper.vm.error = true;
    const loader = wrapper.find({name: 'loader'});
    const weatherInformation = wrapper.find({name: 'weather-information'});
    const genericRetry = wrapper.find({name: 'generic-retry'});

    expect(loader.exists()).to.equal(false);
    expect(weatherInformation.exists()).to.equal(false);
    expect(genericRetry.exists()).to.equal(true);
  });
  it('Test if component calls getWeatherInformation when generic-retry emits retry event', () => {
    const wrapper = mount(WeatherCard, {propsData: {cityConstraints}, localVue, store});
    wrapper.vm.loading = false;
    wrapper.vm.error = true;
    const genericRetry = wrapper.find({name: 'generic-retry'});
    const stubGetWeatherInformation = stub(wrapper.vm, 'getWeatherInformation');
    genericRetry.vm.$emit('retry');
    expect(stubGetWeatherInformation.called).to.equal(true);

  });
  it('Test if component initialize with correct data', () => {
    expect(wrapper.vm.error).to.equal(false);
    expect(wrapper.vm.active).to.equal(false);
    expect(wrapper.vm.loading).to.equal(true);
    expect(wrapper.vm.cityInformation).to.equal(null);
    expect(wrapper.vm.intervalId).to.equal(null);
  });
  it('Test if component calls method getWeatherInformation when mounted', () => {
    const stubGetWeatherInfo = stub(WeatherCard.methods, 'getWeatherInformation').resolves(cityModelFixtures.cityInstance);
    const stubActiveCity = stub(WeatherCard.methods, 'activeCity');
    shallowMount(WeatherCard, {propsData: {cityConstraints}, localVue, store});
    expect(stubGetWeatherInfo.calledOnce).to.equal(true);
    expect(stubActiveCity.notCalled).to.equal(true);
    WeatherCard.methods.getWeatherInformation.restore();
    WeatherCard.methods.activeCity.restore();
  });
  it('Test if component calls method activeCity when mounted and props has mainCity true', () => {
    const stubActiveCity = stub(WeatherCard.methods, 'activeCity');
    shallowMount(WeatherCard, {propsData: {cityConstraints: {...cityConstraints, mainCity: true}}, localVue, store});
    expect(stubActiveCity.calledOnce).to.equal(true);
    WeatherCard.methods.activeCity.restore();
  });
  it('Test if method getWeatherInformation set correct data when Promise.resolves', async () => {
    stub(VMWeatherInformation, 'getCityWithWeatherInformation').resolves(cityModelFixtures.cityInstance);
    const stubTryStartAutomaticUpdate = stub(wrapper.vm, 'tryStartAutomaticUpdate');
    await wrapper.vm.getWeatherInformation();
    expect(wrapper.vm.loading).to.equal(false);
    expect(wrapper.vm.error).to.equal(false);
    expect(wrapper.vm.cityInformation).to.eql(cityModelFixtures.cityInstance);
    expect(stubTryStartAutomaticUpdate.calledOnce).to.equal(true);
    VMWeatherInformation.getCityWithWeatherInformation.restore();
    wrapper.vm.tryStartAutomaticUpdate.restore();
  });
  it('Test if method getWeatherInformation set correct data when Promise rejects', async () => {
    stub(VMWeatherInformation, 'getCityWithWeatherInformation').rejects();
    await wrapper.vm.getWeatherInformation();
    expect(wrapper.vm.loading).to.equal(false);
    expect(wrapper.vm.error).to.equal(true);
    VMWeatherInformation.getCityWithWeatherInformation.restore();
  });
  it('Test if method activeCity calls store as expected', () => {
    const stubStore = stub(wrapper.vm.$store, 'commit');
    wrapper.vm.activeCity();
    expect(stubStore.calledOnce).to.equal(true);
    expect(stubStore.getCall(0).args[0]).to.equal('weather/setActiveCityId');
    expect(stubStore.getCall(0).args[1]).to.equal(wrapper.vm.cityConstraints.cityId);
  });
  it('Test if method tryStartAutomaticUpdate not calls enableAutomaticUpdate when intervalId is not null', () => {
    const stubEnableAutomaticUpdate = stub(wrapper.vm, 'enableAutomaticUpdate');
    wrapper.vm.intervalId = 123;
    wrapper.vm.tryStartAutomaticUpdate();
    expect(stubEnableAutomaticUpdate.notCalled).to.equal(true);
    wrapper.vm.enableAutomaticUpdate.restore();
  });
  it('Test if method tryStartAutomaticUpdate not calls enableAutomaticUpdate when intervalId is not null', () => {
    const stubEnableAutomaticUpdate = stub(wrapper.vm, 'enableAutomaticUpdate');
    wrapper.vm.intervalId = null;
    wrapper.vm.tryStartAutomaticUpdate();
    expect(stubEnableAutomaticUpdate.calledOnce).to.equal(true);
    expect(stubEnableAutomaticUpdate.getCall(0).args[0]).to.equal(config.intervalForWeatherUpdate);
    wrapper.vm.enableAutomaticUpdate.restore();
  });
  it('Test if after some time getWeatherInformation is called again by interval created by enableAutomaticUpdate', (done) => {
    const stubGetWeatherInformation = stub(wrapper.vm, 'getWeatherInformation');
    expect(stubGetWeatherInformation.notCalled).to.equal(true);
    wrapper.vm.enableAutomaticUpdate(100);
    setTimeout(() => {
      expect(stubGetWeatherInformation.calledOnce).to.equal(true);
      wrapper.vm.getWeatherInformation.restore();
      done();
    }, 180);
  });
});
