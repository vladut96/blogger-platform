import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './api/users.controller';
import { UsersService } from './application/users.service';
import { User, UserSchema } from './infrastructure/schemas/user.schema';
import { UsersRepository } from './infrastructure/repositories/users.repository';
import { PassportModule } from '@nestjs/passport';
import { BasicStrategy } from '../../../core/guards/basic.strategy';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, BasicStrategy],
  exports: [UsersService],
})
export class UsersModule {}
