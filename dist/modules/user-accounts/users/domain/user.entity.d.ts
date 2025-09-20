import { EmailConfirmation, UserDBModel, UserInputModel, UserToPersistence } from '../../../../core/types/types';
export declare class UserEntity {
    readonly id: string | null;
    readonly login: string;
    readonly email: string;
    readonly passwordHash: string;
    readonly emailConfirmation: EmailConfirmation;
    readonly passwordRecovery: {
        recoveryCode: string | null;
        expirationDate: Date | null;
    };
    readonly createdAt: string;
    constructor(id: string | null, login: string, email: string, passwordHash: string, emailConfirmation: EmailConfirmation, passwordRecovery: {
        recoveryCode: string | null;
        expirationDate: Date | null;
    }, createdAt: string);
    static fromPersistence(persisted: UserDBModel): UserEntity;
    static create(dto: UserInputModel): Promise<UserEntity>;
    static register(dto: UserInputModel): Promise<UserEntity>;
    toViewModel(): {
        id: string;
        login: string;
        email: string;
        createdAt: string;
    };
    toPersistence(): UserToPersistence;
}
