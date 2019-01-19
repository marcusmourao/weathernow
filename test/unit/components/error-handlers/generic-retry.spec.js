import {shallowMount} from '@vue/test-utils';
import {spy} from 'sinon';
import GenericRetry from '../../../../components/error-handlers/generic-retry.vue';

function testIfComponentRendersSpanTagCorret(wrapper) {
  const span = wrapper.find('span');
  expect(span.exists()).to.equal(true);
  expect(span.text()).to.equal(wrapper.vm.errorMessage);
}
function testIfComponentRendersButtonTagCorret(wrapper) {
  const button = wrapper.find('button');
  expect(button.exists()).to.equal(true);
  expect(button.text()).to.equal(wrapper.vm.buttonLabel);
}

describe('Unit tests for Generic Retry Component', () => {
  const wrapper = shallowMount(GenericRetry);
  const wrapperWithCustomProps = shallowMount(GenericRetry, {propsData: {
    errorMessage: 'Custom error message',
    buttonLabel: 'Custom button label',
  }});
  it('Test if component has expected props default values', () => {
    expect(wrapper.vm.errorMessage).to.equal('Something went wrong');
    expect(wrapper.vm.buttonLabel).to.equal('Try Again');
  });
  it('Test if component renders default span correct', () => {
    testIfComponentRendersSpanTagCorret(wrapper);
    testIfComponentRendersSpanTagCorret(wrapperWithCustomProps);
  });
  it('Test if component renders default span correct', () => {
    testIfComponentRendersButtonTagCorret(wrapper);
    testIfComponentRendersButtonTagCorret(wrapperWithCustomProps);
  });
  it('Test if method retry emits a retry event', () => {
    const spyRetryMethod = spy(wrapper.vm, '$emit');
    wrapper.vm.retry();
    expect(spyRetryMethod.calledOnce).to.equal(true);
    expect(spyRetryMethod.getCall(0).args[0]).to.equal('retry');
    wrapper.vm.$emit.restore();
  });
  it('Test if click button triggers retry method', () => {
    const spyRetryMethod = spy(wrapper.vm, 'retry');
    const button = wrapper.find('button');
    button.trigger('click');
    expect(spyRetryMethod.called).to.equal(true);
    wrapper.vm.retry.restore();
  });
});
