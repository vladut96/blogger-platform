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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const inversify_1 = require("inversify");
const comments_schema_1 = require("../schemas/comments.schema");
let CommentsRepository = class CommentsRepository {
    constructor(commentModel) {
        this.commentModel = commentModel;
    }
    async getCommentById(commentId, currentUserId) {
        const comment = await this.commentModel.findById(commentId).lean();
        if (!comment)
            return null;
        let myStatus = 'None';
        if (currentUserId) {
            const userLike = comment.likes.find((like) => like.userId === currentUserId);
            if (userLike) {
                myStatus = userLike.status;
            }
        }
        return {
            id: comment._id.toString(),
            content: comment.content,
            commentatorInfo: {
                userId: comment.commentatorInfo.userId,
                userLogin: comment.commentatorInfo.userLogin,
            },
            createdAt: comment.createdAt,
            likesInfo: {
                likesCount: comment.likesCount || 0,
                dislikesCount: comment.dislikesCount || 0,
                myStatus,
            },
        };
    }
    async getCommentDocumentById(commentId) {
        return this.commentModel.findById(commentId).exec();
    }
    async updateComment(commentId, content) {
        const result = await this.commentModel
            .updateOne({ _id: commentId }, { $set: { content } })
            .exec();
        return result.matchedCount > 0;
    }
    async deleteComment(commentId) {
        await this.commentModel.deleteOne({ _id: commentId }).exec();
    }
    async getCommentsByPostId({ postId, pageNumber, pageSize, sortBy, sortDirection, currentUserId, }) {
        const filter = { postId };
        const totalCount = await this.commentModel.countDocuments(filter);
        const comments = await this.commentModel
            .find(filter)
            .sort({ [sortBy]: sortDirection })
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .lean();
        return {
            pagesCount: Math.ceil(totalCount / pageSize),
            page: pageNumber,
            pageSize,
            totalCount,
            items: comments.map((comment) => {
                const likes = comment.likes || [];
                const likesCount = likes.filter((like) => like.status === 'Like').length;
                const dislikesCount = likes.filter((like) => like.status === 'Dislike').length;
                let myStatus = 'None';
                if (currentUserId) {
                    const userLike = likes.find((like) => like.userId === currentUserId);
                    if (userLike) {
                        myStatus = userLike.status;
                    }
                }
                return {
                    id: comment._id.toString(),
                    content: comment.content,
                    commentatorInfo: {
                        userId: comment.commentatorInfo.userId,
                        userLogin: comment.commentatorInfo.userLogin,
                    },
                    createdAt: comment.createdAt,
                    likesInfo: {
                        likesCount,
                        dislikesCount,
                        myStatus,
                    },
                };
            }),
        };
    }
    async createComment(postId, content, userId, userLogin) {
        const newComment = new this.commentModel({
            postId,
            content,
            commentatorInfo: {
                userId,
                userLogin,
            },
            createdAt: new Date().toISOString(),
            likes: [],
            likesCount: 0,
            dislikesCount: 0,
        });
        await newComment.save();
        return {
            id: newComment._id.toString(),
            content: newComment.content,
            commentatorInfo: {
                userId: newComment.commentatorInfo.userId,
                userLogin: newComment.commentatorInfo.userLogin,
            },
            createdAt: newComment.createdAt,
            likesInfo: {
                likesCount: newComment.likesCount,
                dislikesCount: newComment.dislikesCount,
                myStatus: 'None',
            },
        };
    }
    async updateLikeStatus(comment, userId, likeStatus) {
        const existingLikeIndex = comment.likes.findIndex((like) => like.userId === userId);
        if (existingLikeIndex !== -1) {
            const oldStatus = comment.likes[existingLikeIndex].status;
            if (oldStatus === 'Like')
                comment.likesCount--;
            if (oldStatus === 'Dislike')
                comment.dislikesCount--;
            comment.likes.splice(existingLikeIndex, 1);
        }
        if (likeStatus !== 'None') {
            comment.likes.push({
                userId,
                status: likeStatus,
                createdAt: new Date(),
            });
            if (likeStatus === 'Like')
                comment.likesCount++;
            if (likeStatus === 'Dislike')
                comment.dislikesCount++;
        }
        await comment.save();
    }
};
exports.CommentsRepository = CommentsRepository;
exports.CommentsRepository = CommentsRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comments_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CommentsRepository);
//# sourceMappingURL=comments.repository.js.map