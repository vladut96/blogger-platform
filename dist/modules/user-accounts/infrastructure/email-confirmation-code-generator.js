"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailConfirmationFactory = exports.EmailConfirmation = void 0;
const crypto_1 = require("crypto");
const date_fns_1 = require("date-fns");
class EmailConfirmation {
    constructor(data) {
        this.confirmationCode = data.confirmationCode;
        this.expirationDate = data.expirationDate;
        this.isConfirmed = data.isConfirmed;
    }
}
exports.EmailConfirmation = EmailConfirmation;
class EmailConfirmationFactory {
    static create() {
        return new EmailConfirmation({
            confirmationCode: (0, crypto_1.randomUUID)(),
            expirationDate: (0, date_fns_1.add)(new Date(), { hours: 1, minutes: 30 }),
            isConfirmed: false,
        });
    }
    static createDefault() {
        return new EmailConfirmation({
            confirmationCode: null,
            expirationDate: null,
            isConfirmed: true,
        });
    }
}
exports.EmailConfirmationFactory = EmailConfirmationFactory;
//# sourceMappingURL=email-confirmation-code-generator.js.map