"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostEntity = void 0;
class PostEntity {
    constructor(id, title, shortDescription, content, blogId, blogName, createdAt, likesCount = 0, dislikesCount = 0) {
        this.id = id;
        this.title = title;
        this.shortDescription = shortDescription;
        this.content = content;
        this.blogId = blogId;
        this.blogName = blogName;
        this.createdAt = createdAt;
        this.likesCount = likesCount;
        this.dislikesCount = dislikesCount;
    }
    static fromPersistence(persisted) {
        return new PostEntity(persisted._id.toString(), persisted.title, persisted.shortDescription, persisted.content, persisted.blogId, persisted.blogName, persisted.createdAt || new Date().toISOString(), persisted.likesCount ?? 0, persisted.dislikesCount ?? 0);
    }
    static create(dto) {
        return new PostEntity(null, dto.title, dto.shortDescription, dto.content, dto.blogId, dto.blogName, new Date().toISOString(), 0, 0);
    }
    update(updateData, blogName) {
        this.title = updateData.title;
        this.shortDescription = updateData.shortDescription;
        this.content = updateData.content;
        this.blogId = updateData.blogId;
        if (blogName)
            this.blogName = blogName;
    }
    toViewModel(myStatus = 'None', newestLikes = []) {
        if (!this.id) {
            throw new Error('UserEntity.toViewModel called without persisted id');
        }
        return {
            id: this.id,
            title: this.title,
            shortDescription: this.shortDescription,
            content: this.content,
            blogId: this.blogId,
            blogName: this.blogName,
            createdAt: this.createdAt,
            extendedLikesInfo: {
                likesCount: this.likesCount,
                dislikesCount: this.dislikesCount,
                myStatus,
                newestLikes,
            },
        };
    }
    toPersistence() {
        return {
            title: this.title,
            shortDescription: this.shortDescription,
            content: this.content,
            blogId: this.blogId,
            blogName: this.blogName,
            createdAt: this.createdAt,
            likesCount: this.likesCount,
            dislikesCount: this.dislikesCount,
        };
    }
}
exports.PostEntity = PostEntity;
//# sourceMappingURL=posts.entity.js.map