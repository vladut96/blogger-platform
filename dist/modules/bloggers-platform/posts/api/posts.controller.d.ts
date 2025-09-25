import { CreateOrUpdatePostDto } from '../dto/create-or-update-post.dto';
import { PostsQueryService, PostsService } from '../application/posts.service';
import { PaginationDto } from '../../../../core/dto/pagination.dto';
import { CommentsService } from '../../comments/application/comments.service';
import { QueryCommentsDto } from '../../comments/dto/query-comments.dto';
import { CreateCommentsDto } from '../../comments/dto/create-comments.dto';
import { JwtUser } from '../../../../core/types/types';
import { LikeStatusDto } from '../../comments/dto/like-status.dto';
export declare class PostsController {
    private readonly postsService;
    private readonly postsQueryService;
    private readonly commentService;
    constructor(postsService: PostsService, postsQueryService: PostsQueryService, commentService: CommentsService);
    setPostLikeStatus(postId: string, likeStatus: LikeStatusDto, user: JwtUser): Promise<void>;
    getCommentsForPost(postId: string, query: QueryCommentsDto): Promise<{
        pagesCount: number;
        page: number;
        pageSize: number;
        totalCount: number;
        items: {
            id: string;
            content: string;
            commentatorInfo: {
                userId: string;
                userLogin: string;
            };
            createdAt: string;
            likesInfo: {
                likesCount: number;
                dislikesCount: number;
                myStatus: "Like" | "Dislike" | "None";
            };
        }[];
    }>;
    createPostsComments(postId: string, content: CreateCommentsDto, user: JwtUser): Promise<{
        id: string;
        content: string;
        commentatorInfo: {
            userId: string;
            userLogin: string;
        };
        createdAt: string;
        likesInfo: {
            likesCount: number;
            dislikesCount: number;
            myStatus: string;
        };
    }>;
    getPosts(query: PaginationDto): Promise<import("../../../../core/types/types").Paginator<import("../../../../core/types/types").PostViewModel>>;
    createPost(dto: CreateOrUpdatePostDto): Promise<import("../../../../core/types/types").PostViewModel>;
    getPostById(id: string): Promise<import("../../../../core/types/types").PostViewModel | null>;
    updatePost(id: string, dto: CreateOrUpdatePostDto): Promise<void>;
    deletePostById(id: string): Promise<void>;
}
