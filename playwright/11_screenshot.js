const {chromium} = require ('playwright');


// ++++++ IMPORTANT: playwright APIs are asynchronous, so return promise objects.
//code therefore has to follow the async/await pattern:

//async arrow function, that calls itself:
(async()=>{
    //create and launch a browsr (REMEMER the await - needed as were inside an async function):
    const browser = await chromium.launch(); //headless mode (by default)
    //create a page to exist within the browser:
    const page = await browser.newPage();
    //navigate page to site:
    await page.goto('https://applitools.com');

    //------------------------

    //take screenshot, passing it path:
    await page.screenshot({path: './screenshots/screenshot.png'});

    //take screenshot of just an element:
    const logoScreenshot = await page.$('.logo'); //passing .logo element
    await logoScreenshot.screenshot({path: './screenshots/logo.png'});

    //take screenshot of whole page (not just whats shown on screen):
    await page.screenshot({path: './screenshots/fullPage.png', fullPage: true});

    //------------------------

   //finally, close browser:
   await browser.close();
})();


