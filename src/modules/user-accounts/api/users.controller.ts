import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { CreateUserDto } from '../dto/create-user.dto';
import { QueryUsersDto } from '../dto/query-users.dto';
import { ParseMongoIdPipe } from '../../../core/pipes/parse-mongo-id.pipe';
import { UsersService } from '../application/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async getUsers(@Query() query: QueryUsersDto) {
    console.log(query);
    return await this.usersService.getUsers(query);
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return await this.usersService.createUser(dto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseMongoIdPipe) id: string) {
    await this.usersService.deleteUserById(id);
  }
}
