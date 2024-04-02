const {chromium} = require ('playwright');


// ++++++ IMPORTANT: playwright APIs are asynchronous, so return promise objects.
//code therefore has to follow the async/await pattern:

//async arrow function, that calls itself:
(async()=>{
    //create and launch a browsr (REMEMER the await - needed as were inside an async function):
    const browser = await chromium.launch({headless:false, slowMo: 400}); //allow head, and give slowmode of 400ms
    //create a page to exist within the browser:
    const page = await browser.newPage();
    //navigate page to google.com:
    await page.goto('https://www.w3schools.com/howto/howto_css_custom_checkbox.asp');

    //----------------------

    //+++++++++++++FIX BOTH OF THESE :P

    //check the second checkbox:
    const checkBoxes = await page.$$('#main > div.w3-row > div:nth-child(1) > input[type=checkbox]');
    //#main > div.w3-row > div:nth-child(1) > input[type=checkbox]:nth-child(4)
    ////////checkBoxes[1].check();
    ////////checkBoxes[0].check();

    //select the second radio btn:
    const radioBtns = await page.$$('#main > div.w3-row > div:nth-child(1) > input[type="radio"]');
    ///////await radioBtns[1].check();









    //---------------------

   //finally, close browser:
   await browser.close();
})();

