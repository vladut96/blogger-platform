import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  FilterQuery,
  HydratedDocument,
  Model,
  SortOrder,
  Types,
} from 'mongoose';
import { QueryUsersDto } from '../../dto/query-users.dto';
import { User, UserDocument } from '../schemas/user.schema';
import {
  EmailConfirmation,
  RecoveryCodeModel,
  RegisterUserDB,
  UserID,
} from '../../../../../core/types/types';
import { EmailDto } from '../../../../../core/dto/email.dto';
import { CodeDto } from '../../../auth/dto/confirmation-code.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getUsers(query: QueryUsersDto): Promise<{
    users: HydratedDocument<User>[];
    totalCount: number;
  }> {
    const {
      searchLoginTerm,
      searchEmailTerm,
      sortBy,
      sortDirection,
      pageNumber,
      pageSize,
    } = query;

    const filter: FilterQuery<User> = {};
    if (searchLoginTerm || searchEmailTerm) {
      filter.$or = [];
      if (searchLoginTerm) {
        filter.$or.push({ login: { $regex: searchLoginTerm, $options: 'i' } });
      }
      if (searchEmailTerm) {
        filter.$or.push({ email: { $regex: searchEmailTerm, $options: 'i' } });
      }
      if (filter.$or.length === 0) delete filter.$or;
    }

    const totalCount = await this.userModel.countDocuments(filter);

    const users = await this.userModel
      .find(filter)
      .sort({ [sortBy]: sortDirection as SortOrder })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    return { users, totalCount };
  }

  async getUserByLoginOrEmail(
    email: string | EmailDto,
    login?: string,
  ): Promise<null | UserDocument> {
    const or: any[] = [];
    if (login) or.push({ login });
    if (email) or.push({ email });
    if (or.length === 0) return null;

    return this.userModel.findOne({ $or: or }).lean();
  }
  async findUserByConfirmationCode(
    code: CodeDto,
  ): Promise<RegisterUserDB<EmailConfirmation> | null> {
    return this.userModel
      .findOne({
        'emailConfirmation.confirmationCode': code,
      })
      .lean();
  }
  async updateConfirmationStatus(
    email: string,
    status: boolean,
  ): Promise<void> {
    await this.userModel.updateOne(
      { email },
      { $set: { 'emailConfirmation.isConfirmed': status } },
    );
  }

  async updateConfirmationCode(
    email: EmailDto,
    newCode: string,
    expirationDate: Date,
  ): Promise<boolean> {
    const result = await this.userModel.updateOne(
      { email },
      {
        $set: {
          'emailConfirmation.confirmationCode': newCode,
          'emailConfirmation.expirationDate': expirationDate,
        },
      },
    );
    return result.modifiedCount === 1;
  }
  async setPasswordRecoveryCode(dto: RecoveryCodeModel): Promise<boolean> {
    const result = await this.userModel.updateOne(
      { email: dto.email },
      {
        $set: {
          'passwordRecovery.recoveryCode': dto.recoveryCode,
          'passwordRecovery.expirationDate': dto.expirationDate,
        },
      },
    );
    return result.modifiedCount === 1;
  }
  async findUserByRecoveryCode(
    recoveryCode: string,
  ): Promise<RegisterUserDB<EmailConfirmation> | null> {
    return this.userModel
      .findOne({
        'passwordRecovery.recoveryCode': recoveryCode,
      })
      .lean();
  }
  async updateUserPassword(
    email: string,
    newPasswordHash: string,
  ): Promise<boolean> {
    const result = await this.userModel.updateOne(
      { email },
      { $set: { passwordHash: newPasswordHash } },
    );
    return result.modifiedCount === 1;
  }
  async save(newUser: User): Promise<UserDocument> {
    return await this.userModel.create(newUser);
  }

  async deleteUserById(userId: UserID): Promise<boolean> {
    const result = await this.userModel.deleteOne({ _id: userId });
    return result.deletedCount > 0;
  }
}
