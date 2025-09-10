import { BlogsQueryService, BlogsService } from '../application/blogs.service';
import { QueryBlogsDto } from '../dto/query-blogs.dto';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { PaginationDto } from '../../../../core/dto/pagination.dto';
import { PostsQueryService, PostsService } from '../../posts/application/posts.service';
import { CreatePostDtoWithIdParam } from '../../posts/dto/create-or-update-post.dto';
export declare class BlogsController {
    private readonly blogsService;
    private readonly blogsQueryService;
    private readonly postsQueryService;
    private readonly postsService;
    constructor(blogsService: BlogsService, blogsQueryService: BlogsQueryService, postsQueryService: PostsQueryService, postsService: PostsService);
    getBlogs(query: QueryBlogsDto): Promise<import("../../../../core/types/types").Paginator<import("../../../../core/types/types").BlogViewModel>>;
    createBlog(dto: CreateBlogDto): Promise<import("../../../../core/types/types").BlogViewModel>;
    getPostsByBlogId(blogId: string, query: PaginationDto): Promise<import("../../../../core/types/types").Paginator<import("../../../../core/types/types").PostViewModel>>;
    createPost(blogId: string, dto: CreatePostDtoWithIdParam): Promise<void>;
    getBlogById(id: string): Promise<import("../../../../core/types/types").BlogViewModel>;
    updateBlog(id: string, dto: CreateBlogDto): Promise<void>;
    deleteBlog(id: string): Promise<void>;
}
