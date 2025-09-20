import { EmailConfirmation, Paginator, RecoveryCodeModel, RegisterUserDB, UserViewModel } from '../../../../core/types/types';
import { UsersRepository } from '../infrastructure/repositories/users.repository';
import { QueryUsersDto } from '../dto/query-users.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDocument } from '../infrastructure/schemas/user.schema';
import { EmailDto } from '../../../../core/dto/email.dto';
import { CodeDto } from '../../auth/dto/confirmation-code.dto';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    getUsers(query: QueryUsersDto): Promise<Paginator<UserViewModel>>;
    getUserByLoginOrEmail(email: string | EmailDto, login?: string): Promise<null | UserDocument>;
    findUserByConfirmationCode(code: CodeDto): Promise<RegisterUserDB<EmailConfirmation> | null>;
    updateConfirmationStatus(email: string, status: boolean): Promise<void>;
    updateConfirmationCode(email: EmailDto, newCode: string, expirationDate: Date): Promise<boolean>;
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
    deleteUserById(userId: string): Promise<void>;
}
