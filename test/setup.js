const chai = require('chai');

const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

require('jsdom-global')();

global.expect = chai.expect;
