"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateTokens = (user, deviceId) => {
    const accessTokenExpiresIn = '1000000s';
    const refreshTokenExpiresIn = '20s';
    const accessToken = jsonwebtoken_1.default.sign({
        email: user.email,
        login: user.login,
        userId: user._id.toString(),
    }, process.env.JWT_SECRET, { expiresIn: accessTokenExpiresIn });
    const refreshToken = jsonwebtoken_1.default.sign({
        userId: user._id.toString(),
        deviceId,
    }, process.env.JWT_REFRESH_SECRET, { expiresIn: refreshTokenExpiresIn });
    return {
        accessToken,
        refreshToken,
    };
};
exports.generateTokens = generateTokens;
//# sourceMappingURL=generateTokens.js.map