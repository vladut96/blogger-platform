"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const inversify_1 = require("inversify");
const comments_repository_1 = require("../infrastructure/repositories/comments.repository");
const common_1 = require("@nestjs/common");
let CommentsService = class CommentsService {
    constructor(commentsRepository) {
        this.commentsRepository = commentsRepository;
    }
    async getCommentById(commentId, currentUserId) {
        const comment = await this.commentsRepository.getCommentById(commentId, currentUserId);
        if (!comment)
            throw new common_1.NotFoundException();
        return comment;
    }
    async updateComment(commentId, content, userId) {
        const comment = await this.commentsRepository.getCommentById(commentId, userId);
        if (!comment) {
            return { success: false, error: 'Comment not found' };
        }
        if (comment.commentatorInfo.userId !== userId) {
            return { success: false, error: 'Access denied' };
        }
        const updated = await this.commentsRepository.updateComment(commentId, content);
        if (!updated) {
            return { success: false, error: 'Error updating comment' };
        }
        return { success: true };
    }
    async deleteComment(commentId, userId) {
        const comment = await this.commentsRepository.getCommentById(commentId);
        if (!comment) {
            return { success: false, error: 'Comment not found' };
        }
        if (comment.commentatorInfo.userId !== userId) {
            return { success: false, error: 'Access denied' };
        }
        const deleted = await this.commentsRepository.deleteComment(commentId);
        if (!deleted) {
            return { success: false, error: 'Error deleting comment' };
        }
        return { success: true };
    }
    async getCommentsByPostId({ postId, pageNumber, pageSize, sortBy, sortDirection, currentUserId, }) {
        return await this.commentsRepository.getCommentsByPostId({
            postId,
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            currentUserId,
        });
    }
    async createComment(postId, content, userId, userLogin) {
        return await this.commentsRepository.createComment(postId, content, userId, userLogin);
    }
    async updateLikeStatus(commentId, userId, likeStatus) {
        const updated = await this.commentsRepository.updateLikeStatus(commentId, userId, likeStatus);
        if (!updated) {
            return { success: false };
        }
        return { success: true };
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [comments_repository_1.CommentsRepository])
], CommentsService);
//# sourceMappingURL=comments.service.js.map