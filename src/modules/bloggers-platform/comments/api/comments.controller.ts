import { Controller, Get, Param } from '@nestjs/common';
import { CommentsService } from '../application/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get(':id')
  async getCommentById(@Param('id') id: string) {
    return this.commentService.getCommentById(id);
  }
}
