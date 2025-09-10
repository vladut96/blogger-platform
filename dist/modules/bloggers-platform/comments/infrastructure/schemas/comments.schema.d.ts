import { HydratedDocument } from 'mongoose';
import { LikeStatus } from '../../../../../core/types/types';
export declare class Comment {
    postId: string;
    content: string;
    commentatorInfo: {
        userId: string;
        userLogin: string;
    };
    createdAt: string;
    likes: {
        userId: string;
        status: LikeStatus;
        createdAt: Date;
    }[];
    likesCount: number;
    dislikesCount: number;
}
export type CommentDocument = HydratedDocument<Comment>;
export declare const CommentSchema: import("mongoose").Schema<Comment, import("mongoose").Model<Comment, any, any, any, import("mongoose").Document<unknown, any, Comment, any, {}> & Comment & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Comment, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Comment>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Comment> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
