import { Controller, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user-accounts/users/infrastructure/schemas/user.schema';
import { Post } from '../bloggers-platform/posts/infrastructure/schemas/posts.schema';
import { Blog } from '../bloggers-platform/blogs/infrastructure/schemas/blogs.schema';
import { Model } from 'mongoose';
import {
  Comment,
  CommentDocument,
} from '../bloggers-platform/comments/infrastructure/schemas/comments.schema';
import {
  DeviceSession,
  DeviceSessionDocument,
} from '../user-accounts/auth/infrastracture/schemas/auth.schema';

@Controller('/testing')
export class TestingController {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>,
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    @InjectModel(DeviceSession.name)
    private deviceSession: Model<DeviceSessionDocument>,
  ) {}

  @Delete('all-data')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAll() {
    await this.userModel.deleteMany({});
    await this.postModel.deleteMany({});
    await this.blogModel.deleteMany({});
    await this.commentModel.deleteMany();
    await this.deviceSession.deleteMany();
  }
}
