import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/user-accounts/users/users.module';
import { BloggersPlatformModule } from './modules/bloggers-platform/bloggers-platform.module';
import { ConfigModule } from '@nestjs/config';
import { TestingModule } from './modules/delete-all-testing/testing.module';
import { AuthModule } from './modules/user-accounts/auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL!),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 10,
          limit: 5,
        },
      ],
    }),
    UsersModule,
    BloggersPlatformModule,
    AuthModule,
    TestingModule,
  ],
})
export class AppModule {}
