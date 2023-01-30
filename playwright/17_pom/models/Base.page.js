
class BasePage{
    constructor(page){
        this.page=page;
    }

    //navigate method (adds path to url for navigation):
    async navigate(path){
        await this.page.goto('https://demo.applitools.com/${path}');
    }
}

//exort class as module:
module.exports = BasePage;