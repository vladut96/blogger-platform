import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'post_reactions' })
export class PostReaction {
  @Prop({ required: true, index: true }) postId: string;
  @Prop({ required: true, index: true }) userId: string;
  @Prop({ required: true }) userLogin: string;
  @Prop({ required: true, enum: ['None', 'Like', 'Dislike'] })
  status: 'None' | 'Like' | 'Dislike';
  @Prop({ default: () => new Date().toISOString() }) addedAt: string;
}

export type PostReactionDocument = HydratedDocument<PostReaction>;
export const PostReactionSchema = SchemaFactory.createForClass(PostReaction);
PostReactionSchema.index({ postId: 1, userId: 1 }, { unique: true });
