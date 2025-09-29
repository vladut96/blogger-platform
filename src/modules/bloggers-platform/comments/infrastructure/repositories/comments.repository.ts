import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { injectable } from 'inversify';
import { CommentViewModel, LikeStatus } from '../../../../../core/types/types';
import { Comment, CommentDocument } from '../schemas/comments.schema';

@injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}

  async getCommentById(
    commentId: string,
    currentUserId?: string,
  ): Promise<CommentViewModel | null> {
    const comment = await this.commentModel.findById(commentId).lean();
    if (!comment) return null;

    let myStatus: LikeStatus = 'None';

    if (currentUserId) {
      const userLike = comment.likes.find(
        (like) => like.userId === currentUserId,
      );
      if (userLike) {
        myStatus = userLike.status;
      }
    }

    return {
      id: comment._id.toString(),
      content: comment.content,
      commentatorInfo: {
        userId: comment.commentatorInfo.userId,
        userLogin: comment.commentatorInfo.userLogin,
      },
      createdAt: comment.createdAt,
      likesInfo: {
        likesCount: comment.likesCount || 0,
        dislikesCount: comment.dislikesCount || 0,
        myStatus,
      },
    };
  }
  async getCommentDocumentById(
    commentId: string,
  ): Promise<CommentDocument | null> {
    return this.commentModel.findById(commentId).exec();
  }
  async updateComment(commentId: string, content: string): Promise<boolean> {
    const result = await this.commentModel
      .updateOne({ _id: commentId }, { $set: { content } })
      .exec();

    return result.matchedCount > 0;
  }
  async deleteComment(commentId: string): Promise<void> {
    await this.commentModel.deleteOne({ _id: commentId }).exec();
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
    const filter = { postId };
    const totalCount = await this.commentModel.countDocuments(filter);

    const comments = await this.commentModel
      .find(filter)
      .sort({ [sortBy]: sortDirection })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean();

    if (comments.length === 0) return null;

    return {
      pagesCount: Math.ceil(totalCount / pageSize),
      page: pageNumber,
      pageSize,
      totalCount,
      items: comments.map((comment) => {
        const likes = comment.likes || [];
        const likesCount = likes.filter(
          (like) => like.status === 'Like',
        ).length;
        const dislikesCount = likes.filter(
          (like) => like.status === 'Dislike',
        ).length;

        let myStatus: 'None' | 'Like' | 'Dislike' = 'None';
        if (currentUserId) {
          const userLike = likes.find((like) => like.userId === currentUserId);
          if (userLike) {
            myStatus = userLike.status;
          }
        }

        return {
          id: comment._id.toString(),
          content: comment.content,
          commentatorInfo: {
            userId: comment.commentatorInfo.userId,
            userLogin: comment.commentatorInfo.userLogin,
          },
          createdAt: comment.createdAt,
          likesInfo: {
            likesCount,
            dislikesCount,
            myStatus,
          },
        };
      }),
    };
  }
  async createComment(
    postId: string,
    content: string,
    userId: string,
    userLogin: string,
  ) {
    const newComment = new this.commentModel({
      postId,
      content,
      commentatorInfo: {
        userId,
        userLogin,
      },
      createdAt: new Date().toISOString(),
      likes: [],
      likesCount: 0,
      dislikesCount: 0,
    });

    await newComment.save();

    return {
      id: newComment._id.toString(),
      content: newComment.content,
      commentatorInfo: {
        userId: newComment.commentatorInfo.userId,
        userLogin: newComment.commentatorInfo.userLogin,
      },
      createdAt: newComment.createdAt,
      likesInfo: {
        likesCount: newComment.likesCount,
        dislikesCount: newComment.dislikesCount,
        myStatus: 'None',
      },
    };
  }
  async updateLikeStatus(
    comment: CommentDocument,
    userId: string,
    likeStatus: LikeStatus,
  ): Promise<void> {
    const existingLikeIndex = comment.likes.findIndex(
      (like) => like.userId === userId,
    );

    if (existingLikeIndex !== -1) {
      const oldStatus = comment.likes[existingLikeIndex].status;
      if (oldStatus === 'Like') comment.likesCount--;
      if (oldStatus === 'Dislike') comment.dislikesCount--;
      comment.likes.splice(existingLikeIndex, 1);
    }

    if (likeStatus !== 'None') {
      comment.likes.push({
        userId,
        status: likeStatus,
        createdAt: new Date(),
      });
      if (likeStatus === 'Like') comment.likesCount++;
      if (likeStatus === 'Dislike') comment.dislikesCount++;
    }
    await comment.save();
  }
}
