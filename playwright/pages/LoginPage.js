const { expect } = require('@playwright/test');

class LoginPage {

    constructor(page) {
        this.page = page
    }

    // go to the login page
    async goto() {
        await this.page.goto('https://practicetestautomation.com/practice-test-login/')
    }

    async fillUsername(username) {
        let usernameField = this.page.locator('#username')
        await usernameField.fill(username)
    }

    async fillPassword(password) {
        let passwordField = this.page.locator('#password')
        await passwordField.fill(password)
    }

    // click the submit button
    async clickSubmit() {
        let submitBtn = this.page.locator('#submit')
        await submitBtn.click()
    }

    async getErrorMessage() {
        let errorMsg = this.page.locator('#error')
        return errorMsg
    }

    async getLogoutButton() {
        let logoutBtn = this.page.getByRole('link', { name: 'Log out' })
        return logoutBtn
    }
}

module.exports = { LoginPage }
