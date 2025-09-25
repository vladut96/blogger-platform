import { LikeStatus, CommentViewModel } from '../../../../core/types/types';
import { CommentsRepository } from '../infrastructure/repositories/comments.repository';
export declare class CommentsService {
    private readonly commentsRepository;
    constructor(commentsRepository: CommentsRepository);
    getCommentById(commentId: string, currentUserId?: string): Promise<CommentViewModel>;
    updateComment(commentId: string, content: string, userId: string): Promise<void>;
    deleteComment(commentId: string, userId: string): Promise<void>;
    getCommentsByPostId({ postId, pageNumber, pageSize, sortBy, sortDirection, currentUserId, }: {
        postId: string;
        pageNumber: number;
        pageSize: number;
        sortBy: string;
        sortDirection: 1 | -1;
        currentUserId?: string;
    }): Promise<{
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
    createComment(postId: string, content: string, userId: string, userLogin: string): Promise<{
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
    updateLikeStatus(commentId: string, userId: string, likeStatus: LikeStatus): Promise<void>;
}
