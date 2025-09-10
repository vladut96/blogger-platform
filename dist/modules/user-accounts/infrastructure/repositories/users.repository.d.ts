import { HydratedDocument, Model } from 'mongoose';
import { QueryUsersDto } from '../../dto/query-users.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { UserViewModel } from '../../../../core/types/types';
export declare class UsersRepository {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    getUsers(query: QueryUsersDto): Promise<{
        users: HydratedDocument<User>[];
        totalCount: number;
    }>;
    getUserByLoginOrEmail(login: string, email: string): Promise<UserViewModel | null>;
    save(newUser: User): Promise<UserDocument>;
    deleteUserById(userId: string): Promise<boolean>;
}
