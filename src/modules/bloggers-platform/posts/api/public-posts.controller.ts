import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { PostsQueryService, PostsService } from '../application/posts.service';
import { PaginationDto } from '../../../../core/dto/pagination.dto';
import { CommentsService } from '../../comments/application/comments.service';
import { QueryCommentsDto } from '../../comments/dto/query-comments.dto';
import { CurrentUser } from '../../../../core/decorators/currentUser-JWT';
import { JwtUser } from '../../../../core/types/types';
import { OptionalJwtAuthGuard } from '../../../../core/guards/optinal-jwt-auth-guard';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { CreateCommentsDto } from '../../comments/dto/create-comments.dto';
import { LikeStatusDto } from '../../comments/dto/like-status.dto';

@Controller('posts')
export class PostsPublicController {
  constructor(
    private readonly postsQueryService: PostsQueryService,
    private readonly postsService: PostsService,
    private readonly commentService: CommentsService,
  ) {}
  @UseGuards(OptionalJwtAuthGuard)
  @Get(':postId/comments')
  getCommentsForPost(
    @Param('postId') postId: string,
    @Query() query: QueryCommentsDto,
    @CurrentUser() user?: JwtUser,
  ) {
    return this.commentService.getCommentsByPostId({
      ...query,
      postId,
      currentUserId: user?.userId,
    });
  }
  @UseGuards(OptionalJwtAuthGuard)
  @Get()
  getPosts(@Query() query: PaginationDto, @CurrentUser() user?: JwtUser) {
    return this.postsQueryService.getPosts(query, user?.userId);
  }
  @UseGuards(OptionalJwtAuthGuard)
  @Get(':id')
  async getPostById(@Param('id') id: string, @CurrentUser() user?: JwtUser) {
    return this.postsQueryService.getPostById(id, user?.userId);
  }
  @UseGuards(JwtAuthGuard)
  @Post(':postId/comments')
  async createPostsComments(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentsDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.commentService.createComment(
      postId,
      dto.content,
      user.userId,
      user.login,
    );
  }
  @UseGuards(JwtAuthGuard)
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
}
