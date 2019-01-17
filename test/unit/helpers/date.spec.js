import DateHelper from '../../../helpers/date';

describe('Unit tests for Date Helper', () => {
  it('Test if method getCurrentISODateString returns an instance of Date', () => {
    expect(typeof DateHelper.getCurrentISODateString()).to.equal(typeof 'string');
  })
});
