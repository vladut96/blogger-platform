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
        user: 'grishchenko.vladislav.work@gmail.com',
        pass: 'xtfx rmty yisa cjeh',
      },
    } as EmailConfig);
  }

  async sendEmail(
    to: string | EmailDto,
    confirmationCode: string,
    emailTemplate: { subject: string; html: string; text?: string },
  ): Promise<SentMessageInfo> {
    const recipient = typeof to === 'string' ? to : to.email;

    const mailOptions: SendMailOptions = {
      from: 'Vladislav <grishchenko.vladislav.work@gmail.com>',
      to: recipient,
      subject: emailTemplate.subject,
      html: emailTemplate.html.replace(/{{code}}/g, confirmationCode),
      text: emailTemplate.text?.replace(/{{code}}/g, confirmationCode),
    };

    return this.transporter.sendMail(mailOptions);
  }

  emailTemplates = {
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
}

export const nodemailerService = new NodemailerService();
