import { nodemailerService } from '../../../../core/utils/nodemailerService';
import { injectable } from 'inversify';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UsersService } from '../../users/application/users.service';
import { UserDocument } from '../../users/infrastructure/schemas/user.schema';
import { EmailConfirmationFactory } from '../../users/infrastructure/email-confirmation-code-generator';
import { ValidationException } from '../../../../core/exceptions/custom-validation.exception';
import { createFieldError } from '../../../../core/utils/createFieldError';
import { randomUUID } from 'crypto';
import {
  comparePasswords,
  hashPassword,
} from '../../users/infrastructure/passwordUtils';
import { NewPasswordDto } from '../dto/new-password.dto';
import { UnauthorizedException } from '@nestjs/common';
import { generateTokens } from '../../../../core/utils/generateTokens';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthRepository } from '../infrastracture/repositories/auth.repository';

@injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly authRepository: AuthRepository,
  ) {}
  async authenticateUser(
    loginOrEmail: string,
    password: string,
    deviceName: string,
    ip: string,
  ) {
    const user = await this.usersService.getUserByLoginOrEmail(loginOrEmail);
    if (!user || !(await comparePasswords(password, user.passwordHash))) {
      throw new UnauthorizedException(
        createFieldError('Invalid login or password', 'loginOrEmail'),
      );
    }

    const deviceId = randomUUID();
    const { accessToken, refreshToken } = generateTokens(user, deviceId);
    const refreshDecode = jwt.decode(refreshToken) as JwtPayload;

    await this.authRepository.createDeviceSession({
      userId: user._id.toString(),
      deviceId,
      lastActiveDate: new Date(refreshDecode.iat! * 1000).toISOString(),
      title: deviceName,
      ip,
      exp: new Date(refreshDecode.exp! * 1000).toISOString(),
    });

    return { accessToken, refreshToken };
  }
  async registerUser(dto: CreateUserDto): Promise<void> {
    const existingUser = await this.usersService.getUserByLoginOrEmail(
      dto.email,
      dto.login,
    );
    if (existingUser)
      throw new ValidationException(
        createFieldError('User already exists', 'user'),
      );

    const newUser: UserDocument = await this.usersService.registerUser(dto);

    await nodemailerService.sendEmail(
      dto.email,
      newUser.emailConfirmation.confirmationCode!,
      nodemailerService.emailTemplates.registrationEmail,
    );
  }
  async confirmEmail(code: string): Promise<void> {
    const user = await this.usersService.findUserByConfirmationCode(code);
    if (
      !user ||
      user.emailConfirmation.isConfirmed ||
      new Date() > user.emailConfirmation.expirationDate!
    ) {
      throw new ValidationException(
        createFieldError(
          'email',
          'The confirmation code is incorrect, expired or already been applied',
        ),
      );
    }
    return this.usersService.updateConfirmationStatus(user.email, true);
  }
  async resendConfirmationEmail(email: string) {
    const user = await this.usersService.getUserByLoginOrEmail(email);
    if (!user || user.emailConfirmation.isConfirmed)
      throw new ValidationException(
        createFieldError(
          'The confirmation code is incorrect, expired or already been applied',
          'user',
        ),
      );

    const newConfirmation = EmailConfirmationFactory.create();

    const updated = await this.usersService.updateConfirmationCode(
      email,
      newConfirmation.confirmationCode!,
      newConfirmation.expirationDate!,
    );

    if (!updated)
      throw new ValidationException(
        createFieldError(
          'The confirmation code is incorrect, expired or already been applied',
          'user',
        ),
      );

    //no check is email was sent
    void nodemailerService.sendEmail(
      email,
      newConfirmation.confirmationCode!,
      nodemailerService.emailTemplates.registrationEmail,
    );
  }
  async requestPasswordRecovery(email: string): Promise<void> {
    const user = await this.usersService.getUserByLoginOrEmail(email);
    if (!user) return;

    const recoveryCode = randomUUID();
    const expirationDate = new Date(Date.now() + 3600000);

    const updated = await this.usersService.setPasswordRecoveryCode({
      email,
      recoveryCode,
      expirationDate,
    });

    if (updated)
      await nodemailerService.sendEmail(
        email,
        recoveryCode,
        nodemailerService.emailTemplates.passwordRecoveryEmail,
      );
  }
  async confirmPasswordRecovery(dto: NewPasswordDto): Promise<boolean> {
    const user = await this.usersService.findUserByRecoveryCode(
      dto.recoveryCode,
    );
    if (
      !user ||
      !user.passwordRecovery ||
      new Date() > user.passwordRecovery.expirationDate!
    ) {
      return false;
    }

    const passwordHash = await hashPassword(dto.newPassword);
    return this.usersService.updateUserPassword(user.email, passwordHash);
  }
}
