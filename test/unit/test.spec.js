import {shallowMount} from '@vue/test-utils'
import component from '../../components/Logo.vue';

describe('Unit test test', () => {
  it('Test if tests are working', () => {
    expect(true).to.equal(true);
    const wrapper = shallowMount(component);
    expect(wrapper.find('p').exists()).to.equal(true);
    expect(wrapper.find('p').text()).to.equal('Hello');
  });
});
