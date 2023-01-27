
const {chromium} = require('playwright'); //use playwright with chromium

//describe log, which holds all of our tests:
describe('UI tests for bookstore using playwright', async()=>{

    // different tess: beforeAll(), afterAll(), beforeEach(), afterEach()
    //+++++++++++++++jest expects docs:
    //https://jestjs.io/docs/expect

    let browser = null;
    let page = null;
    let context = null;

    //before all testsL
    beforeAll(async() =>{
        //create browser nd navigate to webpage for testing:

        browser = await chromium.launch({headless: false});
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://demoqa.com/books');
    });

    //after all tests:
    afterAll(async() =>{
        await browser.close();
    });

    //---------------------------------------------------------
    //tests:

    test("should load page", async() =>{
        //https://jestjs.io/docs/expect
        expect(page).not.toBeNull(); //check that page isnt null
        expect(await page.title().not.toBeNull()); //check that title isnt null
    });

    test("should be able to search for 'eloquent javascript'", async() =>{
        await page.fill('#searchBox', 'eloquent javascript'); //fill searchbox with 'eloquent javascript'
    });

    let firstRowCells = null; //for storing elements found in the first row of a list

    test("should check if book image is okay", async() =>{
        //fill array with elements of first row in list
        firstRowCells = await page.$$('#app > div > div > div.row > div.col-12.mt-4.col-md-6 > div.books-wrapper > div.ReactTable.-striped.-highlight > div.rt-table > div.rt-tbody > div:nth-child(1)');
    });

    test("should check if title is okay", async() =>{

    });

     //---------------------------------------------------------

});

