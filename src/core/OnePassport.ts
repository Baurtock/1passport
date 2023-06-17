import { Express } from 'express';
import { Provider } from '../definitions/interfaces/Provider';
import { Providers } from '../definitions/enums/Providers';
import { Google } from '../strategies/Google';

export class OnePassport {
    providers: Provider[] = [];
    app: Express;

    constructor(app: Express, providers: Provider[] = []) {
        this.providers = providers;
        this.app = app;
        this.setup();
    }

    private setup(): void {
        if (this.providers.length === 0) {
            throw new Error('No providers found');
        }

        this.loadStrategies();
    }

    private loadStrategies(): void {
        this.providers.forEach((provider: Provider) => {
            switch (provider.provider) {
            case Providers.GOOGLE:
                new Google(this.app, provider).setup();
                break;

            default:
                throw new Error('Not a valid provider');
            }
        });
    }
}
