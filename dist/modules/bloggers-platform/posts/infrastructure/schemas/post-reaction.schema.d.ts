import { HydratedDocument } from 'mongoose';
export declare class PostReaction {
    postId: string;
    userId: string;
    userLogin: string;
    status: 'None' | 'Like' | 'Dislike';
    addedAt: string;
}
export type PostReactionDocument = HydratedDocument<PostReaction>;
export declare const PostReactionSchema: import("mongoose").Schema<PostReaction, import("mongoose").Model<PostReaction, any, any, any, import("mongoose").Document<unknown, any, PostReaction, any, {}> & PostReaction & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PostReaction, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PostReaction>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PostReaction> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
