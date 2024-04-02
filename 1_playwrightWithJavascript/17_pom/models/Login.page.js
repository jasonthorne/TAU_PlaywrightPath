
//import bas page:
const BasePage = require('./Base.page');

class LoginPage extends BasePage {
    constructor(page){
        super(page); //pass page to BasePage

        //locators for the elements in the login page;
        this.userNameTxt = '#username';
        this.passwordTxt = '#password';
        this.loginBtn = "#log-in";
    }

    async navigate(){
        //call navigate in BasePage, and pass it index.html as path:
        await super.navigate('index.html');
    }

    //fill login and password text boxes:
    async login(username, password){
        await this.page.fill(this.userNameTxt, username); //fill username txt box with username
        await this.page.fill(this.passwordTxt, password); //fill pasowrd txt box with password
        await this.page.click(this.loginBtn); //clickc login btn
    }
}

//export class as module:
module.exports = LoginPage;