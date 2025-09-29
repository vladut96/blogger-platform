import { Model, Connection } from 'mongoose';
import { PostEntity } from '../../domain/posts.entity';
import { LikeStatus, PaginationQuery, PostPersistence, NewestLike } from '../../../../../core/types/types';
import { PostDocument } from '../schemas/posts.schema';
import { PostReactionDocument } from '../schemas/post-reaction.schema';
import { PaginationDto } from '../../../../../core/dto/pagination.dto';
export declare class PostsRepository {
    private readonly postModel;
    private readonly postReactionModel;
    private readonly connection;
    constructor(postModel: Model<PostDocument>, postReactionModel: Model<PostReactionDocument>, connection: Connection);
    getById(id: string): Promise<PostEntity | null>;
    save(entity: PostEntity): Promise<PostEntity>;
    deletePostById(id: string): Promise<boolean>;
    deletePostByBlogAndPostId(blogId: string, postId: string): Promise<boolean>;
    setPostLikeStatus(postId: string, userId: string, userLogin: string, likeStatus: LikeStatus): Promise<'OK' | 'NOT_FOUND'>;
}
export declare class PostsQueryRepository {
    private readonly postModel;
    private readonly postReactionModel;
    constructor(postModel: Model<PostDocument>, postReactionModel: Model<PostReactionDocument>);
    getPostById(id: string): Promise<PostPersistence | null>;
    getPosts(params: PaginationDto): Promise<{
        items: PostPersistence[];
        totalCount: number;
    }>;
    getPostsByBlogId(blogId: string, params: PaginationQuery): Promise<{
        items: PostPersistence[];
        totalCount: number;
    }>;
    listNewestLikes(postIds: string[], limit?: number): Promise<Map<string, NewestLike[]>>;
    listMyStatuses(postIds: string[], userId?: string): Promise<Map<string, LikeStatus>>;
}
