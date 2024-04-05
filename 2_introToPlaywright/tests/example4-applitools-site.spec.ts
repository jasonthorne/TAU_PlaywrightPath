import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/home-page';
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

//=======================start of Applitools declerations ===================
//Applitools variables (note the exports :P):
export const USE_ULTRAFAST_GRID: boolean = false; //defines which runner we use in applitools. 'classic' or 'ultra fast grid'
//export const USE_ULTRAFAST_GRID: boolean = true;
export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;
let eyes: Eyes; //this is the class thart performs the screenshot check for us
const URL = 'https://demo.applitools.com';
//const URL = 'https://demo.applitools.com/index_v2.html'; //purposely broken example of page
let homePage: HomePage; 
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

//--------------------------------------------------------------

test.describe('ACME Bank', ()=>{
    test('log into a bank account', async({page}) => {
        await page.goto(URL);
        await eyes.check('Login page', Target.window().fully());
        await page.locator('id=username').fill('jedi');
        await page.locator('id=password').fill('happyTesting');
        await page.locator('id=log-in').click();
        await eyes.check('Main page', Target.window().fully().layout());
    });
});
