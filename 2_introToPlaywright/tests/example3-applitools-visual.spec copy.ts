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

//=======================start of Applitools declerations ===================
//Applitools variables (note the exports :P):
export const USE_ULTRAFAST_GRID: boolean = false; //defines which runner we use in applitools. 'classic' or 'ultra fast grid'
//export const USE_ULTRAFAST_GRID: boolean = true;
export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;
let eyes: Eyes; //this is the class thart performs the screenshot check for us
//-------------------------

//before all for applitools
test.beforeAll(async()=>{
    if(USE_ULTRAFAST_GRID){ // +++ Only paid versiion of applitools uses this +++:
        Runner = new VisualGridRunner({testConcurrency: 5}); //allows for running with more browsers than devices
    }else{ Runner = new ClassicRunner();} //everythnig here is run lcally, so more time consuming
});

//define the runner name
const runnerName = (USE_ULTRAFAST_GRID)? 'Ultrafast Grid': 'Classic runner';
//crete Batch info - A batch is a collection of checkpoints for each test suite.
//for classic runner each browser or device creates one batch for each.
//for VisualGridRunner there;ll only be one batch created for all.
Batch = new BatchInfo({name: `Playwright website - ${runnerName}`});

Config = new Configuration(); //create config info for Applitools

//set a batch for config date:
Config.setBatch(Batch);

//if using ultra fasdt grid, add the browsers and devices to use:
if (USE_ULTRAFAST_GRID){
    Config.addBrowser(800, 600, BrowserType.CHROME);
    Config.addBrowser(1600, 1200, BrowserType.FIREFOX);
    Config.addBrowser(1024, 768, BrowserType.SAFARI);
    Config.addDeviceEmulation(DeviceName.iPhone_11, ScreenOrientation.PORTRAIT);
    Config.addDeviceEmulation(DeviceName.Nexus_10, ScreenOrientation.LANDSCAPE);
}

//=======================end of Applitools declerations ===================

test.beforeEach(async({page})=>{
    //create new allpitools eyes instance:
    eyes = new Eyes(Runner, Config);
    await eyes.open( //.open()starts the test execution
        page,
        'Playwright', //app name
        test.info().title, //test name
        {width: 1024, height: 768} //view port
    );

    await page.goto(URL);
    homePage = new HomePage(page);
});

test.afterEach(async()=>{
    await eyes.close(); //after each test, close current eyes obj
});

test.afterAll(async()=>{
    //forces Playwright to wait synchronously for all visual checkpoints to complete
    const results = await Runner.getAllTestResults(); //use runner to get all results
    console.log('Visual test results', results);
})

async function clickGetStarted(page:Page){
    await homePage.clickGetStarted();
    topMenuPage = new TopMenuPage(page)
}

//--------------------------------------------------------------

test.describe('Playwright website', () => {

    test('@example3 - has title', async () => {
        await homePage.assertPageTitle();
        //.fully() gets whole page, not just current view port:
        await eyes.check('Home page', Target.window().fully()); 
    });
      
    test('@example3 - get started link', async ({ page }) => {
        await clickGetStarted(page);
        await topMenuPage.assertPageUrl(pageUrl);
        //.layout() checks the layout and ignores the text and graphics:
        await eyes.check('Get Started page', Target.window().fully().layout());
    });
    
    test('@example3 - check java page', async ({page}) =>{
        
        await test.step('Act', async()=>{
            //await clickGetStarted(page);
            //await topMenuPage.hoverNode();
            //await topMenuPage.clickJava();
        });

        await test.step('Assert', async()=>{
            await topMenuPage.assertPageUrl(pageUrl);
            await topMenuPage.assertNodeDescNotVisible();
            await topMenuPage.assertJavaDescVisible();
            //check if layout matches the baseline, but ignores colour changes:
            await eyes.check('Java page', Target.window().fully().ignoreColors());
        });
    });
});

