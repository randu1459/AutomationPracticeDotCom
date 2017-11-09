var HomePageObject = require('./PageObjects/home-page.js');
var driver = browser.driver;

describe('AutomationPractice.Com Login Tests:', function() {
  var HomePage;

 beforeAll(function() {
      HomePage = new HomePageObject(); 
      driver.manage().window().maximize();
  })

  beforeEach(function(){
  })

  afterEach(() => {
    driver.sleep(2000);
    HomePage.Reset();
  })

  afterAll(() => {
    driver.quit();
  })

  it('CORRECT Credentials should work', function() {
    expect(HomePage.Login('randydowling@gmail.com', 'password')).toBe(true);
  })

  it('BAD Credentials should fail', function() {
    expect(HomePage.Login('randudowling@gmail.com', 'ZZpassword')).toBe(false);
  })

  it('WRONG password should fail', function() {
    expect(HomePage.Login('randydowling@gmail.com', 'ZZpassword')).toBe(false);
  })

  it('NO password should fail', function() {
    expect(HomePage.Login('randydowling@gmail.com', '')).toBe(false);
  })

  it('WRONG email should fail', function() {
    expect(HomePage.Login('randudowling@gmail.com', 'password')).toBe(false);
  })

  it('NO email should fail', function() {
    expect(HomePage.Login('', 'password')).toBe(false);
  })

  it('NO email and NO email should fail', function() {
    expect(HomePage.Login('', '')).toBe(false);
  })

  it('Simple SQL Injection attempt should fail', function() {
    expect(HomePage.Login("$username = 1' or '1' = '1", "$password = 1' or '1' = '1")).toBe(false);
  })

  it('Sign Out should work if logged in', function() {
    HomePage.Login('randydowling@gmail.com', 'password');
    expect(HomePage.LogOut()).toBe(true);
  })

  it('Sign Out should fail if not logged in', function() {
    // Doing nothing. User is not logged in.
    expect(HomePage.LogOut()).toBe(false);
  })
})