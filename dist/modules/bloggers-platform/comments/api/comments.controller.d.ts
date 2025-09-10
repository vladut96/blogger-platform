import { CommentsService } from '../application/comments.service';
export declare class CommentsController {
    private readonly commentService;
    constructor(commentService: CommentsService);
    getCommentById(id: string): Promise<import("../../../../core/types/types").CommentViewModel>;
}
