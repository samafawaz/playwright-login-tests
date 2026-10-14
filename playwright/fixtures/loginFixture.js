const { test: base } = require('@playwright/test')
const { LoginPage } = require('../pages/LoginPage')

// i'm extending the base test so i can use loginPage in my tests
const test = base.extend({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page)
        await use(loginPage)
    }
})

module.exports = { test }
