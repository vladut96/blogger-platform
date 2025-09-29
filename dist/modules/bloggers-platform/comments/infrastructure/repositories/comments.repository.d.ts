import { Model } from 'mongoose';
import { CommentViewModel, LikeStatus } from '../../../../../core/types/types';
import { CommentDocument } from '../schemas/comments.schema';
export declare class CommentsRepository {
    private readonly commentModel;
    constructor(commentModel: Model<CommentDocument>);
    getCommentById(commentId: string, currentUserId?: string): Promise<CommentViewModel | null>;
    getCommentDocumentById(commentId: string): Promise<CommentDocument | null>;
    updateComment(commentId: string, content: string): Promise<boolean>;
    deleteComment(commentId: string): Promise<void>;
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
    } | null>;
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
    updateLikeStatus(comment: CommentDocument, userId: string, likeStatus: LikeStatus): Promise<void>;
}
