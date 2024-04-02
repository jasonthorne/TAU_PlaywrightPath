const {chromium} = require ('playwright');


// ++++++ IMPORTANT: playwright APIs are asynchronous, so return promise objects.
//code therefore has to follow the async/await pattern:

//async arrow function, that calls itself:
(async()=>{
    //create and launch a browsr (REMEMER the await - needed as were inside an async function):
    const browser = await chromium.launch({headless:false, slowMo: 400}); //allow head, and give slowmode of 400ms
    //create a page to exist within the browser:
    const page = await browser.newPage();
    //navigate page to drop down exmaple site:
    await page.goto('https://the-internet.herokuapp.com/dropdown');

    //------------------------------------
    //create handle for drop downs:

    const dropdown = await page.$('#dropdown'); //targeting id of dropdown element

    //++++++++++++different ways to select by:

    //value:
    await dropdown.selectOption({value: '1'}); //select option 1
    //label:
    await dropdown.selectOption({label: 'Option 2'}); //select option 2
    //index:
    await dropdown.selectOption({index: 1}); //select option 1

    //print text of options:
    //make array of available options:
    const availableOptions = await dropdown.$$('option'); //+++++++++++++selector goes into here. $$ means retrieve more than one element 
    //print available options:
    for(let i=0;i<availableOptions.length;i++){
        console.log(await availableOptions[i].innerText());
    }
    
    //------------------------------------
   //finally, close browser:
   await browser.close();
})();

