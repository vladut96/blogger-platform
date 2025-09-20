import { ObjectId } from 'mongodb';
export declare const generateTokens: (user: {
    _id: ObjectId;
    email: string;
    login: string;
}, deviceId: string) => {
    accessToken: string;
    refreshToken: string;
};
