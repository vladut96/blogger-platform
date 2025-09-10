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
exports.BlogsService = exports.BlogsQueryService = void 0;
const inversify_1 = require("inversify");
const blogs_entity_1 = require("../domain/blogs.entity");
const blogs_repository_1 = require("../infrastructure/repositories/blogs.repository");
const common_1 = require("@nestjs/common");
let BlogsQueryService = class BlogsQueryService {
    constructor(blogsQueryRepository) {
        this.blogsQueryRepository = blogsQueryRepository;
    }
    async getBlogs(query) {
        return this.blogsQueryRepository.getBlogs(query);
    }
    async getBlogById(blogID) {
        const blog = await this.blogsQueryRepository.getBlogById(blogID);
        if (!blog)
            throw new common_1.NotFoundException();
        return blog;
    }
};
exports.BlogsQueryService = BlogsQueryService;
exports.BlogsQueryService = BlogsQueryService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [blogs_repository_1.BlogsQueryRepository])
], BlogsQueryService);
let BlogsService = class BlogsService {
    constructor(blogsRepository) {
        this.blogsRepository = blogsRepository;
    }
    async createBlog(dto) {
        const entity = blogs_entity_1.BlogsEntity.create(dto);
        const saved = await this.blogsRepository.save(entity);
        return saved.toViewModel();
    }
    async updateBlog(id, updateData) {
        const entity = await this.blogsRepository.getById(id);
        if (!entity)
            throw new common_1.NotFoundException();
        entity.update(updateData);
        await this.blogsRepository.save(entity);
    }
    async deleteBlogById(id) {
        const deletedBlog = await this.blogsRepository.deleteBlogById(id);
        if (!deletedBlog)
            throw new common_1.NotFoundException();
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [blogs_repository_1.BlogsRepository])
], BlogsService);
//# sourceMappingURL=blogs.service.js.map