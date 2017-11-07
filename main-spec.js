var HomePageObject = require('./PageObjects/home-page.js');

describe('AutomationPractice.Com Login Test:', function() {
  var HomePage;

 beforeAll(function() {
      HomePage = new HomePageObject(); 
  })

  beforeEach(function(){
  })

  afterEach(() => {
    HomePage.Reset();
  })

  it('Logging in with GOOD Credentials should work', function() {
    expect(HomePage.Login('randydowling@gmail.com', 'password')).toBe(true);
  })

  it('Logging in with BAD Credentials should not work', function() {
    expect(HomePage.Login('randydowling@gmail.com', 'ZZpassword')).toBe(false);
  })
})