import { JwtUser } from '../auth/types/jwt-user.type';
import { JwtRefreshTokenUser } from './types';

declare global {
  namespace Express {
    interface Request {
      user?: JwtUser;
      userFromCookie?: JwtRefreshTokenUser;
    }
  }
}
