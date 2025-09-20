import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestingController } from './testing.controller';
import {
  User,
  UserSchema,
} from '../user-accounts/users/infrastructure/schemas/user.schema';
import {
  Post,
  PostSchema,
} from '../bloggers-platform/posts/infrastructure/schemas/posts.schema';
import {
  Blog,
  BlogSchema,
} from '../bloggers-platform/blogs/infrastructure/schemas/blogs.schema';
import {
  Comment,
  CommentSchema,
} from '../bloggers-platform/comments/infrastructure/schemas/comments.schema';
import {
  DeviceSession,
  DeviceSessionSchema,
} from '../user-accounts/auth/infrastracture/schemas/auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
      { name: Blog.name, schema: BlogSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: DeviceSession.name, schema: DeviceSessionSchema },
    ]),
  ],
  controllers: [TestingController],
  providers: [],
})
export class TestingModule {}
