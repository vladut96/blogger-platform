"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const email_confirmation_code_generator_1 = require("../infrastructure/email-confirmation-code-generator");
const passwordUtils_1 = require("../infrastructure/passwordUtils");
class UserEntity {
    constructor(id, login, email, passwordHash, emailConfirmation, passwordRecovery, createdAt) {
        this.id = id;
        this.login = login;
        this.email = email;
        this.passwordHash = passwordHash;
        this.emailConfirmation = emailConfirmation;
        this.passwordRecovery = passwordRecovery;
        this.createdAt = createdAt;
    }
    static fromPersistence(persisted) {
        return new UserEntity(persisted._id.toString(), persisted.login, persisted.email, persisted.passwordHash, persisted.emailConfirmation, persisted.passwordRecovery, persisted.createdAt || new Date().toISOString());
    }
    static async create(dto) {
        const passwordHash = await (0, passwordUtils_1.hashPassword)(dto.password);
        return new UserEntity(null, dto.login, dto.email, passwordHash, email_confirmation_code_generator_1.EmailConfirmationFactory.createDefault(), { recoveryCode: null, expirationDate: null }, new Date().toISOString());
    }
    static async register(dto) {
        const passwordHash = await (0, passwordUtils_1.hashPassword)(dto.password);
        return new UserEntity(null, dto.login, dto.email, passwordHash, email_confirmation_code_generator_1.EmailConfirmationFactory.create(), { recoveryCode: null, expirationDate: null }, new Date().toISOString());
    }
    toViewModel() {
        if (!this.id) {
            throw new Error('UserEntity.toViewModel called without persisted id');
        }
        return {
            id: this.id,
            login: this.login,
            email: this.email,
            createdAt: this.createdAt,
        };
    }
    toPersistence() {
        return {
            login: this.login,
            email: this.email,
            passwordHash: this.passwordHash,
            createdAt: this.createdAt,
            emailConfirmation: this.emailConfirmation,
            passwordRecovery: this.passwordRecovery,
        };
    }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map