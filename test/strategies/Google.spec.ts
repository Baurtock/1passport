import { expect } from 'chai';
import { Express } from 'express';
import { Providers } from '../../src/definitions/enums/Providers';
import { Provider } from '../../src/definitions/interfaces/Provider';
import { Google } from '../../src/strategies/Google';
import { Strategy } from 'definitions/interfaces/Strategy.ts';

context('[STRATEGY] Google', () => {
    const app: Express = null;
    let strategy: Strategy;

    beforeEach(() => {
        const provider: Provider = {
            provider: Providers.GOOGLE,
            authPath: '/foo/bar',
            callbackPath: '/foo/bar/callback',
            domain: 'foo.bar',
            apiKey: 'foo',
            redirect: false
        };

        strategy = new Google(app, provider);
    });

    it('should throw an error', () => {
        try {
            strategy.setup();
        } catch (error) {
            expect(error.message).to.equal('Method not implemented');
        }
    });
});
