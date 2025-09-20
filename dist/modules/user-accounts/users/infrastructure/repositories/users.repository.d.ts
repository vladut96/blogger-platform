import { HydratedDocument, Model } from 'mongoose';
import { QueryUsersDto } from '../../dto/query-users.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { EmailConfirmation, RecoveryCodeModel, RegisterUserDB } from '../../../../../core/types/types';
import { EmailDto } from '../../../../../core/dto/email.dto';
import { CodeDto } from '../../../auth/dto/confirmation-code.dto';
export declare class UsersRepository {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    getUsers(query: QueryUsersDto): Promise<{
        users: HydratedDocument<User>[];
        totalCount: number;
    }>;
    getUserByLoginOrEmail(email: string | EmailDto, login?: string): Promise<null | UserDocument>;
    findUserByConfirmationCode(code: CodeDto): Promise<RegisterUserDB<EmailConfirmation> | null>;
    updateConfirmationStatus(email: string, status: boolean): Promise<void>;
    updateConfirmationCode(email: EmailDto, newCode: string, expirationDate: Date): Promise<boolean>;
    setPasswordRecoveryCode(dto: RecoveryCodeModel): Promise<boolean>;
    findUserByRecoveryCode(recoveryCode: string): Promise<RegisterUserDB<EmailConfirmation> | null>;
    updateUserPassword(email: string, newPasswordHash: string): Promise<boolean>;
    save(newUser: User): Promise<UserDocument>;
    deleteUserById(userId: string): Promise<boolean>;
}
