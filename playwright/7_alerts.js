const {chromium} = require ('playwright');


// ++++++ IMPORTANT: playwright APIs are asynchronous, so return promise objects.
//code therefore has to follow the async/await pattern:

//async arrow function, that calls itself:
(async()=>{
    //create and launch a browsr (REMEMER the await - needed as were inside an async function):
    const browser = await chromium.launch({headless:false, slowMo: 900}); //allow head, and give slowmode of 400ms
    //create a page to exist within the browser:
    const page = await browser.newPage();
    //navigate page to alerts site:
    await page.goto('https://demoqa.com/alerts');

    //------------------------
    //code to handle the alerts:

    //++++++++++create a listener on the page for dialogs:
    //+++++++NOTE .on instead of .once sets the listener permenantly. .one means it only triggers once.
    page.once('dialog', async dialog =>{ 
        console.log(dialog.message()); //print dialog 
        await dialog.accept(); //accept a dialog (as playwright automatically dismisses them)
    });

    //click confirm btn:
    await page.click('#confirmButton');
    
    //-----------

    //another listener for prompt button (which accepts a message)
    page.once('dialog', async dialog =>{
        console.log(dialog.message()); //print dialog 
        await dialog.accept("here be my entered text"); //accept a dialog (as playwright automatically dismisses them)
    });

    await page.click('#promtButton');

    //------------------------

   //finally, close browser:
   await browser.close();
})();

