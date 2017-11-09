var HomePageObject = function() {
    var driver = browser.driver;
    driver.get('http://automationpractice.com/index.php');

    browser.ignoreSynchronization = true;

    this.Reset = function() {
        driver.get('http://automationpractice.com/index.php').then(() => {
            this.LogOut();
        })
        browser.ignoreSynchronization = true;

        return this;
    }

    this.Login = function(email, password) {
        driver.findElement(by.className('login'))
            .then(function(elem) {
                elem.click();
            })
        driver.findElement(by.id('email'))
            .then(function(elem) {
                elem.sendKeys(email);
            })
        driver.findElement(by.id('passwd'))
            .then(function(elem) {  
                elem.sendKeys(password);
            })
        driver.findElement(by.id('SubmitLogin'))
            .then(function(elem) {  
                elem.click();
            })
        if (!password || !email)
        {
            var pattern = /There (are|is) \d+\serrors?/
            return driver.wait(driver.findElement(by.css('.alert-danger > p'))).then(() => {
                return driver.findElement(by.css('.alert-danger > p')).getText()
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
            return driver.findElement(by.className('account'))
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
        return driver.wait(() => { return driver.findElement(by.className('logout')); }, 5000).
            then((elem) => {
                elem.click();
                return driver.wait(() => {
                    return driver.findElement(by.className('login')).isDisplayed().
                        then((isDisplayed) => {
                            if (isDisplayed) {
                                return true;
                            }
                            else {
                                return false;
                            }
                        })
                    })
            },
            () => {
                return false;
            })
    };
};

module.exports = HomePageObject;