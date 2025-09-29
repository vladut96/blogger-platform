import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { BlogsQueryService, BlogsService } from '../application/blogs.service';
import { QueryBlogsDto } from '../dto/query-blogs.dto';
import { PaginationDto } from '../../../../core/dto/pagination.dto';
import { PostsQueryService } from '../../posts/application/posts.service';
import { OptionalJwtAuthGuard } from '../../../../core/guards/optinal-jwt-auth-guard';
import { CurrentUser } from '../../../../core/decorators/currentUser-JWT';
import { JwtUser } from '../../../../core/types/types';

@Controller('blogs')
export class BlogsPublicController {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly blogsQueryService: BlogsQueryService,
    private readonly postsQueryService: PostsQueryService,
  ) {}

  @Get()
  async getBlogs(@Query() query: QueryBlogsDto) {
    return await this.blogsQueryService.getBlogs(query);
  }
  @UseGuards(OptionalJwtAuthGuard)
  @Get(':blogId/posts')
  async getPostsByBlogId(
    @Param('blogId') blogId: string,
    @Query() query: PaginationDto,
    @CurrentUser() user?: JwtUser,
  ) {
    return this.postsQueryService.getPostsByBlogId(blogId, query, user?.userId);
  }
  @Get(':id')
  async getBlogById(@Param('id') id: string) {
    return await this.blogsQueryService.getBlogById(id);
  }
}
