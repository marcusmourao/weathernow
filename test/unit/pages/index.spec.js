import {shallowMount} from '@vue/test-utils';
import indexPage from './../../../pages/index.vue';

describe('Unit tests for index page', () => {
  it('Test if page renders expected components', () => {
    const wrapper = shallowMount(indexPage);
    expect(wrapper.classes()).to.contain('container');

    const navBar = wrapper.find({name: 'nav-bar'});
    expect(navBar.exists()).to.equal(true);
    expect(navBar.isVisible()).to.equal(true);

    const weatherList = wrapper.find({name: 'weather-list'});
    expect(weatherList.exists()).to.equal(true);
    expect(weatherList.isVisible()).to.equal(true);
  });
});
