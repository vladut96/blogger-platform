import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { LikeStatus } from '../../../../../core/types/types';

@Schema({ collection: 'comments' })
export class Comment {
  @Prop({ required: true })
  postId!: string;

  @Prop({ required: true })
  content!: string;

  @Prop({
    type: {
      userId: { type: String, required: true },
      userLogin: { type: String, required: true },
    },
    required: true,
  })
  commentatorInfo!: {
    userId: string;
    userLogin: string;
  };

  @Prop({ required: true })
  createdAt!: string;

  @Prop({
    type: [
      {
        userId: { type: String, required: true },
        status: {
          type: String,
          required: true,
          enum: ['None', 'Like', 'Dislike'],
          default: 'None',
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  likes!: {
    userId: string;
    status: LikeStatus;
    createdAt: Date;
  }[];

  @Prop({ required: true, default: 0 })
  likesCount!: number;

  @Prop({ required: true, default: 0 })
  dislikesCount!: number;
}

export type CommentDocument = HydratedDocument<Comment>;
export const CommentSchema = SchemaFactory.createForClass(Comment);
