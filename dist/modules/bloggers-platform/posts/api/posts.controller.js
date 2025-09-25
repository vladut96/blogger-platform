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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const create_or_update_post_dto_1 = require("../dto/create-or-update-post.dto");
const posts_service_1 = require("../application/posts.service");
const pagination_dto_1 = require("../../../../core/dto/pagination.dto");
const comments_service_1 = require("../../comments/application/comments.service");
const query_comments_dto_1 = require("../../comments/dto/query-comments.dto");
const create_comments_dto_1 = require("../../comments/dto/create-comments.dto");
const jwt_auth_guard_1 = require("../../../../core/guards/jwt-auth.guard");
const currentUser_JWT_1 = require("../../../../core/decorators/currentUser-JWT");
const like_status_dto_1 = require("../../comments/dto/like-status.dto");
let PostsController = class PostsController {
    constructor(postsService, postsQueryService, commentService) {
        this.postsService = postsService;
        this.postsQueryService = postsQueryService;
        this.commentService = commentService;
    }
    async setPostLikeStatus(postId, likeStatus, user) {
        return this.postsService.setPostLikeStatus(postId, user.userId, user.login, likeStatus.likeStatus);
    }
    getCommentsForPost(postId, query) {
        return this.commentService.getCommentsByPostId({ ...query, postId });
    }
    async createPostsComments(postId, content, user) {
        return this.commentService.createComment(postId, content.content, user.userId, user.login);
    }
    getPosts(query) {
        return this.postsQueryService.getPosts(query);
    }
    async createPost(dto) {
        return this.postsService.createPost(dto);
    }
    async getPostById(id) {
        return this.postsQueryService.getPostById(id);
    }
    async updatePost(id, dto) {
        return this.postsService.updatePost(id, dto);
    }
    async deletePostById(id) {
        return this.postsService.deletePostById(id);
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':postId/like-status'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, currentUser_JWT_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, like_status_dto_1.LikeStatusDto, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "setPostLikeStatus", null);
__decorate([
    (0, common_1.Get)(':postId/comments'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, query_comments_dto_1.QueryCommentsDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getCommentsForPost", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':postId/comments'),
    __param(0, (0, common_1.Param)('postId')),
    __param(1, (0, common_1.Body)('content')),
    __param(2, (0, currentUser_JWT_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_comments_dto_1.CreateCommentsDto, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "createPostsComments", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getPosts", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_or_update_post_dto_1.CreateOrUpdatePostDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPostById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_or_update_post_dto_1.CreateOrUpdatePostDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updatePost", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deletePostById", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [posts_service_1.PostsService,
        posts_service_1.PostsQueryService,
        comments_service_1.CommentsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map