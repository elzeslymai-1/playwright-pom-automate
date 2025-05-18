import { Page, Locator, expect } from '@playwright/test';
import { Assertion } from './assert.object';
import { ESignupLocator } from '../enums/signup.enum';
import { ISignUp } from '../interface/signup.interface';
import { App } from './app.object';
import { SignUpPage } from './signup.object';
import { testData } from '../test-data/testData';
import { ICreateMailSlurp } from '../interface/app.interface';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

export class SignUpVerifyEmailPage extends Assertion {
    private page: Page;
    private readonly signupData = testData.signupData
    private readonly validateData = testData.errorMessageData;
    
    private app: App;
    private signUpPage: SignUpPage;
    private otpInput: Locator;
    private otpErrorMessage: Locator;
    private resendButton: Locator;
    private successModal: Locator;
    private backToSigninButton: Locator;

    constructor(page: Page) {
        super();
        this.page = page;
        this.app = new App(page)
        this.signUpPage = new SignUpPage(page)
        this.resendButton = page.getByRole('button', { name: 'resend' });
        this.otpInput = page.getByRole('textbox', { name: 'OTP' });
        this.otpErrorMessage = page.getByRole('alert');
        this.successModal = page.getByRole('dialog');
        this.backToSigninButton = page.getByRole('button', { name: 'Sign In' });
    }

    private async fillInput(element: Locator, value: any): Promise<void> {
        await expect(element).toBeVisible(); // Ensure field is visible before filling
        await element.fill(value);
    }

    async gotoVerifyEmailPage(): Promise<ICreateMailSlurp> {
        // create new mailslurp inbox
        const { inboxId, emailAddress } = await this.app.createNewEmailInbox()

        await this.signUpPage.goToSignUpPage()
        const data: ISignUp = {
            email: emailAddress,
            firstName: this.signupData.firstName,
            lastName: this.signupData.lastName,
            password: this.signupData.validPassword,
            confirmPassword: this.signupData.validPassword,
            checkPolicy: true
        }

        await this.signUpPage.fillSignUpForm(data)
        await this.signUpPage.clickSignUpButton()

        return { inboxId, emailAddress }
    }

    async inputOTP(value: string | number): Promise<void> {
        await this.fillInput(this.otpInput, value);
    }

    async clickResendButton(): Promise<void> {
        await this.resendButton.click();
    }

    async checkErrorMessage(option: { locator: ESignupLocator, expectedText: string }): Promise<void> {
        switch (option.locator) {
            case ESignupLocator.OtpErrorMessage:
                await super.checkText(this.otpErrorMessage, option.expectedText)
                break;
        }
    }

    async checkTitle(expectedText: string): Promise<void> {
        await expect(this.page).toHaveTitle(expectedText);
    }

    async checkVisible(locator: ESignupLocator): Promise<void> {
        switch (locator) {
            case ESignupLocator.SuccessModal:
                await super.assertVisible(this.successModal)
                break;
        }
    }
}