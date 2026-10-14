const { expect } = require('@playwright/test');
const { test } = require('../fixtures/loginFixture');
const credentials = require('../testData/credentials.json');

// Test Case 1: Positive Login Test
test('Positive login test', async ({ loginPage }) => {
  // Open the login page
  await loginPage.goto();

  // Type username and password
  await loginPage.fillUsername(credentials.validUser.username);
  await loginPage.fillPassword(credentials.validUser.password);

  // Click submit
  await loginPage.clickSubmit();

  // Verify the URL contains logged-in-successfully
  await expect(loginPage.page).toHaveURL(/logged-in-successfully/);

  // Verify success message is shown
  await expect(loginPage.page.getByText(/Congratulations|successfully logged in/i)).toBeVisible();

  // Verify Log out button is visible
  const logoutButton = await loginPage.getLogoutButton();
  await expect(logoutButton).toBeVisible();
});

// Test Case 2: Negative username test
test('Negative username test', async ({ loginPage }) => {
  // Open the login page
  await loginPage.goto();

  // Type wrong username and correct password
  await loginPage.fillUsername(credentials.invalidUsername.username);
  await loginPage.fillPassword(credentials.invalidUsername.password);

  // Click submit
  await loginPage.clickSubmit();

  // Verify error message is shown
  const errorMessage = await loginPage.getErrorMessage();
  await expect(errorMessage).toBeVisible();

  // Verify error message text
  await expect(errorMessage).toHaveText('Your username is invalid!');
});

// Test Case 3: Negative password test
test('Negative password test', async ({ loginPage }) => {
  // Open the login page
  await loginPage.goto();

  // Type correct username and wrong password
  await loginPage.fillUsername(credentials.invalidPassword.username);
  await loginPage.fillPassword(credentials.invalidPassword.password);

  // Click submit
  await loginPage.clickSubmit();

  // Verify error message is shown
  const errorMessage = await loginPage.getErrorMessage();
  await expect(errorMessage).toBeVisible();

  // Verify error message text
  await expect(errorMessage).toHaveText('Your password is invalid!');
});
