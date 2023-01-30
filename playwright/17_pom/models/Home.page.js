
//import base page:
const BasePage = require('./Base.page');

class HomePage extends BasePage {
    constructor(page){
        super(page); //pass page to BasePage

        //locators for the elements in the home page;
        this.loggedUser = '.logged-user-name';
        this.balances = '.balance-value';
    }

    async getBalance(balanceType){
        //grab all elements in .balance-value:
        let balArray = await this.page.$$(this.balances);

        if(balanceType == 'total'){
            //total value is inside span, so grab span from element first
            //then get text from that:
            return(await balArray[0].$('span')).innerText();
        }
        else if (balanceType == 'credit'){
            //no span here, so just grab inner test:
            return (await balArray[1]).innerText();
        }else{
            //return last element:
            return (await balArray[2]).innerText();
        }
    }

    //navigateto home page:
    async navigate(){
        await super.navigate('app.html');
    }
}