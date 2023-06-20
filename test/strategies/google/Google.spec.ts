import { expect } from 'chai';
import { Express } from 'express';
import * as express from 'express';
import { Providers } from '../../../src/definitions/enums/Providers';
import { Provider } from '../../../src/definitions/interfaces/Provider';
import { Strategy } from '../../../src/definitions/interfaces/Strategy';
import { Google } from '../../../src/strategies/google/Google';

context('[STRATEGY] Google', () => {
    let app: Express;
    let strategy: Strategy;

    beforeEach(() => {
        app = express();

        sinon.spy(app, 'get')
        sinon.spy(app, 'use');

        const provider: Provider = {
            provider: Providers.GOOGLE,
            authPath: '/foo/bar',
            callbackPath: '/foo/bar/callback',
            domain: 'foo.bar',
            apiKey: 'foo',
            redirect: false
        };

        strategy = new Google(app, provider);

        strategy.setup();
    });

    context('[Login]', () => {
        it('should create the login path using the provided path', () => {
            expect(app.get).to.have.been.calledWith('/foo/bar');
        });

        it('should define login path with the login handler', () => {
            expect(app.get).to.have.been.calledWith('/foo/bar', sinon.match.func);
        });
    });

    after(() => sinon.restore());
});
