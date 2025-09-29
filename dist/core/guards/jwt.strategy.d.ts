import { Strategy } from 'passport-jwt';
import { MeViewModel } from '../types/types';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: MeViewModel): Promise<{
        email: string;
        login: string;
        userId: string;
    }>;
}
export {};
