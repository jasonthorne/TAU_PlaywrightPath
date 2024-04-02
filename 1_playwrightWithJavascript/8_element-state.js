const {chromium} = require ('playwright');


// ++++++ IMPORTANT: playwright APIs are asynchronous, so return promise objects.
//code therefore has to follow the async/await pattern:

//async arrow function, that calls itself:
(async()=>{
    //create and launch a browsr (REMEMER the await - needed as were inside an async function):
    const browser = await chromium.launch(); // +++++++==== NOTE running this in headless mode
    //create a page to exist within the browser:
    const page = await browser.newPage();
    //navigate page to site:
    await page.goto('https://demoqa.com/automation-practice-form');

    //------------------------

    /*
    Relevent chcks that playwright makes to an element:

    - Attached? (to the DOM)
    - Visible?
    - Stable? (not completing an animation)
    - Not being obscured by other elements?
    - Enabled?
    - Editable? (text controls)
    */

    //grab some elements:
    const firstNameTxtBox = await page.$('#firstName');
    const sportsCheckBox = await page.$('#hobbies-checkbox-1');
    const submitBtn = await page.$('#submit');

    // print the element's states:
    console.log(await firstNameTxtBox.isDisabled());
    console.log(await firstNameTxtBox.isEnabled());
    console.log(await firstNameTxtBox.isEditable());
    
    console.log(await sportsCheckBox.isChecked());
    console.log(await sportsCheckBox.isVisible());

    console.log(await submitBtn.isHidden());
    console.log(await submitBtn.isVisible());
    console.log(await submitBtn.isEditable());






    //------------------------

   //finally, close browser:
   await browser.close();
})();


