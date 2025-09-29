import { SecurityDevicesService } from '../application/security-devices.service';
import { JwtRefreshTokenUser } from '../../../../core/types/types';
export declare class SecurityDevicesController {
    private readonly securityDevicesService;
    constructor(securityDevicesService: SecurityDevicesService);
    getDevices(user: JwtRefreshTokenUser): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("../infrastracture/schemas/auth.schema").DeviceSession, {}, {}> & import("../infrastracture/schemas/auth.schema").DeviceSession & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    deleteDevice(deviceId: string, user: JwtRefreshTokenUser): Promise<void>;
    deleteAllExceptCurrent(user: JwtRefreshTokenUser): Promise<void>;
}
