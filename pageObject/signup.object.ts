import { Page, Locator, expect } from '@playwright/test';
import { ISignUp } from '../interface/signup.interface';
import { Assertion } from './assert.object';
import { ESignupLocator } from '../enums/signup.enum';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

export class SignUpPage extends Assertion {
    private page: Page;
    private emailInput: Locator;
    private firstNameInput: Locator;
    private lastNameInput: Locator;
    private passwordInput: Locator;
    private confirmPasswordInput: Locator;
    private policyCheckbox: Locator;
    private signUpButton: Locator;
    private twoFAInput: Locator;
    private resendButton: Locator;
    private emailError: Locator;
    private passwordError: Locator;
    private errorModal: Locator

    constructor(page: Page) {
        super();
        this.page = page;
        this.emailInput = page.getByRole('textbox', { name: 'Email' })
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' })
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' })
        this.passwordInput = page.getByRole('textbox', { name: 'Password', exact: true })
        this.confirmPasswordInput = page.getByRole('textbox', { name: 'Confirm Password' })
        this.policyCheckbox = page.getByRole('checkbox')
        this.signUpButton = page.getByRole('button', { name: 'Sign up' })
        this.twoFAInput = page.locator("input[class='disabled:cursor-not-allowed']")
        this.resendButton = page.getByText('resend')
        this.emailError = page.locator('form div').filter({ hasText: 'This email has already been' })
        this.passwordError = page.locator('div').filter({ hasText: /^Passwords do not match\.$/ })
        this.errorModal = page.getByRole('dialog')
    }

    private async fillInput(element: Locator, value: string): Promise<void> {
        await expect(element).toBeVisible(); // Ensure field is visible before filling
        await element.fill(value);
    }

    async goToSignUpPage(): Promise<void> {
        await this.page.goto(`${BASE_URL}/sign-up/investor`);
    }

    async signUp(config: ISignUp): Promise<void> {
        await this.fillInput(this.emailInput, config.email as string)
        await this.fillInput(this.firstNameInput, config.firstName as string)
        await this.fillInput(this.lastNameInput, config.lastName as string)
        await this.fillInput(this.passwordInput, config.password as string)
        await this.fillInput(this.confirmPasswordInput, config.confirmPassword as string)
        await this.policyCheckbox.check();
        await this.signUpButton.click();
    }

    async fillSignUpForm(config: ISignUp): Promise<void> {
        await this.fillInput(this.emailInput, config.email as string)
        await this.fillInput(this.firstNameInput, config.firstName as string)
        await this.fillInput(this.lastNameInput, config.lastName as string)
        await this.fillInput(this.passwordInput, config.password as string)
        await this.fillInput(this.confirmPasswordInput, config.confirmPassword as string)
        if (config.checkPolicy) {
            await this.policyCheckbox.check();
        }
    }

    async clearInput(): Promise<void> {
        await this.emailInput.clear();
        await this.firstNameInput.clear();
        await this.lastNameInput.clear();
        await this.passwordInput.clear();
        await this.confirmPasswordInput.clear();
    }

    async clickSignUpButton(): Promise<void> {
        await this.signUpButton.click();
    }

    async inputEmailOTP(otp: string): Promise<void> {
        await this.fillInput(this.twoFAInput, otp);
    }

    // Assert
    async checkTitle(expectedText: string): Promise<void> {
        await expect(this.page).toHaveTitle(expectedText);
    }

    async checkVisible(locator: ESignupLocator): Promise<void> {
        switch (locator) {
            case ESignupLocator.ErrorModal:
                await super.assertVisible(this.errorModal)
        }
    }

    async checkButtonDisabled(locator: ESignupLocator): Promise<void> {
        switch (locator) {
            case ESignupLocator.SignUpButton:
                await super.assertButtonDisabled(this.signUpButton)
                break;
        }
    }

    async checkButtonEnabled(locator: ESignupLocator): Promise<void> {
        switch (locator) {
            case ESignupLocator.SignUpButton:
                await super.assertButtonEnabled(this.emailInput)
                break;
        }
    }

    async checkTextLength(locator: ESignupLocator, expectLength: number): Promise<void> {
        switch (locator) {
            case ESignupLocator.EmailInput:
                await super.assertTextLength(this.emailInput, expectLength)
                break
        }
    }

    async checkErrorMessage(option: { locator: ESignupLocator, expectedText: string }): Promise<void> {
        switch (option.locator) {
            case ESignupLocator.EmailInput:
                await super.checkText(this.emailError, option.expectedText)
                break;
            case ESignupLocator.PasswordInput:
                await super.checkText(this.passwordError, option.expectedText)
                break;
        }
    }
}