import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { BasicStrategy } from './basic.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { BasicAuthGuard } from './basic-auth.guard';
import { OptionalJwtAuthGuard } from './optinal-jwt-auth-guard';
import { JwtRefreshGuard } from './jwt-refresh.guard';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { AuthModule } from '../../modules/user-accounts/auth/auth.module';

@Global()
@Module({
  imports: [
    AuthModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret123',
    }),
  ],
  providers: [
    JwtStrategy,
    BasicStrategy,
    JwtAuthGuard,
    OptionalJwtAuthGuard,
    BasicAuthGuard,
    JwtRefreshGuard,
    JwtRefreshStrategy,
  ],
  exports: [
    JwtAuthGuard,
    OptionalJwtAuthGuard,
    BasicAuthGuard,
    JwtModule,
    JwtRefreshGuard,
    JwtRefreshStrategy,
  ],
})
export class GuardsModule {}
