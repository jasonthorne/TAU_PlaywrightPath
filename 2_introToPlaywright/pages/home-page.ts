import {expect, type Locator, type Page} from "@playwright/test"

export class HomePage{

    //variables
    readonly page: Page; //readonly is immutable
    readonly getStartedBtn: Locator;
    readonly title: RegExp; //type of regular expression

    //constructor
    constructor (page: Page){
        this.page = page;
        this.getStartedBtn = page.getByRole('link', {name: 'Get started'});
        this.title = /Playwright/;
    }

    //methods
    async clickGetStarted(){ 
        await this.getStartedBtn.click(); 
    }
    async assertPageTitle(){ 
        await expect(this.page).toHaveTitle(this.title);
    }

}

export default HomePage; //export HomePage object