import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './api/sa-users.controller';
import { UsersService } from './application/users.service';
import { User, UserSchema } from './infrastructure/schemas/user.schema';
import { UsersRepository } from './infrastructure/repositories/users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
