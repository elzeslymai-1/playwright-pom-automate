import { test } from '../fixture/pageFixture'
import { testData } from '../test-data/testData';
import { ISignUp } from '../interface/signup.interface'
import { ESignupLocator } from '../enums/signup.enum';

const { signupData, errorMessageData, titleData } = testData

test.describe('Sign up Functional', () => {

    test.beforeEach(async ({ signUpPage }) => {
        await signUpPage.goToSignUpPage()
    })

    test.skip('Should be able to sign up with valid data', async ({ signUpPage }) => {
        const data: ISignUp = {
            email: signupData.email,
            firstName: signupData.firstName,
            lastName: signupData.lastName,
            password: signupData.validPassword,
            confirmPassword: signupData.validPassword,
            checkPolicy: true
        }

        await signUpPage.fillSignUpForm(data)
        await signUpPage.checkButtonEnabled(ESignupLocator.SignUpButton)
        await signUpPage.clickSignUpButton()

        await signUpPage.checkTitle(titleData.signupTitle)
    })

    test.skip('Should be able to sign up with email case-sensitive', async ({ signUpPage }) => {
        const data: ISignUp = {
            email: signupData.sensitiveEmail,
            firstName: signupData.firstName,
            lastName: signupData.lastName,
            password: signupData.validPassword,
            confirmPassword: signupData.validPassword,
            checkPolicy: true
        }

        await signUpPage.fillSignUpForm(data)
        await signUpPage.checkButtonEnabled(ESignupLocator.SignUpButton)
        await signUpPage.clickSignUpButton()

        await signUpPage.checkTitle('Verify Email | FFORWARD')
    })

    test('Should not be able to sign up with existing email', async ({ signUpPage, app }) => {
        // TODO :remove mock response after the api is available
        const url: string = `/finstable-ex-service/user/platform/check-email-duplicate?username=${signupData.existingEmail}`
        const apiBody = {
            "success": true,
            "data": {
                "success": true,
                "data": null,
                "message": "Username or Email Duplicated",
                "status": 409
            }
        }
        await app.mockAPIResponse(url, 200, apiBody)

        const data: ISignUp = {
            email: signupData.existingEmail,
            firstName: signupData.firstName,
            lastName: signupData.lastName,
            password: signupData.validPassword,
            confirmPassword: signupData.validPassword,
            checkPolicy: true
        }

        await signUpPage.fillSignUpForm(data)
        await signUpPage.checkButtonEnabled(ESignupLocator.SignUpButton)
        await signUpPage.clickSignUpButton()

        // assert
        await signUpPage.checkErrorMessage({ locator: ESignupLocator.EmailInput, expectedText: errorMessageData.existingEmailError })
    })

    test('Should not be able to sign up with email that has already been registered as an Issuer role', async ({ signUpPage, app }) => {
        // TODO :remove mock response after the api is available
        const url: string = `/finstable-ex-service/user/platform/check-email-duplicate?username=${signupData.issuerEmail}`
        const apiBody = {
            "success": true,
            "data": {
                "success": true,
                "data": null,
                "message": "Username or Email Duplicated",
                "status": 409
            }
        }
        await app.mockAPIResponse(url, 200, apiBody)

        const data: ISignUp = {
            email: signupData.issuerEmail,
            firstName: signupData.firstName,
            lastName: signupData.lastName,
            password: signupData.validPassword,
            confirmPassword: signupData.validPassword,
            checkPolicy: true
        }

        await signUpPage.fillSignUpForm(data)
        await signUpPage.clickSignUpButton()

        // assert
        await signUpPage.checkErrorMessage({ locator: ESignupLocator.EmailInput, expectedText: errorMessageData.existingEmailError })
    })

    test('Should not be able to sign up with email that has already been registered as an Super Admin role', async ({ signUpPage, page }) => {
        const data: ISignUp = {
            email: signupData.superAdminEmail,
            firstName: signupData.firstName,
            lastName: signupData.lastName,
            password: signupData.validPassword,
            confirmPassword: signupData.validPassword,
            checkPolicy: true
        }

        await signUpPage.fillSignUpForm(data)
        await signUpPage.clickSignUpButton()

        // assert
        await signUpPage.checkErrorMessage({ locator: ESignupLocator.EmailInput, expectedText: errorMessageData.existingEmailError })
    })

    test('Should not be able to sign up with email that has already been registered as an Admin role', async ({ signUpPage, app }) => {
        // TODO :remove mock response after the api is available
        const url: string = `/finstable-ex-service/user/platform/check-email-duplicate?username=${signupData.adminEmail}`
        const apiBody = {
            "success": true,
            "data": {
                "success": true,
                "data": null,
                "message": "Username or Email Duplicated",
                "status": 409
            }
        }
        await app.mockAPIResponse(url, 200, apiBody)

        const data: ISignUp = {
            email: signupData.adminEmail,
            firstName: signupData.firstName,
            lastName: signupData.lastName,
            password: signupData.validPassword,
            confirmPassword: signupData.validPassword,
            checkPolicy: true
        }
        await signUpPage.fillSignUpForm(data)
        await signUpPage.clickSignUpButton()

        // assert
        await signUpPage.checkErrorMessage({ locator: ESignupLocator.EmailInput, expectedText: errorMessageData.existingEmailError })
    })

    test('Should not be able to sign up with email that has already been registered as an Officer role', async ({ signUpPage, app }) => {
        // TODO :remove mock response after the api is available
        const url: string = `/finstable-ex-service/user/platform/check-email-duplicate?username=${signupData.officerEmail}`
        const apiBody = {
            "success": true,
            "data": {
                "success": true,
                "data": null,
                "message": "Username or Email Duplicated",
                "status": 409
            }
        }
        await app.mockAPIResponse(url, 200, apiBody)

        const data: ISignUp = {
            email: signupData.officerEmail,
            firstName: signupData.firstName,
            lastName: signupData.lastName,
            password: signupData.validPassword,
            confirmPassword: signupData.validPassword,
            checkPolicy: true
        }

        await signUpPage.fillSignUpForm(data)
        await signUpPage.clickSignUpButton()

        // assert
        await signUpPage.checkErrorMessage({ locator: ESignupLocator.EmailInput, expectedText: errorMessageData.existingEmailError })
    })

    test('Should not be able to sign up with password that not meet the criteria', async ({ signUpPage }) => {
        const data: ISignUp = {
            email: signupData.email,
            firstName: signupData.firstName,
            lastName: signupData.lastName,
            password: signupData.noSpecialPassword,
            confirmPassword: signupData.noSpecialPassword,
            checkPolicy: true
        }

        await signUpPage.fillSignUpForm(data)
        // assert
        await signUpPage.checkButtonDisabled(ESignupLocator.SignUpButton)
    })

    test('Should not be able to sign up with password that not match', async ({ signUpPage }) => {
        const data: ISignUp = {
            email: signupData.email,
            firstName: signupData.firstName,
            lastName: signupData.lastName,
            password: signupData.validPassword,
            confirmPassword: signupData.validPassword + '1',
            checkPolicy: true
        }

        await signUpPage.fillSignUpForm(data)
        // assert
        await signUpPage.checkErrorMessage({ locator: ESignupLocator.PasswordInput, expectedText: errorMessageData.passwordNotMatchError })
    })

    test('Should not be able to sign up without accepting the policy', async ({ signUpPage }) => {
        const data: ISignUp = {
            email: signupData.email,
            firstName: signupData.firstName,
            lastName: signupData.lastName,
            password: signupData.validPassword,
            confirmPassword: signupData.validPassword,
            checkPolicy: false
        }

        await signUpPage.fillSignUpForm(data)
        // assert
        await signUpPage.checkButtonDisabled(ESignupLocator.SignUpButton)
    })

    test('Should display error modal when service is down', async ({ signUpPage, app }) => {
        // mock api response to simulate service down
        const url: string = `/finstable-ex-service/user/platform/check-email-duplicate?username=${signupData.validEmail}`
        await app.mockAPIResponse(url, 500)

        const data: ISignUp = {
            email: signupData.validEmail,
            firstName: signupData.firstName,
            lastName: signupData.lastName,
            password: signupData.validPassword,
            confirmPassword: signupData.validPassword,
            checkPolicy: true
        }

        await signUpPage.fillSignUpForm(data)
        await signUpPage.clickSignUpButton()
        // assert
        await signUpPage.checkVisible(ESignupLocator.ErrorModal)
    })

})