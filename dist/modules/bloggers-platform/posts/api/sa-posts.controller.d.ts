import { CreateOrUpdatePostDto } from '../dto/create-or-update-post.dto';
import { PostsService } from '../application/posts.service';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    createPost(dto: CreateOrUpdatePostDto): Promise<import("../../../../core/types/types").PostViewModel>;
    updatePost(id: string, dto: CreateOrUpdatePostDto): Promise<void>;
    deletePostById(id: string): Promise<void>;
}
