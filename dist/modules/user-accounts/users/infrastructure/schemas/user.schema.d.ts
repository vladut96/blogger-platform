import { HydratedDocument } from 'mongoose';
declare class EmailConfirmation {
    confirmationCode: string | null;
    expirationDate: Date | null;
    isConfirmed: boolean;
}
declare class PasswordRecovery {
    recoveryCode: string | null;
    expirationDate: Date | null;
}
export declare class User {
    login: string;
    email: string;
    passwordHash: string;
    createdAt: string;
    emailConfirmation: EmailConfirmation;
    passwordRecovery: PasswordRecovery;
}
export type UserDocument = HydratedDocument<User>;
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User, any, {}> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export {};
