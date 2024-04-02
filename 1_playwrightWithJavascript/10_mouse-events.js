const {chromium} = require ('playwright');


// ++++++ IMPORTANT: playwright APIs are asynchronous, so return promise objects.
//code therefore has to follow the async/await pattern:

//async arrow function, that calls itself:
(async()=>{
    //create and launch a browsr (REMEMER the await - needed as were inside an async function):
    const browser = await chromium.launch({headless:false, slowMo: 400}); //allow head, and give slowmode of 400ms
    //create a page to exist within the browser:
    const page = await browser.newPage();
    //navigate page to site:
    await page.goto('https://paint.js.org');

    //------------------------

    //move mouse:
    await page.mouse.move(200,200); //x & y pixel coords
    //click on cnvas with mouse:
    await page.mouse.down();
    //move mouse 400px on x:
    await page.mouse.move(400,200);
    //move y:
    await page.mouse.move(400,400);
    //move x:
    await page.mouse.move(200,400);
    //move y (now back at start, and square complete):
    await page.mouse.move(200,200);
    //release mouse:
    await page.mouse.up();

    //------------------------

   //finally, close browser:
   await browser.close();
})();
