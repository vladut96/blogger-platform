"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestingModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const testing_controller_1 = require("./testing.controller");
const user_schema_1 = require("../user-accounts/infrastructure/schemas/user.schema");
const posts_schema_1 = require("../bloggers-platform/posts/infrastructure/schemas/posts.schema");
const blogs_schema_1 = require("../bloggers-platform/blogs/infrastructure/schemas/blogs.schema");
const comments_schema_1 = require("../bloggers-platform/comments/infrastructure/schemas/comments.schema");
let TestingModule = class TestingModule {
};
exports.TestingModule = TestingModule;
exports.TestingModule = TestingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: posts_schema_1.Post.name, schema: posts_schema_1.PostSchema },
                { name: blogs_schema_1.Blog.name, schema: blogs_schema_1.BlogSchema },
                { name: comments_schema_1.Comment.name, schema: comments_schema_1.CommentSchema, collection: 'Comments' },
            ]),
        ],
        controllers: [testing_controller_1.TestingController],
        providers: [],
    })
], TestingModule);
//# sourceMappingURL=testing.module.js.map