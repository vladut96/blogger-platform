import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { JwtRefreshTokenUser } from '../types/types';

interface RequestWithCookies extends Request {
  cookies: Record<string, unknown>;
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: RequestWithCookies) => {
          const refreshToken = req?.cookies?.refreshToken;
          if (typeof refreshToken === 'string') {
            return refreshToken;
          }
          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET || 'refreshSecret123',
      passReqToCallback: true,
    });
  }

  async validate(req: RequestWithCookies, payload: JwtRefreshTokenUser) {
    if (!payload || !payload.userId || !payload.deviceId) {
      throw new UnauthorizedException();
    }

    return {
      userId: payload.userId,
      deviceId: payload.deviceId,
    };
  }
}
