"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardsModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./jwt.strategy");
const basic_strategy_1 = require("./basic.strategy");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const basic_auth_guard_1 = require("./basic-auth.guard");
const optinal_jwt_auth_guard_1 = require("./optinal-jwt-auth-guard");
const jwt_refresh_guard_1 = require("./jwt-refresh.guard");
const jwt_refresh_strategy_1 = require("./jwt-refresh.strategy");
const auth_module_1 = require("../../modules/user-accounts/auth/auth.module");
let GuardsModule = class GuardsModule {
};
exports.GuardsModule = GuardsModule;
exports.GuardsModule = GuardsModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'secret123',
            }),
        ],
        providers: [
            jwt_strategy_1.JwtStrategy,
            basic_strategy_1.BasicStrategy,
            jwt_auth_guard_1.JwtAuthGuard,
            optinal_jwt_auth_guard_1.OptionalJwtAuthGuard,
            basic_auth_guard_1.BasicAuthGuard,
            jwt_refresh_guard_1.JwtRefreshGuard,
            jwt_refresh_strategy_1.JwtRefreshStrategy,
        ],
        exports: [
            jwt_auth_guard_1.JwtAuthGuard,
            optinal_jwt_auth_guard_1.OptionalJwtAuthGuard,
            basic_auth_guard_1.BasicAuthGuard,
            jwt_1.JwtModule,
            jwt_refresh_guard_1.JwtRefreshGuard,
            jwt_refresh_strategy_1.JwtRefreshStrategy,
        ],
    })
], GuardsModule);
//# sourceMappingURL=guards.module.js.map