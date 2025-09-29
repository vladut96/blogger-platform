import { injectable } from 'inversify';
import {
  EmailConfirmation,
  Paginator,
  RecoveryCodeModel,
  RegisterUserDB,
  MongoID,
  UserViewModel,
} from '../../../../core/types/types';
import { UserEntity } from '../domain/user.entity';
import { UsersRepository } from '../infrastructure/repositories/users.repository';
import { QueryUsersDto } from '../dto/query-users.dto';
import { NotFoundException } from '@nestjs/common';
import { buildPaginator } from '../../../../core/utils/buildPaginator';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDocument } from '../infrastructure/schemas/user.schema';

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
  async getUserById(userId: string) {
    return this.usersRepository.getUserById(userId);
  }
  async getUserByLoginOrEmail(
    loginOrEmail: string,
  ): Promise<null | UserDocument> {
    return await this.usersRepository.getUserByLoginOrEmail(loginOrEmail);
  }
  async getUserByLogin(login: string) {
    return this.usersRepository.getUserByLogin(login);
  }
  async getUserByEmail(email: string) {
    return this.usersRepository.getUserByEmail(email);
  }
  async findUserByConfirmationCode(code: string) {
    return await this.usersRepository.findUserByConfirmationCode(code);
  }
  async updateConfirmationStatus(
    email: string,
    status: boolean,
  ): Promise<void> {
    return await this.usersRepository.updateConfirmationStatus(email, status);
  }
  async updateConfirmationCode(
    email: string,
    newCode: string,
    expirationDate: Date,
  ): Promise<boolean> {
    return this.usersRepository.updateConfirmationCode(
      email,
      newCode,
      expirationDate,
    );
  }
  async setPasswordRecoveryCode(dto: RecoveryCodeModel): Promise<boolean> {
    return this.usersRepository.setPasswordRecoveryCode(dto);
  }
  async findUserByRecoveryCode(
    recoveryCode: string,
  ): Promise<RegisterUserDB<EmailConfirmation> | null> {
    return this.usersRepository.findUserByRecoveryCode(recoveryCode);
  }
  async updateUserPassword(
    email: string,
    newPasswordHash: string,
  ): Promise<boolean> {
    return this.usersRepository.updateUserPassword(email, newPasswordHash);
  }
  async createUser(userDTO: CreateUserDto) {
    const userEntity = await UserEntity.create(userDTO);
    const createdUser = await this.usersRepository.save(
      userEntity.toPersistence(),
    );
    return UserEntity.fromPersistence(createdUser).toViewModel();
  }
  async registerUser(userDTO: CreateUserDto) {
    const userEntity = await UserEntity.register(userDTO);

    return await this.usersRepository.save(userEntity.toPersistence());
  }
  async deleteUserById(userId: MongoID): Promise<void> {
    const deletedUser = await this.usersRepository.deleteUserById(userId);
    if (!deletedUser) throw new NotFoundException();
  }
}
