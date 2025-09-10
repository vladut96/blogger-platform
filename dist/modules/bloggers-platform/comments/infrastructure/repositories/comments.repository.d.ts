import { Model } from 'mongoose';
import { CommentViewModel, LikeStatus } from '../../../../../core/types/types';
import { CommentDocument } from '../schemas/comments.schema';
export declare class CommentsRepository {
    private readonly commentModel;
    constructor(commentModel: Model<CommentDocument>);
    getCommentById(commentId: string, currentUserId?: string): Promise<CommentViewModel | null>;
    updateComment(commentId: string, content: string): Promise<boolean>;
    deleteComment(commentId: string): Promise<boolean>;
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
    updateLikeStatus(commentId: string, userId: string, likeStatus: LikeStatus): Promise<boolean>;
}
