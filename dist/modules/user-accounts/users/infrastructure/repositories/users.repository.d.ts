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
    getUserByLoginOrEmail(email: string, login?: string): Promise<null | UserDocument>;
    findUserByConfirmationCode(code: string): Promise<RegisterUserDB<EmailConfirmation> | null>;
    updateConfirmationStatus(email: string, status: boolean): Promise<void>;
    updateConfirmationCode(email: string, newCode: string, expirationDate: Date): Promise<boolean>;
    setPasswordRecoveryCode(dto: RecoveryCodeModel): Promise<boolean>;
    findUserByRecoveryCode(recoveryCode: string): Promise<RegisterUserDB<EmailConfirmation> | null>;
    updateUserPassword(email: string, newPasswordHash: string): Promise<boolean>;
    save(newUser: User): Promise<UserDocument>;
    deleteUserById(userId: UserID): Promise<boolean>;
}
