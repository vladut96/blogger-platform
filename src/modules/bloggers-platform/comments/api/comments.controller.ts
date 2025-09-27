import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from '../application/comments.service';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { CurrentUser } from '../../../../core/decorators/currentUser-JWT';
import { JwtUser } from '../../../../core/types/types';
import { LikeStatusDto } from '../dto/like-status.dto';
import { CreateCommentsDto } from '../dto/create-comments.dto';
import { ParseMongoIdPipe } from '../../../../core/pipes/parse-mongo-id.pipe';
import { OptionalJwtAuthGuard } from '../../../../core/guards/optinal-jwt-auth-guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}
  @UseGuards(JwtAuthGuard)
  @Put(':commentId/like-status')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateLikeStatus(
    @Param('commentId', ParseMongoIdPipe) commentId: string,
    @Body() likeStatus: LikeStatusDto,
    @CurrentUser() user: JwtUser,
  ) {
    return await this.commentService.updateLikeStatus(
      commentId,
      user.userId,
      likeStatus.likeStatus,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Put('comments/:commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateComment(
    @Param('commentId', ParseMongoIdPipe) commentId: string,
    @Body() content: CreateCommentsDto,
    @CurrentUser() user: JwtUser,
  ) {
    return this.commentService.updateComment(
      commentId,
      content.content,
      user.userId,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(
    @Param('commentId', ParseMongoIdPipe) commentId: string,
    @CurrentUser() user: JwtUser,
  ) {
    return this.commentService.deleteComment(commentId, user.userId);
  }
  @UseGuards(OptionalJwtAuthGuard)
  @Get(':id')
  async getCommentById(@Param('id') id: string, @CurrentUser() user: JwtUser) {
    return this.commentService.getCommentById(id, user?.userId);
  }
}
