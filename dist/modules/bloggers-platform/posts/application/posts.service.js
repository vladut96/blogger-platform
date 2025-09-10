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
exports.PostsQueryService = exports.PostsService = void 0;
const inversify_1 = require("inversify");
const posts_repository_1 = require("../infrastructure/repositories/posts.repository");
const blogs_repository_1 = require("../../blogs/infrastructure/repositories/blogs.repository");
const posts_entity_1 = require("../domain/posts.entity");
const buildPaginator_1 = require("../../../../core/utils/buildPaginator");
const common_1 = require("@nestjs/common");
let PostsService = class PostsService {
    constructor(postsRepository, blogsQueryRepository) {
        this.postsRepository = postsRepository;
        this.blogsQueryRepository = blogsQueryRepository;
    }
    async createPost(postPayload) {
        const { title, shortDescription, content, blogId } = postPayload;
        const blog = await this.blogsQueryRepository.getBlogById(blogId);
        if (!blog) {
            throw new Error('BLOG_NOT_FOUND');
        }
        const entity = posts_entity_1.PostEntity.create({
            title,
            shortDescription,
            content,
            blogId,
            blogName: blog.name,
        });
        const saved = await this.postsRepository.save(entity);
        return saved.toViewModel('None', []);
    }
    async updatePost(id, updateData) {
        const entity = await this.postsRepository.getById(id);
        if (!entity)
            throw new common_1.NotFoundException();
        const blog = await this.blogsQueryRepository.getBlogById(updateData.blogId);
        if (!blog)
            throw new common_1.NotFoundException();
        entity.update(updateData, blog.name);
        await this.postsRepository.save(entity);
    }
    async deletePostById(postId) {
        const deletedPost = await this.postsRepository.deletePostById(postId);
        if (!deletedPost)
            throw new common_1.NotFoundException();
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [posts_repository_1.PostsRepository,
        blogs_repository_1.BlogsQueryRepository])
], PostsService);
let PostsQueryService = class PostsQueryService {
    constructor(postsQueryRepository) {
        this.postsQueryRepository = postsQueryRepository;
    }
    async getPosts(query, currentUserId) {
        const { items, totalCount } = await this.postsQueryRepository.getPosts(query);
        if (!items.length)
            throw new common_1.NotFoundException();
        const postIds = items.map((p) => p._id.toString());
        const [newestMap, myMap] = await Promise.all([
            this.postsQueryRepository.listNewestLikes(postIds, 3),
            this.postsQueryRepository.listMyStatuses(postIds, currentUserId),
        ]);
        const view = items.map((p) => {
            const entity = posts_entity_1.PostEntity.fromPersistence(p);
            const myStatus = myMap.get(p._id.toString()) ?? 'None';
            const newestLikes = newestMap.get(p._id.toString()) ?? [];
            return entity.toViewModel(myStatus, newestLikes);
        });
        return (0, buildPaginator_1.buildPaginator)(query, totalCount, view);
    }
    async getPostById(id, currentUserId) {
        const post = await this.postsQueryRepository.getPostById(id);
        if (!post)
            throw new common_1.NotFoundException();
        const [my, newest] = await Promise.all([
            this.postsQueryRepository.listMyStatuses([post._id.toString()], currentUserId),
            this.postsQueryRepository.listNewestLikes([post._id.toString()], 3),
        ]);
        const entity = posts_entity_1.PostEntity.fromPersistence(post);
        return entity.toViewModel(my.get(post._id.toString()) ?? 'None', newest.get(post._id.toString()) ?? []);
    }
    async getPostsByBlogId(blogId, query, currentUserId) {
        const { items, totalCount } = await this.postsQueryRepository.getPostsByBlogId(blogId, query);
        if (!items.length)
            throw new common_1.NotFoundException();
        const postIds = items.map((p) => p._id.toString());
        const [newestMap, myMap] = await Promise.all([
            this.postsQueryRepository.listNewestLikes(postIds, 3),
            this.postsQueryRepository.listMyStatuses(postIds, currentUserId),
        ]);
        const view = items.map((p) => {
            const entity = posts_entity_1.PostEntity.fromPersistence(p);
            const myStatus = myMap.get(p._id.toString()) ?? 'None';
            const newestLikes = newestMap.get(p._id.toString()) ?? [];
            return entity.toViewModel(myStatus, newestLikes);
        });
        return (0, buildPaginator_1.buildPaginator)(query, totalCount, view);
    }
};
exports.PostsQueryService = PostsQueryService;
exports.PostsQueryService = PostsQueryService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(posts_repository_1.PostsQueryRepository)),
    __metadata("design:paramtypes", [posts_repository_1.PostsQueryRepository])
], PostsQueryService);
//# sourceMappingURL=posts.service.js.map