import DateHelper from '../../../helpers/date';

describe('Unit tests for Date Helper', () => {
  it('Test if method getCurrentISODateString returns an instance of String', () => {
    expect(typeof DateHelper.getCurrentISODateString()).to.equal(typeof 'string');
  });
  it('Test if method getCurrentISODateString returns expected value', () => {
    expect(DateHelper.getCurrentISODateString()).to.equal('2019-01-20T11:31:15.073Z');
  });
  it('Test if method getDateNow returns expected value', () => {
    expect(DateHelper.getDateNow()).to.equal(1547983875073);
  });
  it('Test if method getDateNow returns an instance of number', () => {
    expect(typeof DateHelper.getDateNow()).to.equal('number');
  });
});
