import { PostsQueryRepository, PostsRepository } from '../infrastructure/repositories/posts.repository';
import { BlogsQueryRepository } from '../../blogs/infrastructure/repositories/blogs.repository';
import { PostInputModel, Paginator, PostViewModel, PaginationQuery, LikeStatus } from '../../../../core/types/types';
import { PaginationDto } from '../../../../core/dto/pagination.dto';
import { CreateOrUpdatePostDto } from '../dto/create-or-update-post.dto';
export declare class PostsService {
    private readonly postsRepository;
    private readonly blogsQueryRepository;
    constructor(postsRepository: PostsRepository, blogsQueryRepository: BlogsQueryRepository);
    createPost(postPayload: CreateOrUpdatePostDto): Promise<PostViewModel>;
    updatePost(id: string, updateData: PostInputModel): Promise<void>;
    deletePostById(postId: string): Promise<void>;
    setPostLikeStatus(postId: string, userId: string, userLogin: string, likeStatus: LikeStatus): Promise<void>;
}
export declare class PostsQueryService {
    private readonly postsQueryRepository;
    constructor(postsQueryRepository: PostsQueryRepository);
    getPosts(query: PaginationDto, currentUserId?: string): Promise<Paginator<PostViewModel>>;
    getPostById(id: string, currentUserId?: string): Promise<PostViewModel | null>;
    getPostsByBlogId(blogId: string, query: PaginationQuery, currentUserId?: string): Promise<Paginator<PostViewModel>>;
}
