const {chromium} = require ('playwright');


// ++++++ IMPORTANT: playwright APIs are asynchronous, so return promise objects.
//code therefore has to follow the async/await pattern:

//async arrow function, that calls itself:
(async()=>{
    //create and launch a browsr (REMEMER the await - needed as were inside an async function):
    const browser = await chromium.launch({headless: false, slowMo: 100}); //allow head, and give slowmode of 100ms
    //create a page to exist within the browser:
    const page = await browser.newPage();
    //navigate page to a 'forgot password' webpage:
    await page.goto('https://the-internet.herokuapp.com/forgot_password');

    //------------------------------
    //code to type in email text box:

    //get hndle on email text box element:
    const email = await page.$('#email'); //++++++++passing id of element
    //type into text box:
    await email.type('myEmail@mail.com', {delay: 50}); //+++++++adding obj with delay of 50ms to simulate user interaction
    
    //------------------------------



   //finally, close browser:
   await browser.close();
})();

