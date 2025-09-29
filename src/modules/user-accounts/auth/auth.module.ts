import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './api/auth.controller';
import { AuthService } from './application/auth.service';
import {
  DeviceSession,
  DeviceSessionSchema,
} from './infrastracture/schemas/auth.schema';
import { UsersModule } from '../users/users.module';
import { SecurityDevicesRepository } from './infrastracture/repositories/security-devices.repository';
import { SecurityDevicesService } from './application/security-devices.service';
import { SecurityDevicesController } from './api/security-devices.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeviceSession.name, schema: DeviceSessionSchema },
    ]),
    UsersModule,
  ],
  controllers: [AuthController, SecurityDevicesController],
  providers: [AuthService, SecurityDevicesService, SecurityDevicesRepository],
})
export class AuthModule {}
