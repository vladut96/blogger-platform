import nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer';
export declare const nodemailerService: {
    transporter: nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo, import("nodemailer/lib/smtp-transport").Options>;
    sendEmail(to: string, confirmationCode: string, emailTemplate: {
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
};
