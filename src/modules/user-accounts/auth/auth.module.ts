import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './api/auth.controller';
import { AuthService } from './application/auth.service';
import { AuthRepository } from './infrastracture/repositories/auth.repository';
import {
  DeviceSession,
  DeviceSessionSchema,
} from './infrastracture/schemas/auth.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeviceSession.name, schema: DeviceSessionSchema },
    ]),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
