var HomePageObject = require('./PageObjects/home-page.js');

describe('AutomationPractice.Com Login Test:', function() {
  var HomePage;

 beforeAll(function() {
      HomePage = new HomePageObject(); 
  })

  beforeEach(function(){
      //HomePage.Reset();
  })

  it('Logging in with Good Credentials should work', function() {
    expect(HomePage.Login('randydowling@gmail.com', 'ZZpassword').WasLoginSuccessful()).toBe(true);
  })
})