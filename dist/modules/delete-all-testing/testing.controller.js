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
exports.TestingController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../user-accounts/users/infrastructure/schemas/user.schema");
const posts_schema_1 = require("../bloggers-platform/posts/infrastructure/schemas/posts.schema");
const blogs_schema_1 = require("../bloggers-platform/blogs/infrastructure/schemas/blogs.schema");
const mongoose_2 = require("mongoose");
const comments_schema_1 = require("../bloggers-platform/comments/infrastructure/schemas/comments.schema");
const auth_schema_1 = require("../user-accounts/auth/infrastracture/schemas/auth.schema");
let TestingController = class TestingController {
    constructor(userModel, postModel, blogModel, commentModel, deviceSession) {
        this.userModel = userModel;
        this.postModel = postModel;
        this.blogModel = blogModel;
        this.commentModel = commentModel;
        this.deviceSession = deviceSession;
    }
    async deleteAll() {
        await this.userModel.deleteMany({});
        await this.postModel.deleteMany({});
        await this.blogModel.deleteMany({});
        await this.commentModel.deleteMany();
        await this.deviceSession.deleteMany();
    }
};
exports.TestingController = TestingController;
__decorate([
    (0, common_1.Delete)('all-data'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestingController.prototype, "deleteAll", null);
exports.TestingController = TestingController = __decorate([
    (0, common_1.Controller)('/testing'),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(posts_schema_1.Post.name)),
    __param(2, (0, mongoose_1.InjectModel)(blogs_schema_1.Blog.name)),
    __param(3, (0, mongoose_1.InjectModel)(comments_schema_1.Comment.name)),
    __param(4, (0, mongoose_1.InjectModel)(auth_schema_1.DeviceSession.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], TestingController);
//# sourceMappingURL=testing.controller.js.map