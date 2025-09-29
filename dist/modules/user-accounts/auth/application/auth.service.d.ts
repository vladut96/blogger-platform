import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UsersService } from '../../users/application/users.service';
import { NewPasswordDto } from '../dto/new-password.dto';
import { SecurityDevicesService } from './security-devices.service';
export declare class AuthService {
    private readonly usersService;
    private readonly securityDevicesService;
    constructor(usersService: UsersService, securityDevicesService: SecurityDevicesService);
    getRefreshTokenPair(userId: string, deviceId: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    deleteDeviceSession(userId: string, deviceId: string): Promise<void>;
    authenticateUser(loginOrEmail: string, password: string, deviceName: string, ip: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    registerUser(dto: CreateUserDto): Promise<void>;
    confirmEmail(code: string): Promise<void>;
    resendConfirmationEmail(email: string): Promise<void>;
    requestPasswordRecovery(email: string): Promise<void>;
    confirmPasswordRecovery(dto: NewPasswordDto): Promise<boolean>;
}
