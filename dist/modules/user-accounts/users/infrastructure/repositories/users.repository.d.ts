import { HydratedDocument, Model } from 'mongoose';
import { QueryUsersDto } from '../../dto/query-users.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { EmailConfirmation, RecoveryCodeModel, RegisterUserDB, UserID } from '../../../../../core/types/types';
export declare class UsersRepository {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    getUsers(query: QueryUsersDto): Promise<{
        users: HydratedDocument<User>[];
        totalCount: number;
    }>;
    getUserByLoginOrEmail(loginOrEmail: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    getUserByLogin(login: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    getUserByEmail(email: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    findUserByConfirmationCode(code: string): Promise<RegisterUserDB<EmailConfirmation> | null>;
    updateConfirmationStatus(email: string, status: boolean): Promise<void>;
    updateConfirmationCode(email: string, newCode: string, expirationDate: Date): Promise<boolean>;
    setPasswordRecoveryCode(dto: RecoveryCodeModel): Promise<boolean>;
    findUserByRecoveryCode(recoveryCode: string): Promise<RegisterUserDB<EmailConfirmation> | null>;
    updateUserPassword(email: string, newPasswordHash: string): Promise<boolean>;
    save(newUser: User): Promise<UserDocument>;
    deleteUserById(userId: UserID): Promise<boolean>;
}
