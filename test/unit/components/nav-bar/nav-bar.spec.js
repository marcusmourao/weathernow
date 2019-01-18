import {shallowMount} from '@vue/test-utils';
import NavBar from '../../../../components/nav-bar/nav-bar.vue';

describe('Unit tests for nav-bar Component', () => {
  const wrapper = shallowMount(NavBar);
  it('Test if component has a nav tag', () => {
    const nav = wrapper.find('nav');
    expect(nav.exists()).to.equal(true);
  });
  it('Test if component has an anchor tag inside nav tag', () => {
    const anchor = wrapper.find('nav a');
    expect(anchor.exists()).to.equal(true);
  });
  it('Test if component has an img tag inside anchor tag', () => {
    const img = wrapper.find('nav a img');
    expect(img.exists()).to.equal(true);
  });
  it('Test if component has an anchor tag with correct href property', () => {
    const anchor = wrapper.find('a');
    expect(anchor.attributes().href).to.equal('/');
  });
  it('Test if component has an image tag with correct attributes', () => {
    const image = wrapper.find('img');
    expect(image.attributes().src).to.equal('/logo.svg');
    expect(image.attributes().alt).to.equal('Weather Now Logo');
  });
});
