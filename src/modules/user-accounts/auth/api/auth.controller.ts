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
import { JwtUser } from '../../../../core/types/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
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
    return await this.authService.requestPasswordRecovery(dto);
  }
  @Post('new-password')
  async setNewPassword(@Body() dto: NewPasswordDto) {
    return await this.authService.confirmPasswordRecovery(dto);
  }
  @Post('registration-confirmation')
  @HttpCode(HttpStatus.NO_CONTENT)
  async confirmEmail(@Body() code: string) {
    return await this.authService.confirmEmail(code);
  }
  @Post('registration')
  @HttpCode(HttpStatus.NO_CONTENT)
  async registerUser(@Body() dto: CreateUserDto) {
    return await this.authService.registerUser(dto);
  }
  @Post('registration-email-resending')
  @HttpCode(HttpStatus.NO_CONTENT)
  async resendConfirmationEmail(@Body() dto: EmailDto) {
    return await this.authService.resendConfirmationEmail(dto);
  }

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
