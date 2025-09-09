import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/user-accounts/users.module';
import { BloggersPlatformModule } from './modules/bloggers-platform/bloggers-platform.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@learning.7fe0l.mongodb.net/my-database?retryWrites=true&w=majority&appName=Learning',
    ),
    UsersModule,
    BloggersPlatformModule,
  ],
})
export class AppModule {}
