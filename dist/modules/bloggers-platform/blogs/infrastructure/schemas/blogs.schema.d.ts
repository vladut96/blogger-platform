import { HydratedDocument } from 'mongoose';
export declare class Blog {
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: string;
    isMembership: boolean;
}
export type BlogDocument = HydratedDocument<Blog>;
export declare const BlogSchema: import("mongoose").Schema<Blog, import("mongoose").Model<Blog, any, any, any, import("mongoose").Document<unknown, any, Blog, any, {}> & Blog & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Blog, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Blog>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Blog> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
