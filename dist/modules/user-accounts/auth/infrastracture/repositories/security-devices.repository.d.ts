import { DeviceSession, DeviceSessionDocument } from '../schemas/auth.schema';
import { Model } from 'mongoose';
import { DeviceAuthSession } from '../../../../../core/types/types';
export declare class SecurityDevicesRepository {
    private deviceSession;
    constructor(deviceSession: Model<DeviceSessionDocument>);
    createDeviceSession(sessionData: DeviceAuthSession): Promise<DeviceSessionDocument>;
    updateDeviceSession(sessionData: {
        deviceId: string;
        lastActiveDate: string;
        exp: string;
    }): Promise<boolean>;
    getDevices(userId: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, DeviceSession, {}, {}> & DeviceSession & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findSessionByDeviceId(deviceId: string): Promise<DeviceAuthSession | null>;
    deleteOneDeviceSession(deviceId: string): Promise<import("mongodb").DeleteResult>;
    deleteAllExceptCurrent(userId: string, currentDeviceId: string): Promise<void>;
}
