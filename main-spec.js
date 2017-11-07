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

  it('Logging in with CORRECT Credentials should work', function() {
    expect(HomePage.Login('randydowling@gmail.com', 'password')).toBe(true);
  })

  it('Logging in with WRONG password should not work', function() {
    expect(HomePage.Login('randydowling@gmail.com', 'ZZpassword')).toBe(false);
  })

  it('Logging in with NO password should not work', function() {
    expect(HomePage.Login('randydowling@gmail.com', '')).toBe(false);
  })
})