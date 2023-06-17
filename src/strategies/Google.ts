import { Express } from 'express';
import { Provider } from '../definitions/interfaces/Provider';
import { Strategy } from '../definitions/interfaces/Strategy';

export class Google implements Strategy {
    private app: Express;
    private provider: Provider;
    private providerUrl: string = 'https://accounts.google.com/o/oauth2/v2/auth';

    constructor(app: Express, provider: Provider) {
        this.app = app;
        this.provider = provider;
    }

    public setup(): void {
        throw new Error('Method not implemented');
    }
}
