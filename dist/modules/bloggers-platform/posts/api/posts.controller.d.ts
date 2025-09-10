import { CreateOrUpdatePostDto } from '../dto/create-or-update-post.dto';
import { PostsQueryService, PostsService } from '../application/posts.service';
import { PaginationDto } from '../../../../core/dto/pagination.dto';
export declare class PostsController {
    private readonly postsService;
    private readonly postsQueryService;
    constructor(postsService: PostsService, postsQueryService: PostsQueryService);
    getPosts(query: PaginationDto): Promise<import("../../../../core/types/types").Paginator<import("../../../../core/types/types").PostViewModel>>;
    getPostById(id: string): Promise<import("../../../../core/types/types").PostViewModel | null>;
    createPost(dto: CreateOrUpdatePostDto): Promise<import("../../../../core/types/types").PostViewModel>;
    updatePost(id: string, dto: CreateOrUpdatePostDto): Promise<void>;
    deletePostById(id: string): Promise<void>;
}
