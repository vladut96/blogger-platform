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
exports.SecurityDevicesRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_schema_1 = require("../schemas/auth.schema");
const mongoose_2 = require("mongoose");
let SecurityDevicesRepository = class SecurityDevicesRepository {
    constructor(deviceSession) {
        this.deviceSession = deviceSession;
    }
    async createDeviceSession(sessionData) {
        return await this.deviceSession.create(sessionData);
    }
    async updateDeviceSession(sessionData) {
        const result = await this.deviceSession.updateOne({ deviceId: sessionData.deviceId }, {
            $set: {
                lastActiveDate: sessionData.lastActiveDate,
                exp: sessionData.exp,
            },
        });
        return result.matchedCount === 1;
    }
    async getDevices(userId) {
        return this.deviceSession
            .find({ userId }, { _id: 0, ip: 1, title: 1, lastActiveDate: 1, deviceId: 1 })
            .lean();
    }
    async findSessionByDeviceId(deviceId) {
        return this.deviceSession.findOne({ deviceId }).lean();
    }
    async deleteOneDeviceSession(deviceId) {
        return this.deviceSession.deleteOne({ deviceId });
    }
    async deleteAllExceptCurrent(userId, currentDeviceId) {
        await this.deviceSession
            .deleteMany({
            userId,
            deviceId: { $ne: currentDeviceId },
        })
            .exec();
    }
};
exports.SecurityDevicesRepository = SecurityDevicesRepository;
exports.SecurityDevicesRepository = SecurityDevicesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(auth_schema_1.DeviceSession.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SecurityDevicesRepository);
//# sourceMappingURL=security-devices.repository.js.map