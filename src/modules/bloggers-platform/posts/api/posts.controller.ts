import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateOrUpdatePostDto } from '../dto/create-or-update-post.dto';
import { PostsQueryService, PostsService } from '../application/posts.service';
import { PaginationDto } from '../../../../core/dto/pagination.dto';
import { CommentsService } from '../../comments/application/comments.service';
import { QueryCommentsDto } from '../../comments/dto/query-comments.dto';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly postsQueryService: PostsQueryService,
    private readonly commentService: CommentsService,
  ) {}
  @Get()
  getPosts(@Query() query: PaginationDto) {
    return this.postsQueryService.getPosts(query);
  }
  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return this.postsQueryService.getPostById(id);
  }
  @Post()
  async createPost(@Body() dto: CreateOrUpdatePostDto) {
    return this.postsService.createPost(dto);
  }
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updatePost(
    @Param('id') id: string,
    @Body() dto: CreateOrUpdatePostDto,
  ) {
    return this.postsService.updatePost(id, dto);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePostById(@Param('id') id: string) {
    return this.postsService.deletePostById(id);
  }
  @Get(':postId/comments')
  getCommentsForPost(
    @Param('postId') postId: string,
    @Query() query: QueryCommentsDto,
  ) {
    return this.commentService.getCommentsByPostId({ ...query, postId });
  }
}
