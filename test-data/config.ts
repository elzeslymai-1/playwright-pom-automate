export const config = {
    // mailslurp
    mailslurpeEmail: process.env.MAILSLURP_MOCKUP_MAIL || 'mock@example.com',
    apiKey: process.env.MAILSLURP_API_KEY || 'mockApiKey',
    mail_id: process.env.MAILSLURP_MAIL_ID || 'mockMailId',

    // signup
    email: process.env.FRWA_ACCOUNT_EMAIL || 'testUser',
    password: process.env.FRWA_ACCOUNT_PASSWORD || 'testPassword',
    firstName: 'Automate',
    lastName: 'Testing',
    twofa_secret: process.env.FRWA_ACCOUNT_2FA_SECRET || 'testSecret',
    issuerEmail: process.env.FRWA_ACCOUNT_ISSUER_EMAIL || 'testIssuer',
    superAdminEmail: process.env.FRWA_ACCOUNT_SUPER_ADMIN_EMAIL || 'testSuperAdmin',
    adminEmail: process.env.FRWA_ACCOUNT_ADMIN_EMAIL || 'testAdmin',
    officerEmail: process.env.FRWA_ACCOUNT_OFFICER_EMAIL || 'testOfficer',
    
}