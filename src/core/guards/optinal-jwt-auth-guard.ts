import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtUser, MeViewModel } from '../types/types';

interface JwtServiceTyped {
  verifyAsync<T>(token: string, options?: any): Promise<T>;
}

@Injectable()
export class OptionalJwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: JwtUser }>();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      request.user = undefined;
      return true;
    }
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      request.user = undefined;
      return true;
    }

    try {
      const jwtService = this.jwtService as unknown as JwtServiceTyped;
      const payload = await jwtService.verifyAsync<MeViewModel>(token, {
        secret: process.env.JWT_SECRET || '123',
      });

      request.user = {
        userId: payload.userId,
        login: payload.login,
        email: payload.email,
      };
    } catch {
      request.user = undefined;
    }

    return true;
  }
}
