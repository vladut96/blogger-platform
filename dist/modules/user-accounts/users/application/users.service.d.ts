import { EmailConfirmation, Paginator, RecoveryCodeModel, RegisterUserDB, MongoID, UserViewModel } from '../../../../core/types/types';
import { UsersRepository } from '../infrastructure/repositories/users.repository';
import { QueryUsersDto } from '../dto/query-users.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDocument } from '../infrastructure/schemas/user.schema';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    getUsers(query: QueryUsersDto): Promise<Paginator<UserViewModel>>;
    getUserByLoginOrEmail(loginOrEmail: string): Promise<null | UserDocument>;
    getUserByLogin(login: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("../infrastructure/schemas/user.schema").User, {}, {}> & import("../infrastructure/schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    getUserByEmail(email: string): Promise<(import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("../infrastructure/schemas/user.schema").User, {}, {}> & import("../infrastructure/schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    findUserByConfirmationCode(code: string): Promise<RegisterUserDB<EmailConfirmation> | null>;
    updateConfirmationStatus(email: string, status: boolean): Promise<void>;
    updateConfirmationCode(email: string, newCode: string, expirationDate: Date): Promise<boolean>;
    setPasswordRecoveryCode(dto: RecoveryCodeModel): Promise<boolean>;
    findUserByRecoveryCode(recoveryCode: string): Promise<RegisterUserDB<EmailConfirmation> | null>;
    updateUserPassword(email: string, newPasswordHash: string): Promise<boolean>;
    createUser(userDTO: CreateUserDto): Promise<{
        id: string;
        login: string;
        email: string;
        createdAt: string;
    }>;
    registerUser(userDTO: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, import("../infrastructure/schemas/user.schema").User, {}, {}> & import("../infrastructure/schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteUserById(userId: MongoID): Promise<void>;
}
