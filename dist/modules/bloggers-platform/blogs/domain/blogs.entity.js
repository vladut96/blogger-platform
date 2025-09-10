"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsEntity = void 0;
class BlogsEntity {
    constructor(id, name, description, websiteUrl, createdAt, isMembership) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.websiteUrl = websiteUrl;
        this.createdAt = createdAt;
        this.isMembership = isMembership;
    }
    static fromPersistence(persisted) {
        return new BlogsEntity(persisted._id.toString(), persisted.name, persisted.description, persisted.websiteUrl, persisted.createdAt || new Date().toISOString(), persisted.isMembership || false);
    }
    static create(dto) {
        return new BlogsEntity(null, dto.name, dto.description, dto.websiteUrl, new Date().toISOString(), false);
    }
    toViewModel() {
        if (!this.id) {
            throw new Error('BlogsEntity.toViewModel called without persisted id');
        }
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            websiteUrl: this.websiteUrl,
            createdAt: this.createdAt,
            isMembership: this.isMembership,
        };
    }
    update(dto) {
        this.name = dto.name;
        this.description = dto.description;
        this.websiteUrl = dto.websiteUrl;
    }
    toPersistence() {
        return {
            name: this.name,
            description: this.description,
            websiteUrl: this.websiteUrl,
            createdAt: this.createdAt,
            isMembership: this.isMembership,
        };
    }
}
exports.BlogsEntity = BlogsEntity;
//# sourceMappingURL=blogs.entity.js.map