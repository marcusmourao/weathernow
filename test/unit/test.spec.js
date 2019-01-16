import {shallowMount} from '@vue/test-utils'
import component from '../../components/Logo.vue';

describe('Unit test test', () => {
  const wrapper = shallowMount(component);
  it('Test if tests are working', () => {
    expect(true).to.equal(true);
    expect(wrapper.find('p').exists()).to.equal(true);
    expect(wrapper.find('p').text()).to.equal('Hello World');
  });
  it('Test if component has correct data', () => {
    expect(wrapper.vm.state).to.equal('state fulsl');
  });
});
