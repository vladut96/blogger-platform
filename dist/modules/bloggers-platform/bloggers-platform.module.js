"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BloggersPlatformModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const blogs_service_1 = require("./blogs/application/blogs.service");
const blogs_repository_1 = require("./blogs/infrastructure/repositories/blogs.repository");
const posts_service_1 = require("./posts/application/posts.service");
const posts_repository_1 = require("./posts/infrastructure/repositories/posts.repository");
const users_module_1 = require("../user-accounts/users/users.module");
const blogs_schema_1 = require("./blogs/infrastructure/schemas/blogs.schema");
const posts_schema_1 = require("./posts/infrastructure/schemas/posts.schema");
const post_reaction_schema_1 = require("./posts/infrastructure/schemas/post-reaction.schema");
const comments_schema_1 = require("./comments/infrastructure/schemas/comments.schema");
const comments_controller_1 = require("./comments/api/comments.controller");
const comments_service_1 = require("./comments/application/comments.service");
const comments_repository_1 = require("./comments/infrastructure/repositories/comments.repository");
const sa_posts_controller_1 = require("./posts/api/sa-posts.controller");
const public_posts_controller_1 = require("./posts/api/public-posts.controller");
const public_blogs_controller_1 = require("./blogs/api/public-blogs.controller");
const sa_blogs_controller_1 = require("./blogs/api/sa-blogs.controller");
let BloggersPlatformModule = class BloggersPlatformModule {
};
exports.BloggersPlatformModule = BloggersPlatformModule;
exports.BloggersPlatformModule = BloggersPlatformModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            mongoose_1.MongooseModule.forFeature([
                { name: blogs_schema_1.Blog.name, schema: blogs_schema_1.BlogSchema },
                { name: posts_schema_1.Post.name, schema: posts_schema_1.PostSchema },
                { name: post_reaction_schema_1.PostReaction.name, schema: post_reaction_schema_1.PostReactionSchema },
                { name: comments_schema_1.Comment.name, schema: comments_schema_1.CommentSchema },
            ]),
        ],
        controllers: [
            sa_blogs_controller_1.BlogsController,
            public_blogs_controller_1.BlogsPublicController,
            sa_posts_controller_1.PostsController,
            public_posts_controller_1.PostsPublicController,
            comments_controller_1.CommentsController,
        ],
        providers: [
            blogs_service_1.BlogsService,
            blogs_service_1.BlogsQueryService,
            blogs_repository_1.BlogsRepository,
            blogs_repository_1.BlogsQueryRepository,
            posts_service_1.PostsService,
            posts_service_1.PostsQueryService,
            posts_repository_1.PostsRepository,
            posts_repository_1.PostsQueryRepository,
            comments_service_1.CommentsService,
            comments_repository_1.CommentsRepository,
        ],
        exports: [],
    })
], BloggersPlatformModule);
//# sourceMappingURL=bloggers-platform.module.js.map