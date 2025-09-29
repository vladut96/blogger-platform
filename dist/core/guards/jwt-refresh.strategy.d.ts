import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { RefreshTokenModel } from '../types/types';
import { SecurityDevicesService } from '../../modules/user-accounts/auth/application/security-devices.service';
interface RequestWithCookies extends Request {
    cookies: Record<string, unknown>;
}
declare const JwtRefreshStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private readonly securityDevicesService;
    constructor(securityDevicesService: SecurityDevicesService);
    validate(req: RequestWithCookies, payload: RefreshTokenModel): Promise<{
        userId: string;
        deviceId: string;
    }>;
}
export {};
