import { LikeStatus, NewestLike, PostData, PostInputModel, PostPersistence, PostPersistenceWithoutId, PostViewModel } from '../../../../core/types/types';
export declare class PostEntity {
    readonly id: string | null;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
    readonly createdAt: string;
    likesCount: number;
    dislikesCount: number;
    constructor(id: string | null, title: string, shortDescription: string, content: string, blogId: string, blogName: string, createdAt: string, likesCount?: number, dislikesCount?: number);
    static fromPersistence(persisted: PostPersistence): PostEntity;
    static create(dto: PostData): PostEntity;
    update(updateData: PostInputModel, blogName?: string): void;
    toViewModel(myStatus?: LikeStatus, newestLikes?: NewestLike[]): PostViewModel;
    toPersistence(): PostPersistenceWithoutId;
}
