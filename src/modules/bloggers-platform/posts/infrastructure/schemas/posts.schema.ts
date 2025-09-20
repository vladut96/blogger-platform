import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'posts' })
export class Post {
  @Prop({ required: true }) title!: string;
  @Prop({ required: true }) shortDescription!: string;
  @Prop({ required: true }) content!: string;
  @Prop({ required: true, index: true }) blogId!: string;
  @Prop({ required: true }) blogName!: string;
  @Prop({ default: () => new Date().toISOString() })
  createdAt!: string;

  @Prop({ default: 0 }) likesCount!: number;
  @Prop({ default: 0 }) dislikesCount!: number;
}

export type PostDocument = HydratedDocument<Post>;
export const PostSchema = SchemaFactory.createForClass(Post);
