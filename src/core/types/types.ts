import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import { EmailDto } from '../dto/email.dto';

export interface FieldError {
  message: string;
  field: string;
}
export interface APIErrorResult {
  errorsMessages: FieldError[];
}
export type LikeStatus = 'Like' | 'Dislike' | 'None';

export interface LikeInfo {
  userId: string;
  status: LikeStatus;
  createdAt: Date;
}
export interface NewestLike {
  addedAt: string;
  userId: string;
  login: string;
}

export interface PostInputModel {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
}
export interface PostPersistence {
  _id: Types.ObjectId;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: string;
  likesCount: number;
  dislikesCount: number;
}
export type PostPersistenceWithoutId = Omit<PostPersistence, '_id'>;

export interface PostViewModel {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: string;
  extendedLikesInfo: {
    likesCount: number;
    dislikesCount: number;
    myStatus: LikeStatus;
    newestLikes: NewestLike[];
  };
}
export type PostData = PostInputModel & { blogName: string };
export interface BlogInputModel {
  name: string;
  description: string;
  websiteUrl: string;
}
export type BlogsToPersistence = BlogInputModel & {
  createdAt: string;
  isMembership: boolean;
};
export interface BlogViewModel {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
  isMembership: boolean;
}
export type BlogPersistence = {
  _id: Types.ObjectId;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
  isMembership: boolean;
};
export interface UserViewModel {
  id: string;
  login: string;
  email: string;
  createdAt: string;
}
export interface UserInputModel {
  login: string;
  password: string;
  email: string;
}
export type UserToPersistence = {
  login: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  emailConfirmation: EmailConfirmation;
  passwordRecovery: PasswordRecovery;
};
export type RecoveryCodeModel = {
  email: string | EmailDto;
  recoveryCode: string;
  expirationDate: Date;
};

export interface MongoID {
  _id: Types.ObjectId;
}
export interface PasswordRecovery {
  recoveryCode: string | null;
  expirationDate: Date | null;
}
export interface RegisterUserDB<T> {
  login: string;
  email: string;
  passwordHash: string;
  createdAt?: string;
  emailConfirmation: T;
  passwordRecovery: PasswordRecovery;
}
export interface UserDBModel extends RegisterUserDB<EmailConfirmation> {
  _id: ObjectId;
}
export interface EmailConfirmation {
  confirmationCode: string | null;
  expirationDate: Date | null;
  isConfirmed: boolean;
}
export interface CommentDBModel<T> {
  id: string;
  postId: string;
  content: string;
  commentatorInfo: T;
  createdAt: string;
  likes: LikeInfo[];
  likesCount: number;
  dislikesCount: number;
}
export type CommentViewModel = {
  id: string;
  content: string;
  commentatorInfo: {
    userId: string;
    userLogin: string;
  };
  createdAt: string;
  likesInfo: {
    likesCount: number;
    dislikesCount: number;
    myStatus: string;
  };
};
export interface CommentatorInfo {
  userId: string;
  userLogin: string;
}
export interface MeViewModel {
  email: string;
  login: string;
  userId: string;
}

export interface JwtUser {
  userId: string;
  login: string;
  email: string;
}
export interface JwtRefreshTokenUser {
  userId: string;
  deviceId: string;
}
export interface RefreshTokenModel extends JwtRefreshTokenUser {
  iat: number;
  exp: number;
}

export interface DeviceAuthSession {
  userId: string;
  deviceId: string;
  lastActiveDate?: string;
  title: string;
  ip: string;
  exp?: string;
}

export interface Paginator<T> {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: T[];
}
export interface PaginationQuery {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  sortDirection: 1 | -1;
}
export interface BlogsQuery extends PaginationQuery {
  searchNameTerm: string | null;
}
export interface UsersQuery extends PaginationQuery {
  searchLoginTerm?: string | null | undefined;
  searchEmailTerm?: string | null | undefined;
}
