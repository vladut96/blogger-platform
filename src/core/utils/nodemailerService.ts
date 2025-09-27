import nodemailer, { SendMailOptions, Transporter } from 'nodemailer';
import { SentMessageInfo } from 'nodemailer';
import { EmailDto } from '../dto/email.dto';

interface EmailConfig {
  service: string;
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

class NodemailerService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'Gmail',
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER || 'grishchenko.vladislav.work@gmail.com',
        pass: process.env.EMAIL_PASS || 'xtfx rmty yisa cjeh', // лучше вынести в .env
      },
    } as EmailConfig);
  }

  async sendEmail(
    to: string | EmailDto,
    code: string,
    emailTemplate: { subject: string; html: string; text?: string },
  ): Promise<SentMessageInfo> {
    const recipient = typeof to === 'string' ? to : to.email;

    const mailOptions: SendMailOptions = {
      from: `Vladislav <${process.env.EMAIL_USER}>`,
      to: recipient,
      subject: emailTemplate.subject,
      html: emailTemplate.html.replace(/{{code}}/g, code),
      text: emailTemplate.text?.replace(/{{code}}/g, code),
    };

    return this.transporter.sendMail(mailOptions);
  }

  // Шаблоны писем
  emailTemplates = {
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
}

export const nodemailerService = new NodemailerService();
