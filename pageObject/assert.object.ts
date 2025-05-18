import { Locator, expect } from '@playwright/test';

export class Assertion {

    constructor() { }

    async assertVisible(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible();
    }

    async assertButtonDisabled(locator: Locator): Promise<void> {
        await expect(locator).toBeDisabled();
    }

    async assertButtonEnabled(locator: Locator): Promise<void> {
        await expect(locator).toBeEnabled();
    }

    async checkText(locator: Locator, expectedText: string): Promise<void> {
        await expect(locator).toHaveText(expectedText);
    }

    async assertTextLength(locator: Locator, expectLength: number): Promise<void> {
        const length = await locator.textContent()
        await expect(length?.length).toBe(expectLength);
    }
}