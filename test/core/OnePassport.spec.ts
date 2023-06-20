
import { expect } from 'chai';
import { Express } from 'express';
import { OnePassport } from '../../src/core/OnePassport';
import { Providers } from '../../src/definitions/enums/Providers';
import { Provider } from '../../src/definitions/interfaces/Provider';
import { Google } from '../../src/strategies/google/Google';

context('[CORE] 1Passport', () => {
    let app:Express;
    describe('happy path', () => {
        it('should return an instance of OnePassport', () => {
            sinon.stub(Google.prototype,'setup');

            const provider: Provider = {
                provider: Providers.GOOGLE,
                authPath: '/foo/bar',
                callbackPath: '/foo/bar/callback',
                domain: 'foo.bar',
                apiKey: 'foo',
                redirect: false
            };

            expect(new OnePassport(app, [provider])).to.be.an.instanceOf(OnePassport);
        });
    });

    describe('sad path', () => {
        it('should throw an error if no providers are passed', () => {
            expect(() => new OnePassport(app, [])).to.throw('No providers found');
        });

        it('should throw an error if an invalid provider is passed', () => {
            const provider: Provider = {
                provider: Providers.TEST,
                authPath: '/foo/bar',
                callbackPath: '/foo/bar/callback',
                domain: 'foo.bar',
                apiKey: 'foo',
                redirect: false
            };

            expect(() => new OnePassport(app, [provider])).to.throw('Not a valid provider');
        });
    });

    after(() => {
        sinon.restore();
    });
});
