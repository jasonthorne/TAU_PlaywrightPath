
const {chromium} = require('playwright'); //use playwright with chromium
const {ClassicRunner, Eyes, Target, RectangleSize} = require("@applitools/eyes-playwright"); //++++++++++++ Applitools imports


//describe log, which holds all of our tests:
describe('UI tests for dynamic contnt using playwright & applitools', ()=>{

    jest.setTimeout(30000); //+++++++++IMPORTANT: increase timeout value (from over 5000ms) +++++++
    let browser = null;
    let page = null;
    let context = null;

    //------------
    //applitools consts:
    const eyes = new Eyes(new ClassicRunner()); //create eyes

    //-----------
   
    //before all testsL
    beforeAll(async() =>{

        //create browser and navigate to webpage for testing:
        browser = await chromium.launch({headless: false});
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://the-internet.herokuapp.com/dynamic_content');
    });

    //after all tests:
    afterAll(async() =>{
        await context.close();
        await browser.close();
    });

    //---------------------------------------------------------
    //tests:

    test('should look okay', async() =>{

        //wait for h3 selector to be attched to the DOM:
        await page.waitForSelector('h3', {state: 'attached'});

        //this method atarts a test, and must be called BEFORE any other chck method:
        await eyes.open(page, 'The internet', 'Dynamic content', new RectangleSize(800, 600)); //(driver, appName, testName, viewportSize) RectngleSize(H px, W px)

        //check full window 
        await eyes.check(Target.window().fully());

        //close eyes:
        await eyes.close();
        
    });

    

     //---------------------------------------------------------

});

