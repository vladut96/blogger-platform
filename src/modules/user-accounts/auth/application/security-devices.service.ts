import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SecurityDevicesRepository } from '../infrastracture/repositories/security-devices.repository';
import { DeviceAuthSession } from '../../../../core/types/types';

@Injectable()
export class SecurityDevicesService {
  constructor(
    private readonly securityDevicesRepository: SecurityDevicesRepository,
  ) {}

  async createDeviceSession(session: DeviceAuthSession) {
    return this.securityDevicesRepository.createDeviceSession(session);
  }
  async getDevices(userId: string) {
    return await this.securityDevicesRepository.getDevices(userId);
  }
  async updateDeviceSession(sessionData: {
    deviceId: string;
    lastActiveDate: string;
    exp: string;
  }): Promise<boolean> {
    return this.securityDevicesRepository.updateDeviceSession(sessionData);
  }

  async deleteDevice(userId: string, deviceId: string) {
    const session =
      await this.securityDevicesRepository.findSessionByDeviceId(deviceId);
    if (!session) throw new NotFoundException();
    if (session.userId !== userId) throw new ForbiddenException();
    await this.securityDevicesRepository.deleteOneDeviceSession(deviceId);
  }

  async deleteAllExceptCurrent(userId: string, currentDeviceId: string) {
    await this.securityDevicesRepository.deleteAllExceptCurrent(
      userId,
      currentDeviceId,
    );
  }
}
