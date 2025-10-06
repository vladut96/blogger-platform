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
exports.BlogsPublicController = void 0;
const common_1 = require("@nestjs/common");
const blogs_service_1 = require("../application/blogs.service");
const query_blogs_dto_1 = require("../dto/query-blogs.dto");
const pagination_dto_1 = require("../../../../core/dto/pagination.dto");
const posts_service_1 = require("../../posts/application/posts.service");
const optinal_jwt_auth_guard_1 = require("../../../../core/guards/optinal-jwt-auth-guard");
const currentUser_JWT_1 = require("../../../../core/decorators/currentUser-JWT");
let BlogsPublicController = class BlogsPublicController {
    constructor(blogsService, blogsQueryService, postsQueryService) {
        this.blogsService = blogsService;
        this.blogsQueryService = blogsQueryService;
        this.postsQueryService = postsQueryService;
    }
    async getBlogs(query) {
        return await this.blogsQueryService.getBlogs(query);
    }
    async getPostsByBlogId(blogId, query, user) {
        return this.postsQueryService.getPostsByBlogId(blogId, query, user?.userId);
    }
    async getBlogById(id) {
        return await this.blogsQueryService.getBlogById(id);
    }
};
exports.BlogsPublicController = BlogsPublicController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_blogs_dto_1.QueryBlogsDto]),
    __metadata("design:returntype", Promise)
], BlogsPublicController.prototype, "getBlogs", null);
__decorate([
    (0, common_1.UseGuards)(optinal_jwt_auth_guard_1.OptionalJwtAuthGuard),
    (0, common_1.Get)(':blogId/posts'),
    __param(0, (0, common_1.Param)('blogId')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, currentUser_JWT_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_dto_1.PaginationDto, Object]),
    __metadata("design:returntype", Promise)
], BlogsPublicController.prototype, "getPostsByBlogId", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogsPublicController.prototype, "getBlogById", null);
exports.BlogsPublicController = BlogsPublicController = __decorate([
    (0, common_1.Controller)('blogs'),
    __metadata("design:paramtypes", [blogs_service_1.BlogsService,
        blogs_service_1.BlogsQueryService,
        posts_service_1.PostsQueryService])
], BlogsPublicController);
//# sourceMappingURL=public-blogs.controller.js.map