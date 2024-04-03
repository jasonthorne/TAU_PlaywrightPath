import { test, expect } from '@playwright/test';
/*
1 - Open thre page
2 - Click at get started
3 - Mouse over the language drop down
4 - Click at Java
5 - Check the URL
6 - Check the text "Installing Playwright" is not being displayed
7 - Check the text below is displayed:
    "Playwright is distributed as a set of ...."
*/

//NOTE - .only() is for running only the tests with .only() applied to them ++++++++
test.only('check java page', async ({page}) =>{

    //1 - open te page
    await page.goto('https://playwright.dev');

    //2 - Click at get started
    await page.getByRole('link', {name: 'Get started'}).click();

    //3 -  Mouse over the language drop down (hovering mouse)
    await page.getByRole('button', {name: 'Node.js'}).hover();

    //4 - Click at Java button (with that exact text)
    await page.getByText('Java', {exact: true}).click();

    //5 - Check the URL
    await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');

    //6 - Check the (exact) text 'Installing Playwright' is not displayed
    await expect(page.getByText('Installing Playwright', {exact: true})).not.toBeVisible();

    //7 - Check the text is displayed
    const javaDescription = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;
    await expect(page.getByText(javaDescription)).toBeVisible();

});