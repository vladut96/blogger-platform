"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
const common_1 = require("@nestjs/common");
class ValidationException extends common_1.HttpException {
    constructor(errors) {
        const normalized = Array.isArray(errors) ? errors : [errors];
        const response = {
            errorsMessages: normalized,
        };
        super(response, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.ValidationException = ValidationException;
//# sourceMappingURL=custom-validation.exception.js.map