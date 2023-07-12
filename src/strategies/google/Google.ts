import { Express } from 'express';
import { Provider } from '../../definitions/interfaces/Provider';
import { Strategy } from '../../definitions/interfaces/Strategy';
import { LoginHandler } from './LoginHandler';

export class Google implements Strategy {
    private app: Express;
    private provider: Provider;
    private providerUrl: string = 'https://accounts.google.com/o/oauth2/v2/auth';
    private loginHandler: LoginHandler;

    constructor(app: Express, provider: Provider) {
        this.app = app;
        this.provider = provider;

        this.loginHandler = new LoginHandler(this.providerUrl, provider);
    }

    public setup(): void {
        this.createLoginPath();
    }

    private createLoginPath(): void {
        this.app.get(this.provider.authPath, this.loginHandler.handle.bind(this.loginHandler));
    }
}
