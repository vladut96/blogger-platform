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
exports.PostsQueryRepository = exports.PostsRepository = void 0;
const mongoose_1 = require("mongoose");
const inversify_1 = require("inversify");
const mongoose_2 = require("@nestjs/mongoose");
const posts_entity_1 = require("../../domain/posts.entity");
const posts_schema_1 = require("../schemas/posts.schema");
const post_reaction_schema_1 = require("../schemas/post-reaction.schema");
let PostsRepository = class PostsRepository {
    constructor(postModel, postReactionModel, connection) {
        this.postModel = postModel;
        this.postReactionModel = postReactionModel;
        this.connection = connection;
    }
    async getById(id) {
        const persisted = await this.postModel
            .findById(id)
            .lean()
            .exec();
        return persisted ? posts_entity_1.PostEntity.fromPersistence(persisted) : null;
    }
    async save(entity) {
        const payload = entity.toPersistence();
        if (entity.id) {
            const updated = await this.postModel
                .findOneAndUpdate({ _id: entity.id }, { $set: payload }, { new: true })
                .lean()
                .exec();
            if (!updated)
                throw new Error('Post not found after update');
            return posts_entity_1.PostEntity.fromPersistence(updated);
        }
        else {
            if (payload.likesCount === undefined)
                payload.likesCount = 0;
            if (payload.dislikesCount === undefined)
                payload.dislikesCount = 0;
            const created = await this.postModel.create(payload);
            return posts_entity_1.PostEntity.fromPersistence(created.toObject());
        }
    }
    async deletePostById(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id))
            return false;
        const res = await this.postModel.deleteOne({ _id: id }).exec();
        return res.deletedCount > 0;
    }
    async setPostLikeStatus(postId, userId, userLogin, likeStatus) {
        const session = await this.connection.startSession();
        try {
            let outcome = 'OK';
            await session.withTransaction(async () => {
                if (!mongoose_1.Types.ObjectId.isValid(postId)) {
                    outcome = 'NOT_FOUND';
                    return;
                }
                const post = await this.postModel.findById(postId).session(session);
                if (!post) {
                    outcome = 'NOT_FOUND';
                    return;
                }
                const existing = await this.postReactionModel
                    .findOne({
                    postId,
                    userId,
                })
                    .session(session);
                const prev = existing
                    ? existing.status
                    : 'None';
                const next = likeStatus;
                if (prev === next)
                    return;
                if (next === 'None') {
                    if (existing)
                        await existing.deleteOne({ session });
                }
                else {
                    await this.postReactionModel.updateOne({ postId, userId }, { $set: { status: next, userLogin } }, { upsert: true, session });
                }
                const inc = { likesCount: 0, dislikesCount: 0 };
                if (prev === 'Like')
                    inc.likesCount--;
                if (prev === 'Dislike')
                    inc.dislikesCount--;
                if (next === 'Like')
                    inc.likesCount++;
                if (next === 'Dislike')
                    inc.dislikesCount++;
                if (inc.likesCount !== 0 || inc.dislikesCount !== 0) {
                    await this.postModel
                        .updateOne({ _id: postId }, { $inc: inc })
                        .session(session);
                }
            });
            return outcome;
        }
        finally {
            await session.endSession();
        }
    }
};
exports.PostsRepository = PostsRepository;
exports.PostsRepository = PostsRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(posts_schema_1.Post.name)),
    __param(1, (0, mongoose_2.InjectModel)(post_reaction_schema_1.PostReaction.name)),
    __param(2, (0, mongoose_2.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model,
        mongoose_1.Connection])
], PostsRepository);
let PostsQueryRepository = class PostsQueryRepository {
    constructor(postModel, postReactionModel) {
        this.postModel = postModel;
        this.postReactionModel = postReactionModel;
    }
    async getPostById(id) {
        return this.postModel.findById(id).lean().exec();
    }
    async getPosts(params) {
        const { sortBy, sortDirection, pageNumber, pageSize } = params;
        const filter = {};
        const totalCount = await this.postModel.countDocuments(filter).exec();
        const skip = (pageNumber - 1) * pageSize;
        const items = await this.postModel
            .find(filter)
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(pageSize)
            .lean()
            .exec();
        return { items, totalCount };
    }
    async getPostsByBlogId(blogId, params) {
        const { sortBy, sortDirection, pageNumber, pageSize } = params;
        const filter = { blogId };
        const totalCount = await this.postModel.countDocuments(filter).exec();
        const skip = (pageNumber - 1) * pageSize;
        const items = await this.postModel
            .find(filter)
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(pageSize)
            .lean()
            .exec();
        return { items, totalCount };
    }
    async listNewestLikes(postIds, limit = 3) {
        if (postIds.length === 0)
            return new Map();
        const rows = await this.postReactionModel
            .find({
            postId: { $in: postIds.map((id) => new mongoose_1.Types.ObjectId(id)) },
            status: 'Like',
        })
            .sort({ addedAt: -1 })
            .lean()
            .exec();
        const grouped = new Map();
        for (const r of rows) {
            const key = r.postId.toString();
            if (!grouped.has(key))
                grouped.set(key, []);
            const arr = grouped.get(key);
            if (arr.length < limit) {
                arr.push({
                    addedAt: r.addedAt,
                    userId: r.userId.toString(),
                    login: r.userLogin,
                });
            }
        }
        return grouped;
    }
    async listMyStatuses(postIds, userId) {
        const map = new Map();
        if (!userId || postIds.length === 0)
            return map;
        const rows = await this.postReactionModel
            .find({
            userId: new mongoose_1.Types.ObjectId(userId),
            postId: { $in: postIds.map((id) => new mongoose_1.Types.ObjectId(id)) },
        })
            .lean()
            .exec();
        for (const r of rows) {
            map.set(r.postId.toString(), r.status);
        }
        return map;
    }
};
exports.PostsQueryRepository = PostsQueryRepository;
exports.PostsQueryRepository = PostsQueryRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(posts_schema_1.Post.name)),
    __param(1, (0, mongoose_2.InjectModel)(post_reaction_schema_1.PostReaction.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], PostsQueryRepository);
//# sourceMappingURL=posts.repository.js.map