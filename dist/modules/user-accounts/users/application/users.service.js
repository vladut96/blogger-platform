"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const inversify_1 = require("inversify");
const user_entity_1 = require("../domain/user.entity");
const users_repository_1 = require("../infrastructure/repositories/users.repository");
const common_1 = require("@nestjs/common");
const buildPaginator_1 = require("../../../../core/utils/buildPaginator");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async getUsers(query) {
        const { users, totalCount } = await this.usersRepository.getUsers(query);
        const items = users.map((user) => user_entity_1.UserEntity.fromPersistence(user).toViewModel());
        return (0, buildPaginator_1.buildPaginator)(query, totalCount, items);
    }
    async getUserByLoginOrEmail(email, login) {
        return await this.usersRepository.getUserByLoginOrEmail(email, login);
    }
    async findUserByConfirmationCode(code) {
        return await this.usersRepository.findUserByConfirmationCode(code);
    }
    async updateConfirmationStatus(email, status) {
        return await this.usersRepository.updateConfirmationStatus(email, status);
    }
    async updateConfirmationCode(email, newCode, expirationDate) {
        return this.usersRepository.updateConfirmationCode(email, newCode, expirationDate);
    }
    async setPasswordRecoveryCode(dto) {
        return this.usersRepository.setPasswordRecoveryCode(dto);
    }
    async findUserByRecoveryCode(recoveryCode) {
        return this.usersRepository.findUserByRecoveryCode(recoveryCode);
    }
    async updateUserPassword(email, newPasswordHash) {
        return this.usersRepository.updateUserPassword(email, newPasswordHash);
    }
    async createUser(userDTO) {
        const userEntity = await user_entity_1.UserEntity.create(userDTO);
        const createdUser = await this.usersRepository.save(userEntity.toPersistence());
        return user_entity_1.UserEntity.fromPersistence(createdUser).toViewModel();
    }
    async registerUser(userDTO) {
        const userEntity = await user_entity_1.UserEntity.register(userDTO);
        return await this.usersRepository.save(userEntity.toPersistence());
    }
    async deleteUserById(userId) {
        const deletedUser = await this.usersRepository.deleteUserById(userId);
        if (!deletedUser)
            throw new common_1.NotFoundException();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map