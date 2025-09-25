import { injectable } from 'inversify';
import { LikeStatus, CommentViewModel } from '../../../../core/types/types';
import { CommentsRepository } from '../infrastructure/repositories/comments.repository';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

@injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}
  async getCommentById(
    commentId: string,
    currentUserId?: string,
  ): Promise<CommentViewModel> {
    const comment = await this.commentsRepository.getCommentById(
      commentId,
      currentUserId,
    );
    if (!comment) throw new NotFoundException();
    return comment;
  }
  async updateComment(
    commentId: string,
    content: string,
    userId: string,
  ): Promise<void> {
    const comment = await this.commentsRepository.getCommentById(
      commentId,
      userId,
    );
    if (!comment) {
      throw new NotFoundException();
    }
    if (comment.commentatorInfo.userId !== userId) {
      throw new ForbiddenException();
    }

    await this.commentsRepository.updateComment(commentId, content);
  }
  async deleteComment(commentId: string, userId: string): Promise<void> {
    const comment = await this.commentsRepository.getCommentById(commentId);
    if (!comment) throw new NotFoundException();
    if (comment.commentatorInfo.userId !== userId)
      throw new ForbiddenException();
    await this.commentsRepository.deleteComment(commentId);
  }
  async getCommentsByPostId({
    postId,
    pageNumber,
    pageSize,
    sortBy,
    sortDirection,
    currentUserId,
  }: {
    postId: string;
    pageNumber: number;
    pageSize: number;
    sortBy: string;
    sortDirection: 1 | -1;
    currentUserId?: string;
  }) {
    return await this.commentsRepository.getCommentsByPostId({
      postId,
      pageNumber,
      pageSize,
      sortBy,
      sortDirection,
      currentUserId,
    });
  }
  async createComment(
    postId: string,
    content: string,
    userId: string,
    userLogin: string,
  ) {
    return await this.commentsRepository.createComment(
      postId,
      content,
      userId,
      userLogin,
    );
  }
  async updateLikeStatus(
    commentId: string,
    userId: string,
    likeStatus: LikeStatus,
  ): Promise<void> {
    const comment =
      await this.commentsRepository.getCommentDocumentById(commentId);
    if (!comment) {
      throw new NotFoundException();
    }
    await this.commentsRepository.updateLikeStatus(comment, userId, likeStatus);
  }
}
