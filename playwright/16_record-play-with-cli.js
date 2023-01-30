const {chromium} = require('playwright'); //use playwright with chromium

/*

//AUTOMATED TEST CODE:

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('password');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('#shopping_cart_container a').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('f_name');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('l_name');
  await page.locator('form').click();
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('333333333');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
});

*/

(async()=>{
  //create and launch a browsr (REMEMER the await - needed as were inside an async function):
  const browser = await chromium.launch({headless:false, slowMo: 400}); 
  //create a page to exist within the browser:
  const page = await browser.newPage();
  //navigate page to site:
  await page.goto('https://www.saucedemo.com/');

  //------------------------

  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('password');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('#shopping_cart_container a').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('f_name');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('l_name');
  await page.locator('form').click();
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('333333333');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();

  //------------------------

 //finally, close browser:
 await browser.close();
})();


