const {chromium} = require ('playwright');


// ++++++ IMPORTANT: playwright APIs are asynchronous, so return promise objects.
//code therefore has to follow the async/await pattern:

//async arrow function, that calls itself:
(async()=>{
    //create and launch a browsr (REMEMER the await - needed as were inside an async function):
    const browser = await chromium.launch({headless:false, slowMo: 400}); //allow head, and give slowmode of 400ms
    
    //====================================================
    //++++++++++++ New for video recording: 

    //to record a video, browser needs a new context:
    const context = await browser.newContext({
        recordVideo: {dir: "./recordings"} //object holding obj containing path to save video
    });

    //create a page from new context:
    const page = await context.newPage();

    //====================================================
    
    //create a page to exist within the browser:
    ///const page = await browser.newPage();


    //navigate page to site:
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');

    //------------------------

    //clickc on button in webpage:
    await page.click('#start > button'); //passing selector to button

    //then wait for this loading element to be displayed:
    await page.waitForSelector('#loading');

    //then wait for the loading element to be hidden:
    await page.waitForSelector('#loading', {state: "hidden"});

    //wait 100ms for timeout:
    await page.waitForTimeout(100); 

    //------------------------

   //finally, close browser:
   await browser.close();
})();


