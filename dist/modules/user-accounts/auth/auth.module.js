"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_controller_1 = require("./api/auth.controller");
const auth_service_1 = require("./application/auth.service");
const auth_schema_1 = require("./infrastracture/schemas/auth.schema");
const users_module_1 = require("../users/users.module");
const security_devices_repository_1 = require("./infrastracture/repositories/security-devices.repository");
const security_devices_service_1 = require("./application/security-devices.service");
const security_devices_controller_1 = require("./api/security-devices.controller");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: auth_schema_1.DeviceSession.name, schema: auth_schema_1.DeviceSessionSchema },
            ]),
            users_module_1.UsersModule,
        ],
        controllers: [auth_controller_1.AuthController, security_devices_controller_1.SecurityDevicesController],
        providers: [auth_service_1.AuthService, security_devices_service_1.SecurityDevicesService, security_devices_repository_1.SecurityDevicesRepository],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map