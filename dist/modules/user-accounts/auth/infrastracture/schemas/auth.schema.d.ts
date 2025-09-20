import { HydratedDocument } from 'mongoose';
export declare class DeviceSession {
    userId: string;
    deviceId: string;
    lastActiveDate: string;
    title: string;
    ip: string;
    exp: string;
}
export type DeviceSessionDocument = HydratedDocument<DeviceSession>;
export declare const DeviceSessionSchema: import("mongoose").Schema<DeviceSession, import("mongoose").Model<DeviceSession, any, any, any, import("mongoose").Document<unknown, any, DeviceSession, any, {}> & DeviceSession & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DeviceSession, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<DeviceSession>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<DeviceSession> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
