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
import { QueryBlogsDto } from '../dto/query-blogs.dto';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { PaginationDto } from '../../../../core/dto/pagination.dto';
import {
  PostsQueryService,
  PostsService,
} from '../../posts/application/posts.service';
import { CreatePostDtoWithIdParam } from '../../posts/dto/create-or-update-post.dto';
import { BasicAuthGuard } from '../../../../core/guards/basic-auth.guard';
import { OptionalJwtAuthGuard } from '../../../../core/guards/optinal-jwt-auth-guard';
import { CurrentUser } from '../../../../core/decorators/currentUser-JWT';
import { JwtUser } from '../../../../core/types/types';
import { ParseMongoIdPipe } from '../../../../core/pipes/parse-mongo-id.pipe';

@Controller('blogs')
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService,
    private readonly blogsQueryService: BlogsQueryService,
    private readonly postsQueryService: PostsQueryService,
    private readonly postsService: PostsService,
  ) {}

  @Get()
  async getBlogs(@Query() query: QueryBlogsDto) {
    return await this.blogsQueryService.getBlogs(query);
  }
  @UseGuards(BasicAuthGuard)
  @Post()
  async createBlog(@Body() dto: CreateBlogDto) {
    return await this.blogsService.createBlog(dto);
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
  @UseGuards(BasicAuthGuard)
  @Post(':blogId/posts')
  async createPost(
    @Param('blogId') blogId: string,
    @Body() dto: CreatePostDtoWithIdParam,
  ) {
    return await this.postsService.createPost({ ...dto, blogId });
  }

  @Get(':id')
  async getBlogById(@Param('id') id: string) {
    return await this.blogsQueryService.getBlogById(id);
  }
  @UseGuards(BasicAuthGuard)
  @Put(':id')
  @HttpCode(204)
  async updateBlog(@Param('id') id: string, @Body() dto: CreateBlogDto) {
    return this.blogsService.updateBlog(id, dto);
  }
  @UseGuards(BasicAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteBlog(@Param('id') id: string) {
    return this.blogsService.deleteBlogById(id);
  }
}
