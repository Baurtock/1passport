import { Request, Response } from 'express-serve-static-core';
import { Provider } from '../../definitions/interfaces/Provider';

export class LoginHandler {
    private provider: Provider;
    private baseUrl: string;

    constructor(baseUrl: string, provider: Provider) {
        this.baseUrl = baseUrl;
        this.provider = provider;
    }

    public handle(req: Request, res: Response): void {
        if (this.provider.redirect) {
            res.redirect(this.generateFullLoginUrl());
        } else {
            res.json({ url: this.generateFullLoginUrl() });
        }
    }

    private generateFullLoginUrl(): string {
        let url: string = '';
        url = url.concat(this.baseUrl);
        url = url.concat(`?client_id=${this.provider.apiKey}`);
        url = url.concat(`&redirect_uri=${this.provider.domain}${this.provider.callbackPath}`);
        url = url.concat('&response_type=token');
        url = url.concat('&scope=openid%20email%20profile');

        return url;
    }
}
