"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashPassword = async (password) => {
    return await bcryptjs_1.default.hash(password, 10);
};
exports.hashPassword = hashPassword;
const comparePasswords = async (plainPassword, hashedPassword) => {
    return await bcryptjs_1.default.compare(plainPassword, hashedPassword);
};
exports.comparePasswords = comparePasswords;
//# sourceMappingURL=passwordUtils.js.map