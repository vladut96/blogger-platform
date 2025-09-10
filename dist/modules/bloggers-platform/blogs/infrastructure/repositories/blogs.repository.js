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
exports.BlogsRepository = exports.BlogsQueryRepository = void 0;
const mongoose_1 = require("mongoose");
const blogs_entity_1 = require("../../domain/blogs.entity");
const blogs_schema_1 = require("../schemas/blogs.schema");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
let BlogsQueryRepository = class BlogsQueryRepository {
    constructor(blogModel) {
        this.blogModel = blogModel;
    }
    async getBlogs(params) {
        const { searchNameTerm, sortBy, sortDirection, pageNumber, pageSize } = params;
        const filter = {};
        if (searchNameTerm) {
            filter.name = { $regex: searchNameTerm, $options: 'i' };
        }
        const sort = {
            [sortBy]: sortDirection,
        };
        const skip = (pageNumber - 1) * pageSize;
        const [items, totalCount] = await Promise.all([
            this.blogModel.find(filter).sort(sort).skip(skip).limit(pageSize).lean(),
            this.blogModel.countDocuments(filter),
        ]);
        return {
            pagesCount: Math.ceil(totalCount / pageSize),
            page: pageNumber,
            pageSize,
            totalCount,
            items: items.map((raw) => blogs_entity_1.BlogsEntity.fromPersistence(raw).toViewModel()),
        };
    }
    async getBlogById(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id))
            return null;
        const blog = await this.blogModel.findById(id).lean();
        return blog ? blogs_entity_1.BlogsEntity.fromPersistence(blog).toViewModel() : null;
    }
};
exports.BlogsQueryRepository = BlogsQueryRepository;
exports.BlogsQueryRepository = BlogsQueryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(blogs_schema_1.Blog.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], BlogsQueryRepository);
let BlogsRepository = class BlogsRepository {
    constructor(blogModel) {
        this.blogModel = blogModel;
    }
    async getById(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id))
            return null;
        const doc = await this.blogModel.findById(id).lean().exec();
        return doc ? blogs_entity_1.BlogsEntity.fromPersistence(doc) : null;
    }
    async save(entity) {
        const payload = entity.toPersistence();
        if (entity.id) {
            await this.blogModel
                .updateOne({ _id: new mongoose_1.Types.ObjectId(entity.id) }, { $set: payload })
                .exec();
            const updated = await this.blogModel.findById(entity.id).lean().exec();
            if (!updated)
                throw new Error('Blog not found after update');
            return blogs_entity_1.BlogsEntity.fromPersistence(updated);
        }
        else {
            const created = await this.blogModel.create(payload);
            return blogs_entity_1.BlogsEntity.fromPersistence(created.toObject());
        }
    }
    async deleteBlogById(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id))
            return false;
        const res = await this.blogModel.deleteOne({ _id: id }).exec();
        return res.deletedCount > 0;
    }
};
exports.BlogsRepository = BlogsRepository;
exports.BlogsRepository = BlogsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(blogs_schema_1.Blog.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], BlogsRepository);
//# sourceMappingURL=blogs.repository.js.map