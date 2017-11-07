var HomePageObject = function() {
    browser.driver.get('http://automationpractice.com/index.php');
    browser.driver.manage().window().maximize();
    const EC = protractor.ExpectedConditions;

    this.Reset = function() {
        browser.driver.get('http://automationpractice.com/index.php')
        var currentUrl = browser.wait(browser.driver.getCurrentUrl().then((actualUrl) => { return actualUrl}))
        console.log(currentUrl)
        browser.ignoreSynchronization = true;
        this.LogOut(currentUrl)
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
        var successful;
        var currentUrl = browser.wait(browser.driver.getCurrentUrl().then((result) => { return result }))
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
        this.WaitForUrlToChange(currentUrl).then(() => {
                console.log(currentUrl.toString())
                browser.driver.findElement(by.className('account'))
                .then((result) => { 
                if (result) {
                    successful = true
                }
                else {
                    successful = false
                }   
                },
                (e) => { 
                    successful = false;
                })
        return successful
        })                
    };

    this.LogOut = function(currentUrl) {
        this.WaitForUrlToChange(currentUrl).then(() => {
            browser.driver.findElement(by.className('logout')).then(function(elem) {
                elem.click();
            },
            (e) => { 
                throw new Error("Couldn't find the logout button using class name 'logout'. Verify that it is on the page.");
            })
        })
    };

    this.WaitForUrlToChange = function(currentUrl) { 
                return browser.driver.wait(function waitForUrlToChangeTo() {
                    return browser.driver.getCurrentUrl().then(function compareCurrentUrl(url) {
                        return currentUrl != url
                    });
                });
            }
};

module.exports = HomePageObject;