"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseMongoIdPipe = void 0;
const mongoose_1 = require("mongoose");
const custom_validation_exception_1 = require("../exceptions/custom-validation.exception");
class ParseMongoIdPipe {
    transform(value) {
        if (!(0, mongoose_1.isValidObjectId)(value)) {
            const errors = [
                {
                    message: 'Invalid MongoDB ID format',
                    field: 'id',
                },
            ];
            throw new custom_validation_exception_1.ValidationException(errors);
        }
        return new mongoose_1.Types.ObjectId(value);
    }
}
exports.ParseMongoIdPipe = ParseMongoIdPipe;
//# sourceMappingURL=parse-mongo-id.pipe.js.map