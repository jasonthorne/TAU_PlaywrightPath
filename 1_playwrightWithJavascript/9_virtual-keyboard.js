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
    await page.goto('https://the-internet.herokuapp.com/key_presses');

    //------------------------

    //click into input box (targeting it with a selector):
    await page.click('input'); 

    //type into virtual keyboard:
    await page.keyboard.type("In the name o the wee man!");
    //hold down shift key (to select entered text):
    await page.keyboard.down('Shift');

    //press left arrow untill reached the length of string ' wee man' (as thats what we want to delete)
    for(let i=0;i<' wee man'.length;i++){
        await page.keyboard.press('ArrowLeft'); //press left arrow key
    }
    //release hift key:
    await page.keyboard.up('Shift');
    //press backspace to delete selected text:
    await page.keyboard.press('Backspace');
    //enter new text:
    await page.keyboard.type(' big un');

    //------------------------

   //finally, close browser:
   await browser.close();
})();


