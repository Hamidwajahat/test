const { test, expect } = require('@playwright/test');
const { login } = require('./helpers/loginHelper');

test.describe('Change Password (/settings)', () => {
  const Url = 'https://next-boilerplate-umber.vercel.app/';

  const email = 'cypress@test.com';
  const oldPassword = 'cypress@test.com';
  const newPassword = 'Test@123';

  test('Succesful password change', async ({ page }) => {
    await login(page, email, oldPassword);

    await expect(page).toHaveURL(/\/home/);

    await page.getByText('Settings').click();
    await page.locator('input[name="old"]').fill(oldPassword);
    await page.locator('input[name="new"]').fill(newPassword);
    await page.locator('input[name="confirm"]').fill(newPassword);
    await page.getByRole('button', { name: 'Update' }).click();

    await expect(page.locator('text=Password updated')).toBeVisible();

    await page.locator('input[name="old"]').fill(newPassword);
    await page.locator('input[name="new"]').fill(oldPassword);
    await page.locator('input[name="confirm"]').fill(oldPassword);
    await page.getByRole('button', { name: 'Update' }).click();

    await expect(page.locator('text=Password updated')).toBeVisible();

  });

  test('Different new and confirm passwords', async ({ page }) => {
    await login(page, email, oldPassword);

    await page.getByText('Settings').click();
    await page.locator('input[name="old"]').fill(oldPassword);
    await page.locator('input[name="new"]').fill(newPassword);
    await page.locator('input[name="confirm"]').fill(oldPassword);

    await expect(page.locator("text=The new password doesn't match")).toBeVisible();
  });

  test('Empty fields', async ({ page }) => {
    await login(page, email, oldPassword);

    await page.getByText('Settings').click();
    await expect(page.getByRole('button', { name: 'Update' })).toBeDisabled();
  });

  test('Same old and new passwords', async ({ page }) => {
    await login(page, email, oldPassword);

    await page.getByText('Settings').click();
    await page.locator('input[name="old"]').fill(oldPassword);
    await page.locator('input[name="new"]').fill(oldPassword);
    await page.locator('input[name="confirm"]').fill(oldPassword);

    await expect(page.locator("text=The new password cant be the same as the old")).toBeVisible();
  });
});
