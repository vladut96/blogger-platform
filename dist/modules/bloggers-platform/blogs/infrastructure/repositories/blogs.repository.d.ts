import { Model } from 'mongoose';
import { BlogViewModel, Paginator } from '../../../../../core/types/types';
import { BlogsEntity } from '../../domain/blogs.entity';
import { BlogDocument } from '../schemas/blogs.schema';
import { QueryBlogsDto } from '../../dto/query-blogs.dto';
export declare class BlogsQueryRepository {
    private readonly blogModel;
    constructor(blogModel: Model<BlogDocument>);
    getBlogs(params: QueryBlogsDto): Promise<Paginator<BlogViewModel>>;
    getBlogById(id: string): Promise<BlogsEntity | null>;
}
export declare class BlogsRepository {
    private readonly blogModel;
    constructor(blogModel: Model<BlogDocument>);
    getById(id: string): Promise<BlogsEntity | null>;
    save(entity: BlogsEntity): Promise<BlogsEntity>;
    deleteBlogById(id: string): Promise<boolean>;
}
