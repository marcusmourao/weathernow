import {state, mutations} from '../../../store/weather';

describe('Unit tests for weather store', () => {
  it('Test if store has default state as expected', () => {
    expect(state()).to.eql({activeCityId: null});
  });
  it('Test if mutation setActiveCityId is working as expected', () => {
    const currentState = state();
    expect(currentState.activeCityId).to.equal(null);
    mutations.setActiveCityId(currentState, 123);
    expect(currentState.activeCityId).to.equal(123);
  });
});
