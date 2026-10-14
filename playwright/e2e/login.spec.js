const { test, expect } = require('@playwright/test')
const { LoginPage } = require('../pages/LoginPage')
const credentials = require('../testData/credentials.json')

// test for valid login
test('Positive login test', async ({ page }) => {

    let loginPage = new LoginPage(page)

    // go to the page
    await loginPage.goto()

    // type in valid username and password
    await loginPage.fillUsername(credentials.validUser.username)
    await loginPage.fillPassword(credentials.validUser.password)

    // click login
    await loginPage.clickSubmit()

    // check that the url changed
    await expect(page).toHaveURL(/logged-in-successfully/)

    // check that success message shows up
    await expect(page.getByText(/Congratulations|successfully logged in/i)).toBeVisible()

    // make sure logout button is there
    let logoutBtn = await loginPage.getLogoutButton()
    await expect(logoutBtn).toBeVisible()
})


// test for wrong username
test('Negative username test', async ({ page }) => {

    let loginPage = new LoginPage(page)

    await loginPage.goto()

    await loginPage.fillUsername(credentials.invalidUsername.username)
    await loginPage.fillPassword(credentials.invalidUsername.password)

    await loginPage.clickSubmit()

    // should show an error
    let errorMessage = await loginPage.getErrorMessage()
    await expect(errorMessage).toBeVisible()

    // check the error text
    await expect(errorMessage).toHaveText('Your username is invalid!')
})


// test for wrong password
test('Negative password test', async ({ page }) => {

    let loginPage = new LoginPage(page)

    await loginPage.goto()

    await loginPage.fillUsername(credentials.invalidPassword.username)
    await loginPage.fillPassword(credentials.invalidPassword.password)

    await loginPage.clickSubmit()

    // error should appear
    let errorMessage = await loginPage.getErrorMessage()
    await expect(errorMessage).toBeVisible()

    await expect(errorMessage).toHaveText('Your password is invalid!')
})
