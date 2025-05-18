import { test, expect } from '../fixture/pageFixture'
import { testData } from '../test-data/testData';
import { ESignupLocator } from '../enums/signup.enum';

const { signupData, errorMessageData, titleData } = testData

test.describe('Sign up Functional', () => {


    test('Should display an error message when input invalid OTP', async ({ signUpVerifyEmailPage, app }) => {
        // go to signup verify email
        const { inboxId } = await signUpVerifyEmailPage.gotoVerifyEmailPage()

        const invalidOTP: number = signupData.invalidOTP
        await signUpVerifyEmailPage.inputOTP(invalidOTP)

        // assert
        await signUpVerifyEmailPage.checkErrorMessage({ locator: ESignupLocator.OtpErrorMessage, expectedText: errorMessageData.invalidOTPError })
        
        // delete an inbox
        await app.deleteEmailInbox(inboxId)
    })

    test('Should display an error message when input expired OTP', async ({ signUpVerifyEmailPage, page, app }) => {
        // go to signup verify email
        const { inboxId } = await signUpVerifyEmailPage.gotoVerifyEmailPage()
        const otp: number = await app.getEmailOTP(inboxId)

        //TODO: improve expired otp logic
        // wait for 1 minute
        await page.waitForTimeout(60000)
        const expiredOTP: number = otp
        await signUpVerifyEmailPage.inputOTP(expiredOTP)

        // assert
        await signUpVerifyEmailPage.checkErrorMessage({ locator: ESignupLocator.OtpErrorMessage, expectedText: errorMessageData.invalidOTPError })
        
        // delete an inbox
        await app.deleteEmailInbox(inboxId)
    })

    test('Should display an error message when request new OTP and input old OTP', async ({ signUpVerifyEmailPage, page, app }) => {
        //TODO: Discuss for this test case. it need to write script?
        // go to signup verify email
        const { inboxId } = await signUpVerifyEmailPage.gotoVerifyEmailPage()
        const otp: number = await app.getEmailOTP(inboxId)
        
        // wait for 1 minute
        await page.waitForTimeout(60000)

        // resend new OTP
        await signUpVerifyEmailPage.clickResendButton()

        // input old OTP
        await signUpVerifyEmailPage.inputOTP(otp)

        // assert
        await signUpVerifyEmailPage.checkErrorMessage({ locator: ESignupLocator.OtpErrorMessage, expectedText: errorMessageData.invalidOTPError })
    
        // delete an inbox
        await app.deleteEmailInbox(inboxId)
    })

    test('Should be able to get new otp', async ({ signUpVerifyEmailPage, page, app }) => {
        // go to signup verify email
        const { inboxId } = await signUpVerifyEmailPage.gotoVerifyEmailPage()

        await page.waitForTimeout(30000)
        // delete all email in inbox
        await app.deleteAllEmail(inboxId)

        await page.waitForTimeout(30000)
        await signUpVerifyEmailPage.clickResendButton()

        const otp: number = await app.getEmailOTP(inboxId) 

        // input valid OTP
        await signUpVerifyEmailPage.inputOTP(otp)

        // assert    
        await signUpVerifyEmailPage.checkTitle(ESignupLocator.SuccessModal)

        // delete an inbox
        await app.deleteEmailInbox(inboxId)
    })

    test('Should display success modal when input valid OTP', async ({ signUpVerifyEmailPage, page, app }) => {
        // go to signup verify email        
        const { inboxId } = await signUpVerifyEmailPage.gotoVerifyEmailPage()
        const otp: number = await app.getEmailOTP(inboxId)

        // input valid OTP
        await signUpVerifyEmailPage.inputOTP(otp)

        // assert    
        await signUpVerifyEmailPage.checkTitle(ESignupLocator.SuccessModal)
        
        // delete an inbox
        await app.deleteEmailInbox(inboxId)
    })
})