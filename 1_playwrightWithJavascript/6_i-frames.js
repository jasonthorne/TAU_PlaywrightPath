const {chromium} = require ('playwright');


// ++++++ IMPORTANT: playwright APIs are asynchronous, so return promise objects.
//code therefore has to follow the async/await pattern:

//async arrow function, that calls itself:
(async()=>{
    //create and launch a browsr (REMEMER the await - needed as were inside an async function):
    const browser = await chromium.launch({headless:false, slowMo: 400}); //allow head, and give slowmode of 400ms
    //create a page to exist within the browser:
    const page = await browser.newPage();
    //navigate page to i frame site::
    await page.goto('https://demoqa.com/frames');

    //--------------------------------------
    //+++++++++NOTE: Url or name are needed for i frame (eg not id, selector etc)
    
    const frame1 = await page.frame({url: /\/sample/}); // ++++++++needs passed url as a regular expression
    //grab the h1 tag within the frame:
    const header1 = await frame1.$('h1');
    console.log(await header1.innerText()); //++++++++++++++NOTE the await needed in here too :P






    //---------------------------------------


   //finally, close browser:
   await browser.close();
})();

