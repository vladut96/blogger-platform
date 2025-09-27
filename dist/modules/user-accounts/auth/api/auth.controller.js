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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const ua_parser_js_1 = require("ua-parser-js");
const auth_service_1 = require("../application/auth.service");
const create_user_dto_1 = require("../../users/dto/create-user.dto");
const email_dto_1 = require("../../../../core/dto/email.dto");
const new_password_dto_1 = require("../dto/new-password.dto");
const login_dto_1 = require("../dto/login.dto");
const jwt_auth_guard_1 = require("../../../../core/guards/jwt-auth.guard");
const currentUser_JWT_1 = require("../../../../core/decorators/currentUser-JWT");
const confirmation_code_dto_1 = require("../dto/confirmation-code.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(dto, ip, userAgent, res) {
        const parser = new ua_parser_js_1.UAParser(userAgent);
        const deviceType = parser.getDevice().type || 'desktop';
        const browser = parser.getBrowser().name || 'Unknown Browser';
        const os = parser.getOS().name || 'Unknown OS';
        const deviceName = `${browser} on ${os} (${deviceType})`;
        const authResult = await this.authService.authenticateUser(dto.loginOrEmail, dto.password, deviceName, ip);
        res.cookie('refreshToken', authResult.refreshToken, {
            httpOnly: true,
            secure: true,
        });
        return { accessToken: authResult.accessToken };
    }
    async requestPasswordRecovery(dto) {
        return await this.authService.requestPasswordRecovery(dto.email);
    }
    async setNewPassword(dto) {
        return await this.authService.confirmPasswordRecovery(dto);
    }
    async confirmEmail(dto) {
        return await this.authService.confirmEmail(dto.code);
    }
    async registerUser(dto) {
        await this.authService.registerUser(dto);
    }
    async resendConfirmationEmail(dto) {
        return await this.authService.resendConfirmationEmail(dto.email);
    }
    getMyInfo(user) {
        return {
            email: user.email,
            login: user.login,
            userId: user.userId,
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Ip)()),
    __param(2, (0, common_1.Headers)('user-agent')),
    __param(3, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('password-recovery'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [email_dto_1.EmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestPasswordRecovery", null);
__decorate([
    (0, common_1.Post)('new-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [new_password_dto_1.NewPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "setNewPassword", null);
__decorate([
    (0, common_1.Post)('registration-confirmation'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirmation_code_dto_1.CodeDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmEmail", null);
__decorate([
    (0, common_1.Post)('registration'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Post)('registration-email-resending'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [email_dto_1.EmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendConfirmationEmail", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, currentUser_JWT_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getMyInfo", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map