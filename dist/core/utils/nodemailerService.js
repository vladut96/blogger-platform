"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodemailerService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class NodemailerService {
    constructor() {
        this.emailTemplates = {
            registrationEmail: {
                subject: 'Confirm Your Registration',
                html: `<p>Confirm: https://somesite.com/confirm-email?code={{code}}</p>`,
                text: `Confirm: https://somesite.com/confirm-email?code={{code}}`,
            },
            passwordRecoveryEmail: {
                subject: 'Password Recovery',
                html: `<p>Recover: https://somesite.com/password-recovery?recoveryCode={{code}}</p>`,
                text: `Recover: https://somesite.com/password-recovery?recoveryCode={{code}}`,
            },
        };
        this.transporter = nodemailer_1.default.createTransport({
            service: process.env.EMAIL_SERVICE || 'Gmail',
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.EMAIL_PORT || '465'),
            secure: true,
            auth: {
                user: 'grishchenko.vladislav.work@gmail.com',
                pass: 'xtfx rmty yisa cjeh',
            },
        });
    }
    async sendEmail(to, confirmationCode, emailTemplate) {
        const recipient = typeof to === 'string' ? to : to.email;
        const mailOptions = {
            from: 'Vladislav <grishchenko.vladislav.work@gmail.com>',
            to: recipient,
            subject: emailTemplate.subject,
            html: emailTemplate.html.replace(/{{code}}/g, confirmationCode),
            text: emailTemplate.text?.replace(/{{code}}/g, confirmationCode),
        };
        return this.transporter.sendMail(mailOptions);
    }
}
exports.nodemailerService = new NodemailerService();
//# sourceMappingURL=nodemailerService.js.map