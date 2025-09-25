import mongoose, { Model, SortOrder, Types } from 'mongoose';
import { injectable } from 'inversify';
import { InjectModel } from '@nestjs/mongoose';
import { PostEntity } from '../../domain/posts.entity';
import {
  LikeStatus,
  PaginationQuery,
  PostPersistence,
  NewestLike,
} from '../../../../../core/types/types';
import { PostDocument, Post } from '../schemas/posts.schema';
import {
  PostReaction,
  PostReactionDocument,
} from '../schemas/post-reaction.schema';
import { PaginationDto } from '../../../../../core/dto/pagination.dto';

@injectable()
export class PostsRepository {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    @InjectModel(PostReaction.name)
    private readonly postReactionModel: Model<PostReactionDocument>,
  ) {}
  async getById(id: string): Promise<PostEntity | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    const persisted = await this.postModel
      .findById(id)
      .lean<PostPersistence | null>()
      .exec();
    return persisted ? PostEntity.fromPersistence(persisted) : null;
  }

  async save(entity: PostEntity): Promise<PostEntity> {
    const payload = entity.toPersistence();

    if (entity.id) {
      const updated = await this.postModel
        .findOneAndUpdate({ _id: entity.id }, { $set: payload }, { new: true })
        .lean<PostPersistence | null>()
        .exec();

      if (!updated) throw new Error('Post not found after update');
      return PostEntity.fromPersistence(updated);
    } else {
      if (payload.likesCount === undefined) payload.likesCount = 0;
      if (payload.dislikesCount === undefined) payload.dislikesCount = 0;

      const created = await this.postModel.create(payload);
      return PostEntity.fromPersistence(created.toObject());
    }
  }

  async deletePostById(id: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(id)) return false;
    const res = await this.postModel.deleteOne({ _id: id }).exec();
    return res.deletedCount > 0;
  }
  async setPostLikeStatus(
    postId: string,
    userId: string,
    userLogin: string,
    likeStatus: LikeStatus,
  ): Promise<'OK' | 'NOT_FOUND'> {
    const session = await mongoose.startSession();
    try {
      let outcome: 'OK' | 'NOT_FOUND' = 'OK';

      await session.withTransaction(async () => {
        if (!Types.ObjectId.isValid(postId)) {
          outcome = 'NOT_FOUND';
          return;
        }
        const post = await this.postModel.findById(postId).session(session);
        if (!post) {
          outcome = 'NOT_FOUND';
          return;
        }
        const existing = await this.postReactionModel
          .findOne({
            postId,
            userId,
          })
          .session(session);

        const prev: LikeStatus = existing
          ? (existing.status as LikeStatus)
          : 'None';
        const next: LikeStatus = likeStatus;

        if (prev === next) return;

        if (next === 'None') {
          if (existing) await existing.deleteOne({ session });
        } else {
          await this.postReactionModel.updateOne(
            { postId, userId },
            { $set: { status: next, userLogin } }, // денорм login для newestLikes
            { upsert: true, session },
          );
        }
        const inc = { likesCount: 0, dislikesCount: 0 };
        if (prev === 'Like') inc.likesCount--;
        if (prev === 'Dislike') inc.dislikesCount--;
        if (next === 'Like') inc.likesCount++;
        if (next === 'Dislike') inc.dislikesCount++;

        if (inc.likesCount !== 0 || inc.dislikesCount !== 0) {
          await this.postModel
            .updateOne({ _id: postId }, { $inc: inc })
            .session(session);
        }
      });

      return outcome;
    } finally {
      await session.endSession();
    }
  }
}

@injectable()
export class PostsQueryRepository {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    @InjectModel(PostReaction.name)
    private readonly postReactionModel: Model<PostReactionDocument>,
  ) {}
  async getPostById(id: string): Promise<PostPersistence | null> {
    if (!Types.ObjectId.isValid(id)) return null;
    return this.postModel.findById(id).lean<PostPersistence | null>().exec();
  }
  async getPosts(
    params: PaginationDto,
  ): Promise<{ items: PostPersistence[]; totalCount: number }> {
    const { sortBy, sortDirection, pageNumber, pageSize } = params;

    const filter = {};
    const totalCount = await this.postModel.countDocuments(filter).exec();
    const skip = (pageNumber - 1) * pageSize;

    const items = await this.postModel
      .find(filter)
      .sort({ [sortBy]: sortDirection as SortOrder })
      .skip(skip)
      .limit(pageSize)
      .lean<PostPersistence[]>()
      .exec();

    return { items, totalCount };
  }
  async getPostsByBlogId(
    blogId: string,
    params: PaginationQuery,
  ): Promise<{ items: PostPersistence[]; totalCount: number }> {
    const { sortBy, sortDirection, pageNumber, pageSize } = params;

    const filter = { blogId };
    const totalCount = await this.postModel.countDocuments(filter).exec();
    const skip = (pageNumber - 1) * pageSize;

    const items = await this.postModel
      .find(filter)
      .sort({ [sortBy]: sortDirection as SortOrder })
      .skip(skip)
      .limit(pageSize)
      .lean<PostPersistence[]>()
      .exec();

    return { items, totalCount };
  }

  async listNewestLikes(
    postIds: string[],
    limit = 3,
  ): Promise<Map<string, NewestLike[]>> {
    if (postIds.length === 0) return new Map();

    const rows = await this.postReactionModel
      .find({
        postId: { $in: postIds.map((id) => new Types.ObjectId(id)) },
        status: 'Like',
      })
      .sort({ addedAt: -1 })
      .lean()
      .exec();

    const grouped = new Map<string, NewestLike[]>();
    for (const r of rows) {
      const key = r.postId.toString();
      if (!grouped.has(key)) grouped.set(key, []);
      const arr = grouped.get(key)!;
      if (arr.length < limit) {
        arr.push({
          addedAt: r.addedAt,
          userId: r.userId.toString(),
          login: r.userLogin,
        });
      }
    }
    return grouped;
  }

  async listMyStatuses(
    postIds: string[],
    userId?: string,
  ): Promise<Map<string, LikeStatus>> {
    const map = new Map<string, LikeStatus>();
    if (!userId || postIds.length === 0) return map;

    const rows = await this.postReactionModel
      .find({
        userId: new Types.ObjectId(userId),
        postId: { $in: postIds.map((id) => new Types.ObjectId(id)) },
      })
      .lean()
      .exec();

    for (const r of rows) {
      map.set(r.postId.toString(), r.status as LikeStatus);
    }
    return map;
  }
}
