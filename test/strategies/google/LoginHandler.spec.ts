import { expect } from "chai";
import { Request, Response, request } from "express";
import { Providers } from "../../../src/definitions/enums/Providers";
import { LoginHandler } from "../../../src/strategies/google/LoginHandler";

context('[STRATEGY - Google] LoginHandler', () => {
    let redirectSpy;
    let jsonSpy;
    let res: Response;
    let req: Request

    beforeEach(() => {
        redirectSpy = sinon.spy();
        jsonSpy = sinon.spy();

        res = {
            redirect: (url: string) => redirectSpy(url),
            json: (data: any) => jsonSpy(data)
        } as Response;

        req = request;
    });

    afterEach(() => {
        sinon.restore();
    });

    it('it should call redirect with the expected full url when redirec is true', () => {
        const loginHandler = new LoginHandler('http://foo.bar', {
            provider: Providers.GOOGLE,
            authPath: '/foo/bar',
            callbackPath: '/foo/bar/callback',
            domain: 'foo.bar',
            apiKey: 'foo',
            redirect: true
        });

        loginHandler.handle(req, res);

        const expectedUrl = 'http://foo.bar?client_id=foo&redirect_uri=foo.bar//foo/bar/callback&response_type=token&scope=openid%20email%20profile';
        expect(redirectSpy).callCount(1);
        expect(redirectSpy).to.have.been.calledWith(expectedUrl);
    });

    it('it should call json with the expected full url when redirec is false', () => {
        const loginHandler = new LoginHandler('http://foo.bar', {
            provider: Providers.GOOGLE,
            authPath: '/foo/bar',
            callbackPath: '/foo/bar/callback',
            domain: 'foo.bar',
            apiKey: 'foo',
            redirect: false
        });

        loginHandler.handle(req, res);

        const expectedUrl = 'http://foo.bar?client_id=foo&redirect_uri=foo.bar//foo/bar/callback&response_type=token&scope=openid%20email%20profile';
        expect(jsonSpy).callCount(1);
        expect(jsonSpy).to.have.been.calledWith({ url: expectedUrl });
    });
});