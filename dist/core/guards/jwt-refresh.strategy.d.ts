import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtRefreshTokenUser } from '../types/types';
interface RequestWithCookies extends Request {
    cookies: Record<string, unknown>;
}
declare const JwtRefreshStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    constructor();
    validate(req: RequestWithCookies, payload: JwtRefreshTokenUser): Promise<{
        userId: string;
        deviceId: string;
    }>;
}
export {};
