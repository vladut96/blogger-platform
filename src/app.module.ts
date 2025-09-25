import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/user-accounts/users/users.module';
import { BloggersPlatformModule } from './modules/bloggers-platform/bloggers-platform.module';
import { ConfigModule } from '@nestjs/config';
import { TestingModule } from './modules/delete-all-testing/testing.module';
import { AuthModule } from './modules/user-accounts/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL!),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 30_000,
          limit: 5,
        },
      ],
    }),
    UsersModule,
    BloggersPlatformModule,
    AuthModule,
    TestingModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
