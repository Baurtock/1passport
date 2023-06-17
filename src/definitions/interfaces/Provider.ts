import { Providers } from '../enums/Providers';

export interface Provider {
    provider: Providers;
    authPath: string;
    callbackPath: string;
    domain: string;
    apiKey: string;
    redirect: boolean;
    callBackController?: (req: Request, res: Response) => void;
}
