import {
  Body,
  Controller,
  Headers,
  Get,
  Ip,
  Post,
  Res,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UAParser } from 'ua-parser-js';
import { Response } from 'express';
import { AuthService } from '../application/auth.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { EmailDto } from '../../../../core/dto/email.dto';
import { NewPasswordDto } from '../dto/new-password.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { CurrentUser } from '../../../../core/decorators/currentUser-JWT';
import { JwtRefreshTokenUser, JwtUser } from '../../../../core/types/types';
import { CodeDto } from '../dto/confirmation-code.dto';
import { JwtRefreshGuard } from '../../../../core/guards/jwt-refresh.guard';
import { SkipThrottle, ThrottlerGuard } from '@nestjs/throttler';

@Controller('auth')
@UseGuards(ThrottlerGuard)
//@Throttle({ default: { limit: 5, ttl: 10000 } })
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const parser = new UAParser(userAgent);
    const deviceType = parser.getDevice().type || 'desktop';
    const browser = parser.getBrowser().name || 'Unknown Browser';
    const os = parser.getOS().name || 'Unknown OS';

    const deviceName = `${browser} on ${os} (${deviceType})`;

    const authResult = await this.authService.authenticateUser(
      dto.loginOrEmail,
      dto.password,
      deviceName,
      ip,
    );

    res.cookie('refreshToken', authResult.refreshToken, {
      httpOnly: true,
      secure: true,
    });

    return { accessToken: authResult.accessToken };
  }
  @Post('password-recovery')
  @HttpCode(HttpStatus.NO_CONTENT)
  async requestPasswordRecovery(@Body() dto: EmailDto) {
    return await this.authService.requestPasswordRecovery(dto.email);
  }
  @Post('new-password')
  async setNewPassword(@Body() dto: NewPasswordDto) {
    return await this.authService.confirmPasswordRecovery(dto);
  }
  @SkipThrottle()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async getRefreshTokenPair(
    @CurrentUser() user: JwtRefreshTokenUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.getRefreshTokenPair(
      user.userId,
      user.deviceId,
    );
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
    });

    return { accessToken: tokens.accessToken };
  }
  @SkipThrottle()
  @UseGuards(JwtRefreshGuard)
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@CurrentUser() user: JwtRefreshTokenUser) {
    await this.authService.deleteDeviceSession(user.userId, user.deviceId);
    return;
  }

  @Post('registration-confirmation')
  @HttpCode(HttpStatus.NO_CONTENT)
  async confirmEmail(@Body() dto: CodeDto) {
    return await this.authService.confirmEmail(dto.code);
  }
  @Post('registration')
  @HttpCode(HttpStatus.NO_CONTENT)
  async registerUser(@Body() dto: CreateUserDto) {
    await this.authService.registerUser(dto);
  }

  @Post('registration-email-resending')
  @HttpCode(HttpStatus.NO_CONTENT)
  async resendConfirmationEmail(@Body() dto: EmailDto) {
    return await this.authService.resendConfirmationEmail(dto.email);
  }

  @SkipThrottle()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMyInfo(@CurrentUser() user: JwtUser) {
    return {
      email: user.email,
      login: user.login,
      userId: user.userId,
    };
  }
}
