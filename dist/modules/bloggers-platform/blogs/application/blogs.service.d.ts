import { BlogInputModel, BlogViewModel, Paginator } from '../../../../core/types/types';
import { BlogsEntity } from '../domain/blogs.entity';
import { BlogsQueryRepository, BlogsRepository } from '../infrastructure/repositories/blogs.repository';
import { QueryBlogsDto } from '../dto/query-blogs.dto';
export declare class BlogsQueryService {
    private readonly blogsQueryRepository;
    constructor(blogsQueryRepository: BlogsQueryRepository);
    getBlogs(query: QueryBlogsDto): Promise<Paginator<BlogViewModel>>;
    getBlogById(blogID: string): Promise<BlogsEntity>;
}
export declare class BlogsService {
    private readonly blogsRepository;
    constructor(blogsRepository: BlogsRepository);
    createBlog(dto: BlogInputModel): Promise<BlogViewModel>;
    updateBlog(id: string, updateData: BlogInputModel): Promise<void>;
    deleteBlogById(id: string): Promise<void>;
}
