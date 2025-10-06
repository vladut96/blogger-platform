import { BlogsQueryService, BlogsService } from '../application/blogs.service';
import { QueryBlogsDto } from '../dto/query-blogs.dto';
import { PaginationDto } from '../../../../core/dto/pagination.dto';
import { PostsQueryService } from '../../posts/application/posts.service';
import { JwtUser } from '../../../../core/types/types';
export declare class BlogsPublicController {
    private readonly blogsService;
    private readonly blogsQueryService;
    private readonly postsQueryService;
    constructor(blogsService: BlogsService, blogsQueryService: BlogsQueryService, postsQueryService: PostsQueryService);
    getBlogs(query: QueryBlogsDto): Promise<import("../../../../core/types/types").Paginator<import("../../../../core/types/types").BlogViewModel>>;
    getPostsByBlogId(blogId: string, query: PaginationDto, user?: JwtUser): Promise<import("../../../../core/types/types").Paginator<import("../../../../core/types/types").PostViewModel>>;
    getBlogById(id: string): Promise<import("../domain/blogs.entity").BlogsEntity>;
}
