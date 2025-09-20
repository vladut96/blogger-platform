import { BasicStrategy as Strategy } from 'passport-http';
declare const BasicStrategy_base: new (...args: [] | [options: import("passport-http").BasicStrategyOptions<true>] | [options: import("passport-http").BasicStrategyOptions<false>]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class BasicStrategy extends BasicStrategy_base {
    constructor();
    validate(username: string, password: string): Promise<any>;
}
export {};
