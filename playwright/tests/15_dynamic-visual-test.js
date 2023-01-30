
const {chromium} = require('playwright'); //use playwright with chromium

//describe log, which holds all of our tests:
describe('UI tests for dynamic contnt using playwright & applitools', ()=>{

    // different tess: beforeAll(), afterAll(), beforeEach(), afterEach()
    //+++++++++++++++jest expects docs:
    //https://jestjs.io/docs/expect
 

    jest.setTimeout(20000); //+++++++++IMPORTANT: increase timeout value (from over 5000ms) +++++++
    
    let browser = null;
    let page = null;
    let context = null;
   
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
        await browser.close();
    });

    //---------------------------------------------------------
    //tests:

    test('should look okay', async() =>{
        
    });

    

     //---------------------------------------------------------

});

