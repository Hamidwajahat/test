// tests/helpers/loginHelper.js
exports.login = async (page, email, password) => {
  await page.goto('https://next-boilerplate-umber.vercel.app/login');
 await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Sign in Now' }).click();
};
