import { test } from '../fixture/pageFixture'
import { testData } from '../test-data/testData';
import { I2TwoFAConfig } from '../interface/app.interface'
import { ISignIn } from '../interface/signin.interface'

const {
    mailslurpData,
    signupData

} = testData

test.describe.skip('SignIn Page', () => {
    test('should be able to sign in with 2FA', async ({ signInPage, app }) => {
        await signInPage.goToSignInPage()

        const signinData: ISignIn = {
            email: mailslurpData.email,
            password: signupData.validPassword
        }

        await signInPage.signIn(signinData)

        // Expect to redirect to verify 2FA page
        await signInPage.checkTitle('2FA Verification | FFORWARD')

        const TwoFAConfig: I2TwoFAConfig = {
            issuer: 'FFORWARD',
            secret: mailslurpData.apiKey
        }

        const twoFA = await app.getTwoFA(TwoFAConfig)

        await signInPage.inputTwoFA(twoFA)

        // Expect to redirect to profile page
        await signInPage.checkTitle('Profile | FFORWARD')
    })
})