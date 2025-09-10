import { User } from '../user-accounts/infrastructure/schemas/user.schema';
import { Post } from '../bloggers-platform/posts/infrastructure/schemas/posts.schema';
import { Blog } from '../bloggers-platform/blogs/infrastructure/schemas/blogs.schema';
import { Model } from 'mongoose';
import { CommentDocument } from '../bloggers-platform/comments/infrastructure/schemas/comments.schema';
export declare class TestingController {
    private readonly userModel;
    private readonly postModel;
    private readonly blogModel;
    private readonly commentModel;
    constructor(userModel: Model<User>, postModel: Model<Post>, blogModel: Model<Blog>, commentModel: Model<CommentDocument>);
    deleteAll(): Promise<void>;
}
