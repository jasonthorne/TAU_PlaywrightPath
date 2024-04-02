//require playwright:
const {chromium} = require('playwright');
//create page objects:
const HomePage = require('../models/Home.page');
const LoginPage = require('../models/Login.page');
//note: dont want/need BasePage as it's the super of both other pages :P

describe('Applitools demo page', ()=>{
    jest.setTimeout(40000);
    let browser = null;
    let context = null;
    let page = null;
    let homePage = null;
    let loginPage = null;

    beforeAll(async()=>{
        browser = await chromium.launch({headless: false});
        context = await browser.newContext();
        page = await context.newPage();
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        //start by navigating to login page:
        await loginPage.navigate();
    });

   afterAll(async()=>{
        await context.close();
        await browser.close();
    });

    //---------------------------
    //tests (using 'it' instead of 'test')

    it('Should be able to login', async()=>{
        //as we're starting by having navigated to te login page,
        //try to log in:
        await loginPage.login('username', 'password');
        //check thatpage title isn't null:
        expect(await page.title()).not.toBeNull();
    });
 
    it('Should be logged in as Jack Gomez', async()=>{
        //check that logged in user is Jack Gomez:
        expect(await homePage.getUserName()).toBe('Jack Gomez');
    });

    it('Should have total balance of $350', async()=>{
        expect(await homePage.getBalance('total')).toBe('$350');
    });

    it('Should have credit availaible of $17800', async()=>{
        expect(await homePage.getBalance('credit')).toBe('$17,800');
    });

    it('Should have due today of $180', async()=>{
        expect(await homePage.getBalance('due')).toBe('$180');
    });
    
    //---------------------------

});