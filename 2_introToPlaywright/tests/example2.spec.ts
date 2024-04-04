import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/home-page' //import home page obj
import {TopMenuPage} from '../pages/top-menu-page'

/*Cleaned up version of example.spec.ts + my-first-test.spec.ts, 
using AAA pattern:*/

/*
POM (Page Object Model)
is where each key section odf a page (header, body, footer)
is made into its own object, with its own tests ran within it. 
*/

let homePage: HomePage; //create var of type HomePage
let topMenuPage: TopMenuPage;

const URL = 'https://playwright.dev/';
const pageUrl = /.*intro/;

test.beforeEach(async({page})=>{
    await page.goto(URL);
    homePage = new HomePage(page); //instaniate homepage, passing it page obj
});

//click the 'get started' link:
async function clickGetStarted(page:Page){
    //await page.getByRole('link', {name: 'Get started'}).click(); - NEW WAY:
    await homePage.clickGetStarted();
    topMenuPage = new TopMenuPage(page)//instantiate top menu page
}

//--------------------------------------------------------------

test.describe('Playwright website', () => {

    test('@example2 - has title', async () => {
        // Expect a title "to contain" a substring
        //await expect(page).toHaveTitle(/Playwright/);
        await homePage.assertPageTitle();
    });
      
    test('@example2 - get started link', async ({ page }) => {
        await clickGetStarted(page); // Click the get started link
        await topMenuPage.assertPageUrl(pageUrl);
    });
    
    test('@example2 - check java page', async ({page}) =>{
        
        //using steps to section out the Act and Assert steps - NOTE ++++

        await test.step('Act', async()=>{
            await clickGetStarted(page);
            await topMenuPage.hoverNode();
            await topMenuPage.clickJava();
        });

        await test.step('Assert', async()=>{
            await topMenuPage.assertPageUrl(pageUrl);
            await topMenuPage.assertNodeDescNotVisible();
            await topMenuPage.assertJavaDescVisible();
        });


        /*
        await clickGetStarted(page); //2 - Click at get started
       
        await page.getByRole('button', {name: 'Node.js'}).hover();  //3 -  Mouse over the language drop down (hovering mouse)
        //4 - Click at Java button (with that exact text)
        await page.getByText('Java', {exact: true}).click();
        //5 - Check the URL
        await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');
        //6 - Check the (exact) text 'Installing Playwright' is not displayed
        await expect(page.getByText('Installing Playwright', {exact: true})).not.toBeVisible();
        //7 - Check the text is displayed
        const javaDescription = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;
        await expect(page.getByText(javaDescription)).toBeVisible();
        */
    });
});

