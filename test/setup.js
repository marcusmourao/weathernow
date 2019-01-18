const chai = require('chai');
const sinon = require('sinon');

const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

require('jsdom-global')();

global.expect = chai.expect;
