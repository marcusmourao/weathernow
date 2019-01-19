import {shallowMount} from '@vue/test-utils';
import Loader from '../../../../components/loader/loader.vue';

describe('Unit testing for loader component', () => {
  const wrapper = shallowMount(Loader);
  it('Test if component renders expected image correct', () => {
    const image = wrapper.find('img');
    expect(image.exists()).to.equal(true);
    expect(image.attributes().alt).to.equal('Loading Icon');
    expect(image.attributes().src).to.equal('/loader.svg');
  });
});
