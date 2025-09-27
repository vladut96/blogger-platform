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
                html: `
        <h1>Thank you for your registration</h1>
        <p>To finish registration please follow the link below:</p>
        <a href="https://somesite.com/confirm-email?code={{code}}">
          complete registration
        </a>
      `,
                text: `To finish registration go to: https://somesite.com/confirm-email?code={{code}}`,
            },
            resendRegistrationEmail: {
                subject: 'Confirm Your Registration (Resend)',
                html: `
        <h1>Confirm your registration again</h1>
        <p>You requested a new confirmation email. Please follow the link below:</p>
        <a href="https://somesite.com/confirm-email?code={{code}}">
          complete registration
        </a>
      `,
                text: `New confirmation link: https://somesite.com/confirm-email?code={{code}}`,
            },
            passwordRecoveryEmail: {
                subject: 'Password Recovery',
                html: `
        <h1>Password recovery</h1>
        <p>To reset your password, follow the link below:</p>
        <a href="https://somesite.com/password-recovery?recoveryCode={{code}}">
          recover password
        </a>
      `,
                text: `Recover password: https://somesite.com/password-recovery?recoveryCode={{code}}`,
            },
        };
        this.transporter = nodemailer_1.default.createTransport({
            service: process.env.EMAIL_SERVICE || 'Gmail',
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.EMAIL_PORT || '465'),
            secure: true,
            auth: {
                user: process.env.EMAIL_USER || 'grishchenko.vladislav.work@gmail.com',
                pass: process.env.EMAIL_PASS || 'xtfx rmty yisa cjeh',
            },
        });
    }
    async sendEmail(to, code, emailTemplate) {
        const recipient = typeof to === 'string' ? to : to.email;
        const mailOptions = {
            from: `Vladislav <${process.env.EMAIL_USER}>`,
            to: recipient,
            subject: emailTemplate.subject,
            html: emailTemplate.html.replace(/{{code}}/g, code),
            text: emailTemplate.text?.replace(/{{code}}/g, code),
        };
        return this.transporter.sendMail(mailOptions);
    }
}
exports.nodemailerService = new NodemailerService();
//# sourceMappingURL=nodemailerService.js.map