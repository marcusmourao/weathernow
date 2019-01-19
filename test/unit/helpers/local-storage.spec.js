import {stub} from 'sinon';
import LocalStorage from './../../../helpers/storage';

describe('Unit tests for LocalStorage helper', () => {
  it('Test if method saveItemInLocalStorage is working as expected', () => {
    const stubGlobalLocalStorage = stub(localStorage, 'setItem');
    const data = {test: 'test'};
    const stringifyData = JSON.stringify(data);
    LocalStorage.saveItemInLocalStorage('data', data);
    expect(stubGlobalLocalStorage.calledOnce).to.equal(true);
    expect(stubGlobalLocalStorage.getCall(0).args[0]).to.equal('data');
    expect(stubGlobalLocalStorage.getCall(0).args[1]).to.equal(stringifyData);
    localStorage.setItem.restore();
  });
  it('Test if method getItemFromLocalStorage is working as expected', () => {
    const data = {test: 'test'};
    const stringifyData = JSON.stringify(data);
    const stubGlobalLocalStorage = stub(localStorage, 'getItem').returns(stringifyData);
    const localStorageData = LocalStorage.getItemFromLocalStorage('data');
    expect(stubGlobalLocalStorage.calledOnce).to.equal(true);
    expect(stubGlobalLocalStorage.getCall(0).args[0]).to.equal('data');
    expect(localStorageData).to.eql(data);
    localStorage.getItem.restore();
  });
});
