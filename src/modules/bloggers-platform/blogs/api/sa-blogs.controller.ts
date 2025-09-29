import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BlogsQueryService, BlogsService } from '../application/blogs.service';
import { CreateBlogDto } from '../dto/create-blog.dto';
import {
  PostsQueryService,
  PostsService,
} from '../../posts/application/posts.service';
import { CreatePostDtoWithIdParam } from '../../posts/dto/create-or-update-post.dto';
import { BasicAuthGuard } from '../../../../core/guards/basic-auth.guard';
import { QueryBlogsDto } from '../dto/query-blogs.dto';
import { OptionalJwtAuthGuard } from '../../../../core/guards/optinal-jwt-auth-guard';
import { PaginationDto } from '../../../../core/dto/pagination.dto';
import { CurrentUser } from '../../../../core/decorators/currentUser-JWT';
import { JwtUser } from '../../../../core/types/types';

@Controller('sa/blogs')
@UseGuards(BasicAuthGuard)
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly postsService: PostsService,
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
  @Post()
  async createBlog(@Body() dto: CreateBlogDto) {
    return await this.blogsService.createBlog(dto);
  }
  @Post(':blogId/posts')
  async createPost(
    @Param('blogId') blogId: string,
    @Body() dto: CreatePostDtoWithIdParam,
  ) {
    return await this.postsService.createPost({ ...dto, blogId });
  }
  @Put(':id')
  @HttpCode(204)
  async updateBlog(@Param('id') id: string, @Body() dto: CreateBlogDto) {
    return this.blogsService.updateBlog(id, dto);
  }
  @Delete(':id')
  @HttpCode(204)
  async deleteBlog(@Param('id') id: string) {
    return this.blogsService.deleteBlogById(id);
  }
  @Put(':blogId/posts/:postId')
  @HttpCode(204)
  async updatePostAsAdmin(
    @Param('blogId') blogId: string,
    @Param('postId') postId: string,
    @Body() dto: CreatePostDtoWithIdParam,
  ) {
    return await this.postsService.updatePost(postId, {
      ...dto,
      blogId,
    });
  }
  @Delete(':blogId/posts/:postId')
  @HttpCode(204)
  async deletePostAsAdmin(
    @Param('blogId') blogId: string,
    @Param('postId') postId: string,
  ) {
    return await this.postsService.deletePostByBlogAndPostId(blogId, postId);
  }
}
