const {chromium} = require ('playwright');


// ++++++ IMPORTANT: playwright APIs are asynchronous, so return promise objects.
//code therefore has to follow the async/await pattern:

//async arrow function, that calls itself:
(async()=>{
    //create and launch a browsr (REMEMER the await - needed as were inside an async function):
    const browser = await chromium.launch({headless:false, slowMo: 300}); //allow head, and give slowmode of 300ms
    //create a page to exist within the browser:
    const page = await browser.newPage();
    //navigate page to music webpage:
    await page.goto('https://www.apronus.com/music/lessons/unit01.htm');

    //-----------------------
    //click on the keynodes:

    await page.click('#t1 > table > tr:nth-child(1) > td:nth-child(1) > button'); //element selector (copy > copy selector)
    await page.click('#t1 > table > tr:nth-child(2) > td:nth-child(6) > button'); //play 2nd element

    //-----------------------
    
   //finally, close browser:
   await browser.close();
})();

