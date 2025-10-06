import { BlogsQueryService, BlogsService } from '../application/blogs.service';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { PostsQueryService, PostsService } from '../../posts/application/posts.service';
import { CreatePostDtoWithIdParam } from '../../posts/dto/create-or-update-post.dto';
import { QueryBlogsDto } from '../dto/query-blogs.dto';
import { PaginationDto } from '../../../../core/dto/pagination.dto';
import { JwtUser } from '../../../../core/types/types';
export declare class BlogsController {
    private readonly blogsService;
    private readonly postsService;
    private readonly blogsQueryService;
    private readonly postsQueryService;
    constructor(blogsService: BlogsService, postsService: PostsService, blogsQueryService: BlogsQueryService, postsQueryService: PostsQueryService);
    getBlogs(query: QueryBlogsDto): Promise<import("../../../../core/types/types").Paginator<import("../../../../core/types/types").BlogViewModel>>;
    getPostsByBlogId(blogId: string, query: PaginationDto, user?: JwtUser): Promise<import("../../../../core/types/types").Paginator<import("../../../../core/types/types").PostViewModel>>;
    createBlog(dto: CreateBlogDto): Promise<import("../../../../core/types/types").BlogViewModel>;
    createPost(blogId: string, dto: CreatePostDtoWithIdParam): Promise<import("../../../../core/types/types").PostViewModel>;
    updateBlog(id: string, dto: CreateBlogDto): Promise<void>;
    deleteBlog(id: string): Promise<void>;
    updatePostAsAdmin(blogId: string, postId: string, dto: CreatePostDtoWithIdParam): Promise<void>;
    deletePostAsAdmin(blogId: string, postId: string): Promise<void>;
}
