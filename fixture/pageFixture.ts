import { test as base } from '@playwright/test'
import { SignUpPage } from '../pageObject/signup.object'
import { SignInPage } from '../pageObject/signin.object'
import { SignUpVerifyEmailPage } from '../pageObject/signup-verify-email.object'
import { App } from '../pageObject/app.object'

type PageFixture = {
    signInPage: SignInPage
    signUpPage: SignUpPage
    app: App
    signUpVerifyEmailPage: SignUpVerifyEmailPage
}

export const test = base.extend<PageFixture>({
    async app({ page }, use) {
        const app = new App(page)
        await use(app)
    },
    async signInPage({ page }, use) {
        const signInPage = new SignInPage(page)
        await use(signInPage)
    },
    async signUpPage({ page }, use) {
        const signUpPage = new SignUpPage(page)
        await use(signUpPage)
    },
    async signUpVerifyEmailPage({ page }, use) {
        const verifyEmailPage = new SignUpVerifyEmailPage(page)
        await use(verifyEmailPage)
    }
})

export { expect } from '@playwright/test';