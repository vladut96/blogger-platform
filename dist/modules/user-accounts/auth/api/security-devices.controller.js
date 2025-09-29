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
exports.SecurityDevicesController = void 0;
const common_1 = require("@nestjs/common");
const security_devices_service_1 = require("../application/security-devices.service");
const currentUser_JWT_1 = require("../../../../core/decorators/currentUser-JWT");
const jwt_refresh_guard_1 = require("../../../../core/guards/jwt-refresh.guard");
let SecurityDevicesController = class SecurityDevicesController {
    constructor(securityDevicesService) {
        this.securityDevicesService = securityDevicesService;
    }
    async getDevices(user) {
        return await this.securityDevicesService.getDevices(user.userId);
    }
    async deleteDevice(deviceId, user) {
        await this.securityDevicesService.deleteDeviceSession(user.userId, deviceId);
    }
    async deleteAllExceptCurrent(user) {
        await this.securityDevicesService.deleteAllExceptCurrent(user.userId, user.deviceId);
    }
};
exports.SecurityDevicesController = SecurityDevicesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, currentUser_JWT_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SecurityDevicesController.prototype, "getDevices", null);
__decorate([
    (0, common_1.Delete)(':deviceId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('deviceId')),
    __param(1, (0, currentUser_JWT_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SecurityDevicesController.prototype, "deleteDevice", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, currentUser_JWT_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SecurityDevicesController.prototype, "deleteAllExceptCurrent", null);
exports.SecurityDevicesController = SecurityDevicesController = __decorate([
    (0, common_1.UseGuards)(jwt_refresh_guard_1.JwtRefreshGuard),
    (0, common_1.Controller)('security/devices'),
    __metadata("design:paramtypes", [security_devices_service_1.SecurityDevicesService])
], SecurityDevicesController);
//# sourceMappingURL=security-devices.controller.js.map