import { Page, Locator, expect } from '@playwright/test';
import { ISignIn } from '../interface/signin.interface';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

export class SignInPage {
    private page: Page;
    private emailInput: Locator;
    private passwordInput: Locator;
    private signInButton: Locator;
    private twoFAInput: Locator;
    private submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByRole('textbox', { name: 'Email' })
        this.passwordInput = page.getByRole('textbox', { name: 'Password' })
        this.signInButton = page.getByRole('button', { name: 'Sign In' })
        this.twoFAInput = page.getByRole('textbox', { name: 'Google 2FA Code' })
        this.submitButton = page.getByRole('button', { name: 'Submit' })
    }

    private async fillInput(element: Locator, value: string): Promise<void> {
        await expect(element).toBeVisible(); // Ensure field is visible before filling
        await element.fill(value);
    }

    async goToSignInPage(): Promise<void> {
        await this.page.goto(BASE_URL);
    }

    async signIn(config : ISignIn): Promise<void> {
        await this.fillInput(this.emailInput, config.email);
        await this.fillInput(this.passwordInput, config.password);
        await this.signInButton.click();
    }

    async inputTwoFA(expectedText: string): Promise<void> {
        await this.fillInput(this.twoFAInput, expectedText);
        await this.submitButton.click();
    }

    async checkTitle(expectedText: string) {
        await expect(this.page).toHaveTitle(expectedText);
    }
}