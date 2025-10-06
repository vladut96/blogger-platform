import { PostsQueryService, PostsService } from '../application/posts.service';
import { PaginationDto } from '../../../../core/dto/pagination.dto';
import { CommentsService } from '../../comments/application/comments.service';
import { QueryCommentsDto } from '../../comments/dto/query-comments.dto';
import { JwtUser } from '../../../../core/types/types';
import { CreateCommentsDto } from '../../comments/dto/create-comments.dto';
import { LikeStatusDto } from '../../comments/dto/like-status.dto';
export declare class PostsPublicController {
    private readonly postsQueryService;
    private readonly postsService;
    private readonly commentService;
    constructor(postsQueryService: PostsQueryService, postsService: PostsService, commentService: CommentsService);
    getCommentsForPost(postId: string, query: QueryCommentsDto, user?: JwtUser): Promise<{
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
    getPosts(query: PaginationDto, user?: JwtUser): Promise<import("../../../../core/types/types").Paginator<import("../../../../core/types/types").PostViewModel>>;
    getPostById(id: string, user?: JwtUser): Promise<import("../../../../core/types/types").PostViewModel | null>;
    createPostsComments(postId: string, dto: CreateCommentsDto, user: JwtUser): Promise<{
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
    setPostLikeStatus(postId: string, likeStatus: LikeStatusDto, user: JwtUser): Promise<void>;
}
