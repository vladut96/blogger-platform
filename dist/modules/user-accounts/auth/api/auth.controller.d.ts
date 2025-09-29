import { Response } from 'express';
import { AuthService } from '../application/auth.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { EmailDto } from '../../../../core/dto/email.dto';
import { NewPasswordDto } from '../dto/new-password.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtRefreshTokenUser, JwtUser } from '../../../../core/types/types';
import { CodeDto } from '../dto/confirmation-code.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto, ip: string, userAgent: string, res: Response): Promise<{
        accessToken: string;
    }>;
    requestPasswordRecovery(dto: EmailDto): Promise<void>;
    setNewPassword(dto: NewPasswordDto): Promise<boolean>;
    getRefreshTokenPair(user: JwtRefreshTokenUser, res: Response): Promise<{
        accessToken: string;
    }>;
    logout(user: JwtRefreshTokenUser): Promise<void>;
    confirmEmail(dto: CodeDto): Promise<void>;
    registerUser(dto: CreateUserDto): Promise<void>;
    resendConfirmationEmail(dto: EmailDto): Promise<void>;
    getMyInfo(user: JwtUser): {
        email: string;
        login: string;
        userId: string;
    };
}
