import {test, expect } from '@playwright/test';

//AAA Patern:
// [Arrange]
// [Act]
// [Assert]

const password = process.env.PASSWORD;

//executes before ALL tests
test.beforeAll(async ({playwright}) => {
    //skip test if enironment is production:
    test.skip(
        !!process.env.PROD,
        'Test instentially skipped in production due to blah, blah.'
    );
    //do things before all tests. eg:
    //start a server
    // create a db connection
    //reuse a sign uin state
});

//executes before EACH test
test.beforeEach(async ({page}, testInfo) =>{
    console.log(`Running: ${testInfo.title}`);
    //examples:
    // open a url
    //clean up the DB
    //create a page object
    // dismiss a modal
    //load params
});

//executes after ALL tests:
test.afterAll(async({page}, testInfo) => {
    console.log(`All tests completed.`);
    //close a DB connection
});

//executes after EACH test:
test.afterEach(async ({page}, testInfo) => {
    console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

    if (testInfo.status !== testInfo.expectedStatus){
        console.log(`Didn't run as expected. Ended up at ${page.url()}`);}
    //clean up all the data we created for this test through API caLLS
});

//---------------------

//.skip() skips all test cases within body
//.only() runs only the test  cases within body
//inside a 'describe' you can have scenarios. These then have steps.
test.describe.skip('Test Case', ()=>{
    test('Test Scenario 1', async ({page}) => {
        await test.step('Step 1', async()=>{
            console.log('Test Scenario 1. Step 1');
        });

        await test.step('Step 2', async()=>{
            console.log('Test Scenario 1. Step 2');
        });

        //....
    });

    test('Test scenario 2', async ({page}) => {
        //....
    });

    /*
    //another way of arranging tests:

    test.only('Test Scenario 3', async ({page}) =>{
        // Arrange
        // Act
        // Assert
    });

    test.skip('Test Scenario 4', async ({page}) =>{
        // Arrange
        // Act
        // Assert
    });
    */

});
