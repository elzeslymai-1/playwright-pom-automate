import { config } from '../config'
import { faker, fakerKO } from '@faker-js/faker'

export const SignupData = {
    // Email
    "validEmail": config.email,
    "email": faker.internet.email({ firstName: 'fforward', lastName: 'test', provider: 'gmail.com' }),
    "existingEmail": config.email,
    "sensitiveEmail": faker.internet.email({ firstName: 'fforward', lastName: 'test', provider: 'gmail.com' }),
    "invalidEmailFormat": `invalid@${faker.internet.email({ firstName: 'fforward', lastName: 'test', provider: 'gmail.com' })}`,
    "exeededEmail": `${faker.string.alpha({ length: 50 })}@gmail.com`,
    "issuerEmail": config.issuerEmail,
    "superAdminEmail": config.superAdminEmail,
    "adminEmail": config.adminEmail,
    "officerEmail": config.officerEmail,

    // First Name
    "validFirstName": config.firstName,
    "firstName": faker.person.firstName(),
    "maxFirstName": faker.string.alpha({ length: 75 }),
    "exeededFirstName": faker.string.alpha({ length: 80 }),
    "koreaFirstName": fakerKO.person.firstName(),

    // Last Name
    "validLastName": config.lastName,
    "lastName": faker.person.lastName(),
    "maxLastName": faker.string.alpha({ length: 75 }),
    "exeededLastName": faker.string.alpha({ length: 80 }),
    "koreaLastName": fakerKO.person.lastName(),

    // Password
    "validPassword": config.password,
    "sensitivePassword": faker.internet.password({ length: 12, memorable: false, pattern: /[a-zA-Z0-9!@#$%^&*]/ }),
    "belowMinPassword": faker.internet.password({ length: 5, memorable: false, pattern: /[a-zA-Z0-9!@#$%^&*]/ }),
    "minPassword": faker.internet.password({ length: 8, memorable: false, pattern: /[a-zA-Z0-9!@#$%^&*]/ }),
    "maxPassword": faker.internet.password({ length: 32, memorable: false, pattern: /[a-zA-Z0-9!@#$%^&*]/ }),
    "exeededPassword": faker.internet.password({ length: 35, memorable: false, pattern: /[a-zA-Z0-9!@#$%^&*]/ }),
    "noSpecialPassword": faker.internet.password({ length: 12, memorable: false, pattern: /[a-zA-Z0-9]/ }),
    "noNumberPassword": faker.internet.password({ length: 12, memorable: false, pattern: /[a-zA-Z!@#$%^&*]/ }),
    "noCharacterPassword": faker.internet.password({ length: 12, memorable: false, pattern: /[0-9!@#$%^&*]/ }),
    "noLowerCharacterPassword": faker.internet.password({ length: 12, memorable: false, pattern: /[A-Z0-9!@#$%^&*]/ }),
    "noUpperCharacterPassword": faker.internet.password({ length: 12, memorable: false, pattern: /[a-z0-9!@#$%^&*]/ }),

    // OTP
    "invalidOTP": faker.number.int({ min: 100000, max: 999999 }),
}