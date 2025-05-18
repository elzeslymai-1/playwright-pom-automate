import { test } from '../fixture/pageFixture'
import { testData } from '../test-data/testData';
import { ISignUp } from '../interface/signup.interface'
import { ESignupLocator } from '../enums/signup.enum';
import { es } from '@faker-js/faker';

const { signupData } = testData

test.describe.skip('Email Input field', () => {

    test.beforeEach(async ({ signUpPage }) => {
        await signUpPage.goToSignUpPage()
    })

    test('Email Should display error messages when input invalid Email format', async ({ signUpPage }) => {
        const data: ISignUp = {
            email: signupData.invalidEmailFormat,   // Invalid email format
            firstName: signupData.validFirstName,
            lastName: signupData.validLastName,
            password: signupData.validPassword,
            confirmPassword: signupData.validPassword,
            checkPolicy: true
        }

        await signUpPage.fillSignUpForm(data)

        await signUpPage.checkButtonDisabled(ESignupLocator.Email)
    })

    test('Email Should have the limit of 50 characters', async ({ signUpPage }) => {
        const data: ISignUp = {
            email: signupData.exeededEmail, // Exceeded email limit
        }

        await signUpPage.fillSignUpForm(data)

        await signUpPage.checkTextLength(ESignupLocator.Email, 50)

    })

    test('Email Should not allow typing after reaching the limit', async ({ signUpPage }) => {
        const data: ISignUp = {
            email: signupData.exeededEmail, // Exceeded email limit
        }

        await signUpPage.fillSignUpForm(data)

        await signUpPage.checkTextLength(ESignupLocator.Email, 50)
    })

    test('Email Should not allow to input space', async ({ signUpPage }) => {
        const data: ISignUp = {
            email: ' '  // Space
        }

        await signUpPage.fillSignUpForm(data)

        await signUpPage.checkTextLength(ESignupLocator.Email, 0)
    })

    test('Email Should not allow to be empty', async ({ signUpPage }) => {
        const data: ISignUp = {
            firstName: signupData.validFirstName,
            lastName: signupData.validLastName,
            password: signupData.validPassword,
            confirmPassword: signupData.validPassword,
            checkPolicy: true
        }

        await signUpPage.fillSignUpForm(data)

        await signUpPage.checkButtonDisabled(ESignupLocator.signUpButton)
    })
});

test.describe.skip('Firstname Input field', () => {

    test.beforeEach(async ({ signUpPage }) => {
        await signUpPage.goToSignUpPage()
    })

    test('Firstanme Should have the limit of 75 characters', async ({ signUpPage }) => {
        const data: ISignUp = {
            firstName: signupData.exeededFirstName  // Exeeded firstname limit
        }

        await signUpPage.fillSignUpForm(data)

        await signUpPage.checkTextLength(ESignupLocator.FirstName, 75)
    })

    test('Firstanme Should not allow typing after reaching the limit', async ({ signUpPage }) => {
        const data: ISignUp = {
            email: signupData.exeededFirstName, // Exceeded firstname limit
        }

        await signUpPage.fillSignUpForm(data)

        await signUpPage.checkTextLength(ESignupLocator.FirstName, 75)
    })

    test('Firstanme Should not allow to input spaces', async ({ signUpPage }) => {
        const data: ISignUp = {
            firstName: ' '  // Space
        }

        await signUpPage.fillSignUpForm(data)

        await signUpPage.checkTextLength(ESignupLocator.FirstName, 0)
    })

    test('Firstanme Should not allow to input the data that not English', async ({ signUpPage }) => {
        const data: ISignUp = {
            firstName: signupData.koreaFirstName    // Korea firstname
        }

        await signUpPage.fillSignUpForm(data)

        await signUpPage.checkTextLength(ESignupLocator.FirstName, 0)
    })

    test('Firstanme Should not allow to be empty', async ({ signUpPage }) => {
        const data: ISignUp = {
            email: signupData.validEmail,
            lastName: signupData.validLastName,
            password: signupData.validPassword,
            confirmPassword: signupData.validPassword,
            checkPolicy: true
        }

        await signUpPage.fillSignUpForm(data)

        await signUpPage.checkButtonDisabled(ESignupLocator.signUpButton)
    })
})

