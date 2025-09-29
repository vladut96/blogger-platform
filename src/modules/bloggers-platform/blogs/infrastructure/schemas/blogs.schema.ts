import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'blogs' })
export class Blog {
  @Prop({ type: String, required: true }) name!: string;
  @Prop({ type: String, required: true }) description!: string;
  @Prop({ type: String, required: true }) websiteUrl!: string;
  @Prop({ type: String, required: true }) createdAt!: string;
  @Prop({ type: Boolean, required: true, default: false })
  isMembership!: boolean;
}

export type BlogDocument = HydratedDocument<Blog>;
export const BlogSchema = SchemaFactory.createForClass(Blog);
