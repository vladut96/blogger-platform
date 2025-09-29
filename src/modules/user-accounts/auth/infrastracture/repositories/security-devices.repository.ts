import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeviceSession, DeviceSessionDocument } from '../schemas/auth.schema';
import { Model } from 'mongoose';
import { DeviceAuthSession } from '../../../../../core/types/types';

@Injectable()
export class SecurityDevicesRepository {
  constructor(
    @InjectModel(DeviceSession.name)
    private deviceSession: Model<DeviceSessionDocument>,
  ) {}

  async createDeviceSession(
    sessionData: DeviceAuthSession,
  ): Promise<DeviceSessionDocument> {
    return await this.deviceSession.create(sessionData);
  }
  async updateDeviceSession(sessionData: {
    deviceId: string;
    lastActiveDate: string;
    exp: string;
  }): Promise<boolean> {
    const result = await this.deviceSession.updateOne(
      { deviceId: sessionData.deviceId },
      {
        $set: {
          lastActiveDate: sessionData.lastActiveDate,
          exp: sessionData.exp,
        },
      },
    );
    return result.matchedCount === 1;
  }
  async getDevices(userId: string) {
    return this.deviceSession
      .find(
        { userId },
        { _id: 0, ip: 1, title: 1, lastActiveDate: 1, deviceId: 1 },
      )
      .lean();
  }
  async findSessionByDeviceId(
    deviceId: string,
  ): Promise<DeviceAuthSession | null> {
    return this.deviceSession.findOne({ deviceId }).lean();
  }
  async deleteOneDeviceSession(deviceId: string) {
    return this.deviceSession.deleteOne({ deviceId });
  }
  async deleteAllExceptCurrent(userId: string, currentDeviceId: string) {
    await this.deviceSession
      .deleteMany({
        userId,
        deviceId: { $ne: currentDeviceId },
      })
      .exec();
  }
}