test.describe.skip('Lasname Input field', () => {

    test.beforeEach(async ({ signUpPage }) => {
        await signUpPage.goToSignUpPage()
    })

    test('Lastname Should have the limit of 75 characters', async ({ signUpPage }) => {
        const data: ISignUp = {
            lastName: signupData.exeededLastName  // Exeeded lastname limit
        }

        await signUpPage.fillSignUpForm(data)

        await signUpPage.checkTextLength(ESignupLocator.LastName, 75)
    })

    test('Lastname Should not allow typing after reaching the limit', async ({ signUpPage }) => {
        const data: ISignUp = {
            email: signupData.exeededLastName, // Exceeded lastname limit
        }

        await signUpPage.fillSignUpForm(data)

        await signUpPage.checkTextLength(ESignupLocator.LastName, 75)
    })

    test('Lastname Should not allow to input spaces', async ({ signUpPage }) => {
        const data: ISignUp = {
            lastName: ' '  // Space
        }

        await signUpPage.fillSignUpForm(data)

        await signUpPage.checkTextLength(ESignupLocator.LastName, 0)
    })

    test('Lastname Should not allow to input the data that not English', async ({ signUpPage }) => {
        const data: ISignUp = {
            lastName: signupData.koreaLastName    // Korea lastname
        }

        await signUpPage.fillSignUpForm(data)

        await signUpPage.checkTextLength(ESignupLocator.LastName, 0)
    })

    test('Lastname Should not allow to be empty', async ({ signUpPage }) => {
        const data: ISignUp = {
            email: signupData.validEmail,
            firstName: signupData.validFirstName,
            password: signupData.validPassword,
            confirmPassword: signupData.validPassword,
            checkPolicy: true
        }

        await signUpPage.fillSignUpForm(data)

        await signUpPage.checkButtonDisabled(ESignupLocator.signUpButton)
    })
})

test.describe.skip('Password Input field', () => {

    test.beforeEach(async ({ signUpPage }) => {
        await signUpPage.goToSignUpPage()
    })

    test('Password Should have the limit of 75 characters', async ({ signUpPage }) => {
        const data: ISignUp = {
            lastName: signupData.exeededLastName  // Exeeded lastname limit
        }

        await signUpPage.fillSignUpForm(data)
        await signUpPage.checkTextLength(ESignupLocator.LastName, 75)
    })

    test('Password Should not allow typing after reaching the limit', async ({ signUpPage }) => {
        const data: ISignUp = {
            email: signupData.exeededLastName, // Exceeded lastname limit
        }

        await signUpPage.fillSignUpForm(data)
        await signUpPage.checkTextLength(ESignupLocator.LastName, 75)
    })

    test('Password Should not allow to input spaces', async ({ signUpPage }) => {
        const data: ISignUp = {
            lastName: ' '  // Space
        }

        await signUpPage.fillSignUpForm(data)
        await signUpPage.checkTextLength(ESignupLocator.LastName, 0)
    })

    test('Password Should not allow to input the data that not English', async ({ signUpPage }) => {
        const data: ISignUp = {
            lastName: signupData.koreaLastName    // Korea lastname
        }

        await signUpPage.fillSignUpForm(data)
        await signUpPage.checkTextLength(ESignupLocator.LastName, 0)
    })

    test('Password Should not allow to be empty', async ({ signUpPage }) => {
        const data: ISignUp = {
            email: signupData.validEmail,
            firstName: signupData.validFirstName,
            password: signupData.validPassword,
            confirmPassword: signupData.validPassword,
            checkPolicy: true
        }

        await signUpPage.fillSignUpForm(data)
        await signUpPage.checkButtonDisabled(ESignupLocator.signUpButton)
    })
})
