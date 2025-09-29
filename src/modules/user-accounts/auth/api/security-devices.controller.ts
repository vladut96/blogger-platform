import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { SecurityDevicesService } from '../application/security-devices.service';
import { CurrentUser } from '../../../../core/decorators/currentUser-JWT';
import { JwtRefreshTokenUser } from '../../../../core/types/types';
import { JwtRefreshGuard } from '../../../../core/guards/jwt-refresh.guard';

@UseGuards(JwtRefreshGuard)
@Controller('security/devices')
export class SecurityDevicesController {
  constructor(
    private readonly securityDevicesService: SecurityDevicesService,
  ) {}
  @Get()
  async getDevices(@CurrentUser() user: JwtRefreshTokenUser) {
    return this.securityDevicesService.getDevices(user.userId);
  }
  @Delete(':deviceId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteDevice(
    @Param('deviceId') deviceId: string,
    @CurrentUser() user: JwtRefreshTokenUser,
  ) {
    return this.securityDevicesService.deleteDevice(deviceId, user.userId);
  }
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAllExceptCurrent(@CurrentUser() user: JwtRefreshTokenUser) {
    await this.securityDevicesService.deleteAllExceptCurrent(
      user.userId,
      user.deviceId,
    );
  }
}
