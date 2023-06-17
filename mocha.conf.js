import chai from 'chai';
import * as sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

// eslint-disable-next-line no-undef
global.expect = chai.expect;
// eslint-disable-next-line no-undef
global.sinon = sinon;

chai.use(sinonChai);
chai.use(chaiAsPromised);
