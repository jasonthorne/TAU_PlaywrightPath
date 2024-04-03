import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/home-page' //import home page obj

/*Cleaned up version of example.spec.ts + my-first-test.spec.ts, 
using AAA pattern:*/

/*
POM (Page Object Model)
is where each key section odf a page (header, body, fotter)
is made into its own object, with its own tests ran within it. 
*/

let homePage: HomePage; //create var of type HomePage

const URL = 'https://playwright.dev/';

test.beforeEach(async({page})=>{
    await page.goto(URL);
    homePage = new HomePage(page); //instaniate homepage, passing it page obj
});

//click the 'get started' link:
async function clickGetStarted(page:Page){
    //await page.getByRole('link', {name: 'Get started'}).click(); - NEW WAY:
    await homePage.clickGetStarted();
}

//--------------------------------------------------------------

test.describe('Playwright website', () => {

    test('has title', async () => {
        // Expect a title "to contain" a substring.
        //await expect(page).toHaveTitle(/Playwright/);
        await homePage.assertPageTitle();
    });
      
    test('get started link', async ({ page }) => {
        // Click the get started link.
        await clickGetStarted(page);
        // Expects page to have a heading with the name of Installation.
        await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    });
    
    test('check java page', async ({page}) =>{
        //2 - Click at get started
        await clickGetStarted(page);
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
});

