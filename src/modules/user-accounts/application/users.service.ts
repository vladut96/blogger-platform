import { injectable } from 'inversify';
import {
  Paginator,
  UserInputModel,
  UserViewModel,
} from '../../../core/types/types';
import { UserEntity } from '../domain/user.entity';
import { UsersRepository } from '../infrastructure/repositories/users.repository';
import { QueryUsersDto } from '../dto/query-users.dto';
import { NotFoundException } from '@nestjs/common';
import { buildPaginator } from '../../../core/utils/buildPaginator';

@injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUsers(query: QueryUsersDto): Promise<Paginator<UserViewModel>> {
    const { users, totalCount } = await this.usersRepository.getUsers(query);

    const items: UserViewModel[] = users.map((user) =>
      UserEntity.fromPersistence(user).toViewModel(),
    );

    return buildPaginator(query, totalCount, items);
  }
  async createUser(userDTO: UserInputModel) {
    const userEntity = await UserEntity.create(userDTO);
    const createdUser = await this.usersRepository.save(
      userEntity.toPersistence(),
    );
    return UserEntity.fromPersistence(createdUser).toViewModel();
  }
  async deleteUserById(userId: string): Promise<void> {
    const deletedUser = await this.usersRepository.deleteUserById(userId);
    if (!deletedUser) throw new NotFoundException();
  }
}
