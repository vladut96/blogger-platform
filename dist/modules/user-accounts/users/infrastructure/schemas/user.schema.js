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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let EmailConfirmation = class EmailConfirmation {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], EmailConfirmation.prototype, "confirmationCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], EmailConfirmation.prototype, "expirationDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], EmailConfirmation.prototype, "isConfirmed", void 0);
EmailConfirmation = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], EmailConfirmation);
let PasswordRecovery = class PasswordRecovery {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], PasswordRecovery.prototype, "recoveryCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], PasswordRecovery.prototype, "expirationDate", void 0);
PasswordRecovery = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], PasswordRecovery);
let User = class User {
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({ type: String, unique: true, index: true }),
    __metadata("design:type", String)
], User.prototype, "login", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, unique: true, index: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: EmailConfirmation, required: true }),
    __metadata("design:type", EmailConfirmation)
], User.prototype, "emailConfirmation", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: PasswordRecovery,
        default: () => ({ recoveryCode: null, expirationDate: null }),
    }),
    __metadata("design:type", PasswordRecovery)
], User.prototype, "passwordRecovery", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({ collection: 'Users' })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map