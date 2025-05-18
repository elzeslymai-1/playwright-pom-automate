import { Page } from '@playwright/test';
import { GetEmailsSortEnum, MailSlurp } from 'mailslurp-client';
import * as OTPAuth from "otpauth";
import { I2TwoFAConfig, ICreateMailSlurp } from '../interface/app.interface';
import { testData } from '../test-data/testData';

const { mailslurpData } = testData
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000'

export class App {
    private page: Page;
    private mailslurp: MailSlurp

    constructor(page: Page) {
        this.page = page
        this.mailslurp = new MailSlurp({ apiKey: mailslurpData.apiKey });
    }

    async getEmailOTP(mail_id: string = mailslurpData.mail_id): Promise<number> {
        const email = await this.mailslurp.waitForLatestEmail(mail_id, 120000, true);
        const rawBody: string[] = email.body?.match(/<p>(\d)<\/p>/g) as string[]
        const otp: string = rawBody ? rawBody.map(m => m.replace(/<\/?p>/g, '')).join('') : '';

        return parseInt(otp)
    }

    //TODO: Need to fix
    async getEmails(inboxId: string): Promise<any> {
        return await this.mailslurp.getEmails(inboxId)
    }

    async createNewEmailInbox(): Promise<ICreateMailSlurp> {
        const { id, emailAddress } = await this.mailslurp.createInbox();

        return { inboxId: id, emailAddress }
    }

    async deleteEmailInbox(mail_id: string = ''): Promise<void> {
        await this.mailslurp.deleteInbox(mail_id);
    }

    //TODO: Need to fix
    async deleteAllEmail(inboxId: string): Promise<void> {
        const allEmails = await this.getEmails(inboxId);

        await Promise.all(
            allEmails.map(email => this.mailslurp.deleteEmail(email.id))
        )
    }

    async getTwoFA(config: I2TwoFAConfig): Promise<string> {
        const totp = new OTPAuth.TOTP({
            issuer: config.issuer,
            algorithm: 'SHA1',
            digits: 6,
            period: 30,
            secret: config.secret
        })
        return totp.generate();
    }

    async mockAPIResponse(path: string, status: number, body?: object): Promise<void> {
        await this.page.route(`${BACKEND_URL}${path}`, route => {
            route.fulfill({
                status,
                contentType: 'application/json',
                body: JSON.stringify(body || {
                    "Code": status,
                    "Message": "Mockup Response Error"
                })
            });
        });
    }
}