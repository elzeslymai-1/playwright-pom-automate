export interface IMailSlurpConfig {
    mailId: string
}

export interface ICreateMailSlurp {
    inboxId: string
    emailAddress: string
}

export interface I2TwoFAConfig {
    issuer: string
    secret: string
}