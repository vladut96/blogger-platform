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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const nodemailerService_1 = require("../../../../core/utils/nodemailerService");
const inversify_1 = require("inversify");
const users_service_1 = require("../../users/application/users.service");
const email_confirmation_code_generator_1 = require("../../users/infrastructure/email-confirmation-code-generator");
const custom_validation_exception_1 = require("../../../../core/exceptions/custom-validation.exception");
const createFieldError_1 = require("../../../../core/utils/createFieldError");
const crypto_1 = require("crypto");
const passwordUtils_1 = require("../../users/infrastructure/passwordUtils");
const common_1 = require("@nestjs/common");
const generateTokens_1 = require("../../../../core/utils/generateTokens");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_repository_1 = require("../infrastracture/repositories/auth.repository");
let AuthService = class AuthService {
    constructor(usersService, authRepository) {
        this.usersService = usersService;
        this.authRepository = authRepository;
    }
    async authenticateUser(loginOrEmail, password, deviceName, ip) {
        const user = await this.usersService.getUserByLoginOrEmail(loginOrEmail);
        if (!user || !(await (0, passwordUtils_1.comparePasswords)(password, user.passwordHash))) {
            throw new common_1.UnauthorizedException((0, createFieldError_1.createFieldError)('Invalid login or password', 'loginOrEmail'));
        }
        const deviceId = (0, crypto_1.randomUUID)();
        const { accessToken, refreshToken } = (0, generateTokens_1.generateTokens)(user, deviceId);
        const refreshDecode = jsonwebtoken_1.default.decode(refreshToken);
        await this.authRepository.createDeviceSession({
            userId: user._id.toString(),
            deviceId,
            lastActiveDate: new Date(refreshDecode.iat * 1000).toISOString(),
            title: deviceName,
            ip,
            exp: new Date(refreshDecode.exp * 1000).toISOString(),
        });
        return { accessToken, refreshToken };
    }
    async registerUser(dto) {
        const existingUser = await this.usersService.getUserByLoginOrEmail(dto.email, dto.login);
        if (existingUser)
            throw new custom_validation_exception_1.ValidationException((0, createFieldError_1.createFieldError)('User already exists', 'user'));
        const newUser = await this.usersService.registerUser(dto);
        await nodemailerService_1.nodemailerService.sendEmail(dto.email, newUser.emailConfirmation.confirmationCode, nodemailerService_1.nodemailerService.emailTemplates.registrationEmail);
    }
    async confirmEmail(code) {
        const user = await this.usersService.findUserByConfirmationCode(code);
        if (!user ||
            user.emailConfirmation.isConfirmed ||
            new Date() > user.emailConfirmation.expirationDate) {
            throw new custom_validation_exception_1.ValidationException((0, createFieldError_1.createFieldError)('email', 'The confirmation code is incorrect, expired or already been applied'));
        }
        return this.usersService.updateConfirmationStatus(user.email, true);
    }
    async resendConfirmationEmail(email) {
        const user = await this.usersService.getUserByLoginOrEmail(email);
        if (!user || user.emailConfirmation.isConfirmed)
            throw new custom_validation_exception_1.ValidationException((0, createFieldError_1.createFieldError)('The confirmation code is incorrect, expired or already been applied', 'user'));
        const newConfirmation = email_confirmation_code_generator_1.EmailConfirmationFactory.create();
        const updated = await this.usersService.updateConfirmationCode(email, newConfirmation.confirmationCode, newConfirmation.expirationDate);
        if (!updated)
            throw new custom_validation_exception_1.ValidationException((0, createFieldError_1.createFieldError)('The confirmation code is incorrect, expired or already been applied', 'user'));
        void nodemailerService_1.nodemailerService.sendEmail(email, newConfirmation.confirmationCode, nodemailerService_1.nodemailerService.emailTemplates.registrationEmail);
    }
    async requestPasswordRecovery(email) {
        const user = await this.usersService.getUserByLoginOrEmail(email);
        if (!user)
            return;
        const recoveryCode = (0, crypto_1.randomUUID)();
        const expirationDate = new Date(Date.now() + 3600000);
        const updated = await this.usersService.setPasswordRecoveryCode({
            email,
            recoveryCode,
            expirationDate,
        });
        if (updated)
            await nodemailerService_1.nodemailerService.sendEmail(email, recoveryCode, nodemailerService_1.nodemailerService.emailTemplates.passwordRecoveryEmail);
    }
    async confirmPasswordRecovery(dto) {
        const user = await this.usersService.findUserByRecoveryCode(dto.recoveryCode);
        if (!user ||
            !user.passwordRecovery ||
            new Date() > user.passwordRecovery.expirationDate) {
            return false;
        }
        const passwordHash = await (0, passwordUtils_1.hashPassword)(dto.newPassword);
        return this.usersService.updateUserPassword(user.email, passwordHash);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_repository_1.AuthRepository])
], AuthService);
//# sourceMappingURL=auth.service.js.map