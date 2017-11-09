let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  framework: 'jasmine',
  specs: ['main-spec.js'],

  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [ /* "--headless", "--disable-gpu", "--window-size=1366,768" */ ]
      }
    },

   onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
  },

  jasmineNodeOpts: {
    showColors: true,
    print: function() {}
  } 
};