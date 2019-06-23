const expect = require('chai').expect;

describe('Homepage', function () {
  it('should load properly', function () {
    // load the page
    browser.url('./');

    // get the title of the homepage and check that it's correct
    expect(browser.getTitle()).to.equal('Conduit');

    // Click the 'Sign in' navigation link
    $('=Sign in').click();

    // Get the URL of the about page, should include 'about'
    expect(browser.getUrl()).to.include('/login');
  })
})