import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { BasicStrategy } from './basic.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { BasicAuthGuard } from './basic-auth.guard';
import { OptionalJwtAuthGuard } from './optinal-jwt-auth-guard';

@Global()
@Module({
  imports: [
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
  ],
  exports: [JwtAuthGuard, OptionalJwtAuthGuard, BasicAuthGuard, JwtModule],
})
export class GuardsModule {}
