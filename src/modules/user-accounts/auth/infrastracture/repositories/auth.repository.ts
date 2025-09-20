import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeviceSession, DeviceSessionDocument } from '../schemas/auth.schema';
import { Model } from 'mongoose';
import { DeviceAuthSession } from '../../../../../core/types/types';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(DeviceSession.name)
    private deviceSession: Model<DeviceSessionDocument>,
  ) {}

  async createDeviceSession(
    sessionData: DeviceAuthSession,
  ): Promise<DeviceSessionDocument> {
    return await this.deviceSession.create(sessionData);
  }
}
