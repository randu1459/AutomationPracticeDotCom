var HomePageObject = function() {
    browser.driver.get('http://automationpractice.com/index.php');
    browser.driver.manage().window().maximize();
    const EC = protractor.ExpectedConditions;

    this.Reset = function() {
        browser.driver.get('http://automationpractice.com/index.php')
        browser.ignoreSynchronization = true;
        //Need to add a sign out function
        return this;
    }
    
    this.EnterSearchText = function(searchText) {
        browser.driver.wait(function() {
            return browser.driver.findElement(by.id('lst-ib'))
                .then(function(elem) {
                    elem.sendKeys(searchText);
                    //browser.sleep(2000) // Useful for watching what's happening.
                    return true;
                });
        }, 5000);
    return this;
    };

    this.Login = function(email, password) {
        browser.driver.findElement(by.className('login'))
                .then(function(elem) {
                    elem.click();
                })
        browser.driver.findElement(by.id('email'))
                .then(function(elem) {
                    elem.sendKeys(email);
                })
        browser.driver.findElement(by.id('passwd'))
                .then(function(elem) {  
                    elem.sendKeys(password);
                })
        browser.driver.findElement(by.id('SubmitLogin'))
                .then(function(elem) {  
                    elem.click();
                })
    return this;
}

    this.WasLoginSuccessful = function() {
        browser.sleep(2000);
        browser.driver.findElement(by.className('account')).then((result) => {
            if (result) {
                return true;
            }
            else {
                return false;
            }
        })
    };

    this.ResultsToContain = function(textToCheck) {
        return browser.driver.wait(EC.textToBePresentInElement($('#search'), textToCheck), 3000)
    };
};

module.exports = HomePageObject;