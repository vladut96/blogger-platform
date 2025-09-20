import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }
  validate(username: string, password: string): Promise<any> {
    const validLogin = process.env.BASIC_AUTH_LOGIN || 'admin';
    const validPassword = process.env.BASIC_AUTH_PASSWORD || 'qwerty';
    if (username === validLogin && password === validPassword) {
      //empty
    }
    throw new UnauthorizedException();
  }
}
