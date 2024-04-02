
const {chromium, devices} = require ('playwright'); //++++++++ devices is a dictionary of devices available to playwright

//grab iphone 11 from the dictionary of devices:
const iPhone = devices['iPhone 11']; 

//async arrow function, that calls itself:
(async()=>{
    const browser = await chromium.launch({headless:false, slowMo: 400}); //allow head, and give slowmode of 400ms
   
    //create a context for running iphone in:
    const context = await browser.newContext({
        ...iPhone,  //pass iphone obj's properties
        permissions: ['geolocation'],   //give geolocation permissions
        geolocation: {latitude: 19.432608, longitude: -99.133209}  //lat and longs in which to send geolocation
        //locale: 'fr-FR' //lset the locale of the device to be french from france.
    });

    //create a page for our context:
    const page = await context.newPage();

    //take page t ogoogle maps:
    await page.goto('https://www.google.com/maps');

    //wait on page for 10 seconds:
    await page.waitForTimeout(10000);

   //finally, close browser:
   await browser.close();
})();

