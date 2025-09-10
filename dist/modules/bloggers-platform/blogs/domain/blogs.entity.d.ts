import { BlogInputModel, BlogPersistence, BlogsToPersistence } from '../../../../core/types/types';
export declare class BlogsEntity {
    readonly id: string | null;
    name: string;
    description: string;
    websiteUrl: string;
    readonly createdAt: string;
    readonly isMembership: boolean;
    constructor(id: string | null, name: string, description: string, websiteUrl: string, createdAt: string, isMembership: boolean);
    static fromPersistence(persisted: BlogPersistence): BlogsEntity;
    static create(dto: BlogInputModel): BlogsEntity;
    toViewModel(): {
        id: string;
        name: string;
        description: string;
        websiteUrl: string;
        createdAt: string;
        isMembership: boolean;
    };
    update(dto: BlogInputModel): void;
    toPersistence(): BlogsToPersistence;
}
