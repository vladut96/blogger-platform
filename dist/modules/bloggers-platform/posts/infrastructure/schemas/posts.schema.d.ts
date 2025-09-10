import { HydratedDocument } from 'mongoose';
export declare class Post {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
    createdAt: string;
    likesCount: number;
    dislikesCount: number;
}
export type PostDocument = HydratedDocument<Post>;
export declare const PostSchema: import("mongoose").Schema<Post, import("mongoose").Model<Post, any, any, any, import("mongoose").Document<unknown, any, Post, any, {}> & Post & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Post, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Post>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Post> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
