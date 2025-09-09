import { FilterQuery, SortOrder, Types, Model } from 'mongoose';
import { BlogViewModel, Paginator } from '../../../../../core/types/types';
import { BlogsEntity } from '../../domain/blogs.entity';
import { Blog, BlogDocument } from '../schemas/blogs.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { QueryBlogsDto } from '../../dto/query-blogs.dto';

@Injectable()
export class BlogsQueryRepository {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>,
  ) {}

  async getBlogs(params: QueryBlogsDto): Promise<Paginator<BlogViewModel>> {
    const { searchNameTerm, sortBy, sortDirection, pageNumber, pageSize } =
      params;

    const filter: FilterQuery<any> = {};
    if (searchNameTerm) {
      filter.name = { $regex: searchNameTerm, $options: 'i' };
    }

    const sort: Record<string, SortOrder> = {
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
      items: items.map((raw) => BlogsEntity.fromPersistence(raw).toViewModel()),
    };
  }
  async getBlogById(id: string): Promise<BlogViewModel | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    const blog = await this.blogModel.findById(id).lean();
    return blog ? BlogsEntity.fromPersistence(blog).toViewModel() : null;
  }
}

@Injectable()
export class BlogsRepository {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>,
  ) {}

  async getById(id: string): Promise<BlogsEntity | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    const doc = await this.blogModel.findById(id).lean().exec();
    return doc ? BlogsEntity.fromPersistence(doc) : null;
  }

  async save(entity: BlogsEntity): Promise<BlogsEntity> {
    const payload = entity.toPersistence();

    if (entity.id) {
      // UPDATE
      await this.blogModel
        .updateOne({ _id: new Types.ObjectId(entity.id) }, { $set: payload })
        .exec();

      const updated = await this.blogModel.findById(entity.id).lean().exec();
      if (!updated) throw new Error('Blog not found after update');
      return BlogsEntity.fromPersistence(updated);
    } else {
      // CREATE
      const created = await this.blogModel.create(payload);
      return BlogsEntity.fromPersistence(created.toObject());
    }
  }

  async deleteBlogById(id: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(id)) return false;
    const res = await this.blogModel.deleteOne({ _id: id }).exec();
    return res.deletedCount > 0;
  }
}
