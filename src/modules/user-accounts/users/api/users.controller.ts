import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CreateUserDto } from '../dto/create-user.dto';
import { QueryUsersDto } from '../dto/query-users.dto';
import { ParseMongoIdPipe } from '../../../../core/pipes/parse-mongo-id.pipe';
import { UsersService } from '../application/users.service';
import { BasicAuthGuard } from '../../../../core/guards/basic-auth.guard';
import { UserID } from '../../../../core/types/types';

@UseGuards(BasicAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async getUsers(@Query() query: QueryUsersDto) {
    return await this.usersService.getUsers(query);
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return await this.usersService.createUser(dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(@Param('id', ParseMongoIdPipe) _id: UserID) {
    await this.usersService.deleteUserById(_id);
  }
}
