import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
import { PostsController } from './posts/api/sa-posts.controller';
import { PostsPublicController } from './posts/api/public-posts.controller';
import { BlogsPublicController } from './blogs/api/public-blogs.controller';
import { BlogsController } from './blogs/api/sa-blogs.controller';

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
  controllers: [
    BlogsController,
    BlogsPublicController,
    PostsController,
    PostsPublicController,
    CommentsController,
  ],
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
