import { SentMessageInfo } from 'nodemailer';
import { EmailDto } from '../dto/email.dto';
declare class NodemailerService {
    private transporter;
    constructor();
    sendEmail(to: string | EmailDto, confirmationCode: string, emailTemplate: {
        subject: string;
        html: string;
        text?: string;
    }): Promise<SentMessageInfo>;
    emailTemplates: {
        registrationEmail: {
            subject: string;
            html: string;
            text: string;
        };
        passwordRecoveryEmail: {
            subject: string;
            html: string;
            text: string;
        };
    };
}
export declare const nodemailerService: NodemailerService;
export {};
