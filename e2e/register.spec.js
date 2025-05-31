const { test, expect } = require('@playwright/test');

test.describe('Registration Page', () => {
  const Url = 'https://next-boilerplate-umber.vercel.app/';

  test('should load registration page', async ({ page }) => {
    await page.goto(Url);
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page).toHaveURL(/\/register/);
  });

  test('Null Submit', async ({ page }) => {
    await page.goto(Url);
    await page.getByRole('button', { name: 'Register' }).click();
    await page.getByRole('button', { name: 'Sign up Now' }).click();

    await expect(page.locator('#\\:r0\\:-helper-text')).toHaveText('String must contain at least 1 character(s)');
    await expect(page.locator('#\\:r2\\:-helper-text')).toHaveText('String must contain at least 1 character(s)');
    await expect(page.locator('text=Invalid email')).toBeVisible();
  });

 test('Valid login', async ({ page }) => {
    const randomName = `Test${Date.now()}`;
    const randomEmail = `cypress${Date.now()}@test.com`;

    await page.goto(Url);
    await page.getByRole('button', { name: 'Register' }).click();
    await page.getByLabel('Name').fill(randomName);
    await page.getByLabel('Email').fill(randomEmail);
    await page.getByLabel('Password').fill('Test@1234');
    await page.getByRole('button', { name: 'Sign up Now' }).click();

    
    await expect(page).not.toHaveURL(/\/register/);
    await expect(page.locator('text=Your account has been created')).toBeVisible();
  });
});
