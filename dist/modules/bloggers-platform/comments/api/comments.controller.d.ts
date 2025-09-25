import { CommentsService } from '../application/comments.service';
import { JwtUser } from '../../../../core/types/types';
import { LikeStatusDto } from '../dto/like-status.dto';
import { CreateCommentsDto } from '../dto/create-comments.dto';
export declare class CommentsController {
    private readonly commentService;
    constructor(commentService: CommentsService);
    updateLikeStatus(commentId: string, likeStatus: LikeStatusDto, user: JwtUser): Promise<void>;
    updateComment(commentId: string, content: CreateCommentsDto, user: JwtUser): Promise<void>;
    deleteComment(commentId: string, user: JwtUser): Promise<void>;
    getCommentById(id: string): Promise<import("../../../../core/types/types").CommentViewModel>;
}
