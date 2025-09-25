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
  UseGuards,
} from '@nestjs/common';
import { CreateOrUpdatePostDto } from '../dto/create-or-update-post.dto';
import { PostsQueryService, PostsService } from '../application/posts.service';
import { PaginationDto } from '../../../../core/dto/pagination.dto';
import { CommentsService } from '../../comments/application/comments.service';
import { QueryCommentsDto } from '../../comments/dto/query-comments.dto';
import { CreateCommentsDto } from '../../comments/dto/create-comments.dto';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { CurrentUser } from '../../../../core/decorators/currentUser-JWT';
import { JwtUser } from '../../../../core/types/types';
import { LikeStatusDto } from '../../comments/dto/like-status.dto';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly postsQueryService: PostsQueryService,
    private readonly commentService: CommentsService,
  ) {}
  //@UseGuards(JwtAuthGuard)
  @Put(':postId/like-status')
  @HttpCode(HttpStatus.NO_CONTENT)
  async setPostLikeStatus(
    @Param('postId') postId: string,
    @Body() likeStatus: LikeStatusDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.postsService.setPostLikeStatus(
      postId,
      user.userId,
      user.login,
      likeStatus.likeStatus,
    );
  }
  @Get(':postId/comments')
  getCommentsForPost(
    @Param('postId') postId: string,
    @Query() query: QueryCommentsDto,
  ) {
    return this.commentService.getCommentsByPostId({ ...query, postId });
  }
  //@UseGuards(JwtAuthGuard)
  @Post(':postId/comments')
  async createPostsComments(
    @Param('postId') postId: string,
    @Body('content') content: CreateCommentsDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.commentService.createComment(
      postId,
      content.content,
      user.userId,
      user.login,
    );
  }
  @Get()
  getPosts(@Query() query: PaginationDto) {
    return this.postsQueryService.getPosts(query);
  }
  //@UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Body() dto: CreateOrUpdatePostDto) {
    return this.postsService.createPost(dto);
  }
  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return this.postsQueryService.getPostById(id);
  }
  //@UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updatePost(
    @Param('id') id: string,
    @Body() dto: CreateOrUpdatePostDto,
  ) {
    return this.postsService.updatePost(id, dto);
  }
  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePostById(@Param('id') id: string) {
    return this.postsService.deletePostById(id);
  }
}
