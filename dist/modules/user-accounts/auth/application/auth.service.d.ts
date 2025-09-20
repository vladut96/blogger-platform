import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UsersService } from '../../users/application/users.service';
import { EmailDto } from '../../../../core/dto/email.dto';
import { NewPasswordDto } from '../dto/new-password.dto';
import { AuthRepository } from '../infrastracture/repositories/auth.repository';
import { CodeDto } from '../dto/confirmation-code.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly authRepository;
    constructor(usersService: UsersService, authRepository: AuthRepository);
    authenticateUser(loginOrEmail: string, password: string, deviceName: string, ip: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    registerUser(dto: CreateUserDto): Promise<void>;
    confirmEmail(code: CodeDto): Promise<void>;
    resendConfirmationEmail(email: EmailDto): Promise<void>;
    requestPasswordRecovery(email: EmailDto): Promise<void>;
    confirmPasswordRecovery(dto: NewPasswordDto): Promise<boolean>;
}
