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
exports.BlogsController = void 0;
const common_1 = require("@nestjs/common");
const blogs_service_1 = require("../application/blogs.service");
const query_blogs_dto_1 = require("../dto/query-blogs.dto");
const create_blog_dto_1 = require("../dto/create-blog.dto");
const pagination_dto_1 = require("../../../../core/dto/pagination.dto");
const posts_service_1 = require("../../posts/application/posts.service");
const create_or_update_post_dto_1 = require("../../posts/dto/create-or-update-post.dto");
const basic_auth_guard_1 = require("../../../../core/guards/basic-auth.guard");
let BlogsController = class BlogsController {
    constructor(blogsService, blogsQueryService, postsQueryService, postsService) {
        this.blogsService = blogsService;
        this.blogsQueryService = blogsQueryService;
        this.postsQueryService = postsQueryService;
        this.postsService = postsService;
    }
    async getBlogs(query) {
        return await this.blogsQueryService.getBlogs(query);
    }
    async createBlog(dto) {
        return await this.blogsService.createBlog(dto);
    }
    async getPostsByBlogId(blogId, query) {
        return this.postsQueryService.getPostsByBlogId(blogId, query);
    }
    async createPost(blogId, dto) {
        return await this.postsService.createPost({ ...dto, blogId });
    }
    async getBlogById(id) {
        return await this.blogsQueryService.getBlogById(id);
    }
    async updateBlog(id, dto) {
        return this.blogsService.updateBlog(id, dto);
    }
    async deleteBlog(id) {
        return this.blogsService.deleteBlogById(id);
    }
};
exports.BlogsController = BlogsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_blogs_dto_1.QueryBlogsDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getBlogs", null);
__decorate([
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_blog_dto_1.CreateBlogDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "createBlog", null);
__decorate([
    (0, common_1.Get)(':blogId/posts'),
    __param(0, (0, common_1.Param)('blogId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getPostsByBlogId", null);
__decorate([
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.Post)(':blogId/posts'),
    __param(0, (0, common_1.Param)('blogId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_or_update_post_dto_1.CreatePostDtoWithIdParam]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getBlogById", null);
__decorate([
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_blog_dto_1.CreateBlogDto]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "updateBlog", null);
__decorate([
    (0, common_1.UseGuards)(basic_auth_guard_1.BasicAuthGuard),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "deleteBlog", null);
exports.BlogsController = BlogsController = __decorate([
    (0, common_1.Controller)('blogs'),
    __metadata("design:paramtypes", [blogs_service_1.BlogsService,
        blogs_service_1.BlogsQueryService,
        posts_service_1.PostsQueryService,
        posts_service_1.PostsService])
], BlogsController);
//# sourceMappingURL=blogs.controller.js.map