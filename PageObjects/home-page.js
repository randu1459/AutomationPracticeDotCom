var HomePageObject = function() {
    browser.driver.get('http://automationpractice.com/index.php');

    browser.ignoreSynchronization = true;

    this.Reset = function() {
        browser.driver.get('http://automationpractice.com/index.php').then(() => {
            this.LogOut();
        })
        browser.ignoreSynchronization = true;

        return this;
    }

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
        if (!password || !email)
        {
            var pattern = /There (are|is) \d+\serrors?/
            return browser.driver.wait(browser.driver.findElement(by.css('.alert-danger > p'))).then(() => {
                return browser.driver.findElement(by.css('.alert-danger > p')).getText()
                    .then((result) => { 
                        if (pattern.test(result)) {
                            return false;
                        }
                    },
                        (e) => { 
                            console.log(result);
                            throw new Error("The '.alert-danger > p' was not found in the Login() method.")
                        })
            })
        }
        else {
            return browser.driver.findElement(by.className('account'))
                .then((result) => { 
                if (result) {
                    return true;
                }
                else {
                    return false;
                }   
                },
                (e) => { 
                    return false;
                })
        }
    };             

    this.LogOut = function() {
            browser.wait(browser.driver.findElement(by.className('logout')).then(function(elem) {
                elem.click();
                // TODO: Verify that logout occurred and throw error if element wasn't found.
                return true;
            },
            (e) => { 
                console.log('Function: "LogOut" was unable to find an element with a class of "logout".')
                return false;
            } 
        ))
    };
};

module.exports = HomePageObject;