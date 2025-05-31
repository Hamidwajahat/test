const { test, expect } = require('@playwright/test');

test.describe('Login Page', () => {
  const Url = 'https://next-boilerplate-umber.vercel.app/';
  const email = 'cypress@test.com';
  const password = 'cypress@test.com';

  test('Load login page', async ({ page }) => {
    await page.goto(Url);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page).toHaveURL(/\/login/);
  });

  test('No Credentials', async ({ page }) => {
    await page.goto(Url);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('button', { name: 'Sign in Now' }).click();
    await expect(page.locator('text=Invalid email')).toBeVisible();
    await expect(page.locator('text=String must contain at least 1 character(s)')).toBeVisible();
  });

  test('Succesful login', async ({ page }) => {
    await page.goto(Url);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Sign in Now' }).click();

    await expect(page).toHaveURL(/\/home/); 
    await expect(page.locator('text=Welcome to your dashboard: test')).toBeVisible();
  });

  test('Wrong Credentials', async ({ page }) => {
     await page.goto(Url);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill('Wrong');
    await page.getByRole('button', { name: 'Sign in Now' }).click();
    await expect(page.locator('text=User not found')).toBeVisible();
  });
});
