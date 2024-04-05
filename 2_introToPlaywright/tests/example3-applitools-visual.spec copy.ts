import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/home-page'; //import home page obj
import {TopMenuPage} from '../pages/top-menu-page';
import {
    BatchInfo,
    Configuration,
    EyesRunner,
    ClassicRunner,
    VisualGridRunner,
    BrowserType,
    DeviceName,
    ScreenOrientation,
    Eyes,
    Target
} from "@applitools/eyes-playwright";

let homePage: HomePage; 
let topMenuPage: TopMenuPage;
const URL = 'https://playwright.dev/';
const pageUrl = /.*intro/;

test.beforeEach(async({page})=>{
    await page.goto(URL);
    homePage = new HomePage(page);
});

async function clickGetStarted(page:Page){
    await homePage.clickGetStarted();
    topMenuPage = new TopMenuPage(page)
}

//--------------------------------------------------------------

test.describe('Playwright website', () => {

    test('@example3 - has title', async () => {
        await homePage.assertPageTitle();
    });
      
    test('@example3 - get started link', async ({ page }) => {
        await clickGetStarted(page);
        await topMenuPage.assertPageUrl(pageUrl);
    });
    
    test('@example3 - check java page', async ({page}) =>{
        

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
    });
});

