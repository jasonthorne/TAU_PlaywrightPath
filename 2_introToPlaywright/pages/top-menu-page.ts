import {expect, Locator, Page} from '@playwright/test'

export class TopMenuPage {
    readonly page: Page;
    readonly getStartedLink: Locator;
    readonly nodeLink: Locator;
    readonly javaLink: Locator;
    readonly nodeLabel: Locator;
    readonly javaLabel: Locator;
    readonly nodeDesc: string = 'Installing Playwright';
    readonly javaDesc: string = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;

    constructor(page: Page){
        this.page = page;
        this.getStartedLink = page.getByRole('link', {name: 'Get started'});
        this.nodeLink = page.getByRole('button', {name: 'Node.js'});
        this.javaLink = page.getByRole('navigation', {name: 'Main'}).getByText(this.javaDesc);
        this.nodeLabel = page.getByText(this.nodeDesc, {exact: true});
        this.javaLabel = page.getByText(this.javaDesc/*, {exact: true}*/);
    }

}