# Playwright Login Tests

This project has automated tests for the login page on this site:
https://practicetestautomation.com/practice-test-login/

---

## How to run

First install everything:
```
npm install
npx playwright install
```

Then run the tests:
```
npx playwright test
```

If you want to see the browser while it runs:
```
npx playwright test --headed
```

To open the report after running:
```
npx playwright show-report
```

---

## Folder structure

```
playwright/
  e2e/         - the actual test files
  fixtures/    - custom fixture setup
  pages/       - page object for the login page
  testData/    - credentials stored in a json file
```

---

## Test scenarios covered

- Positive login test: logs in with valid credentials and checks the success page
- Negative username test: uses a wrong username and checks the error message
- Negative password test: uses a wrong password and checks the error message
