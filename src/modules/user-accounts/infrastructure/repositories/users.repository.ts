import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, HydratedDocument, Model, SortOrder } from 'mongoose';
import { QueryUsersDto } from '../../dto/query-users.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { UserViewModel } from '../../../../core/types/types';

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
    login: string,
    email: string,
  ): Promise<UserViewModel | null> {
    const user = await this.userModel
      .findOne({
        $or: [{ login }, { email }],
      })
      .lean();

    if (!user) return null;

    return {
      id: user._id.toString(),
      login: user.login,
      email: user.email,
      createdAt: user.createdAt || 'unknown',
    };
  }

  async save(newUser: User): Promise<UserDocument> {
    return await this.userModel.create(newUser);
  }

  async deleteUserById(userId: string): Promise<boolean> {
    const result = await this.userModel.deleteOne({ _id: userId });
    return result.deletedCount > 0;
  }
}
