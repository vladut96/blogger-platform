import { SecurityDevicesRepository } from '../infrastracture/repositories/security-devices.repository';
import { DeviceAuthSession } from '../../../../core/types/types';
export declare class SecurityDevicesService {
    private readonly securityDevicesRepository;
    constructor(securityDevicesRepository: SecurityDevicesRepository);
    createDeviceSession(session: DeviceAuthSession): Promise<import("mongoose").Document<unknown, {}, import("../infrastracture/schemas/auth.schema").DeviceSession, {}, {}> & import("../infrastracture/schemas/auth.schema").DeviceSession & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getDevices(userId: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("../infrastracture/schemas/auth.schema").DeviceSession, {}, {}> & import("../infrastracture/schemas/auth.schema").DeviceSession & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    updateDeviceSession(sessionData: {
        deviceId: string;
        lastActiveDate: string;
        exp: string;
    }): Promise<boolean>;
    validateDeviceSession(deviceId: string, userId: string, exp: number): Promise<boolean>;
    deleteDeviceSession(userId: string, deviceId: string): Promise<void>;
    deleteAllExceptCurrent(userId: string, currentDeviceId: string): Promise<void>;
}
