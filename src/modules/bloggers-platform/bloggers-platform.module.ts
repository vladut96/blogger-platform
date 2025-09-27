import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogsController } from './blogs/api/blogs.controller';
import { PostsController } from './posts/api/posts.controller';
import {
  BlogsQueryService,
  BlogsService,
} from './blogs/application/blogs.service';
import {
  BlogsQueryRepository,
  BlogsRepository,
} from './blogs/infrastructure/repositories/blogs.repository';
import {
  PostsQueryService,
  PostsService,
} from './posts/application/posts.service';
import {
  PostsQueryRepository,
  PostsRepository,
} from './posts/infrastructure/repositories/posts.repository';
import { UsersModule } from '../user-accounts/users/users.module';
import { Blog, BlogSchema } from './blogs/infrastructure/schemas/blogs.schema';
import { Post, PostSchema } from './posts/infrastructure/schemas/posts.schema';
import {
  PostReaction,
  PostReactionSchema,
} from './posts/infrastructure/schemas/post-reaction.schema';
import {
  Comment,
  CommentSchema,
} from './comments/infrastructure/schemas/comments.schema';
import { CommentsController } from './comments/api/comments.controller';
import { CommentsService } from './comments/application/comments.service';
import { CommentsRepository } from './comments/infrastructure/repositories/comments.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: Post.name, schema: PostSchema },
      { name: PostReaction.name, schema: PostReactionSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
  ],
  controllers: [BlogsController, PostsController, CommentsController],
  providers: [
    BlogsService,
    BlogsQueryService,
    BlogsRepository,
    BlogsQueryRepository,
    PostsService,
    PostsQueryService,
    PostsRepository,
    PostsQueryRepository,
    CommentsService,
    CommentsRepository,
  ],
  exports: [],
})
export class BloggersPlatformModule {}
