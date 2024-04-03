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


