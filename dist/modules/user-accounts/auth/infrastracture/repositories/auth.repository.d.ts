import { DeviceSessionDocument } from '../schemas/auth.schema';
import { Model } from 'mongoose';
import { DeviceAuthSession } from '../../../../../core/types/types';
export declare class AuthRepository {
    private deviceSession;
    constructor(deviceSession: Model<DeviceSessionDocument>);
    createDeviceSession(sessionData: DeviceAuthSession): Promise<DeviceSessionDocument>;
}
