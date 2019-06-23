const expect = require('chai').expect;
const auth = require('../pageObjects/auth.page');

describe('Login Form', function () {
    beforeEach(function () {
        browser.url('./login');
    })

    it('should let you log in', function () {
        auth.login('demowdio@conduit.com', 'wdiodemo');

        // Get the URL of the page, which should no longer include 'login'
        expect(browser.getUrl()).to.not.include('/login');
    });

    it('should error with a missing username', function () {
        auth.login('', 'wdiodemo');

        expect(auth.$errorMessages.getText()).to.equal('email or password is invalid');
    });

    it('should error with a missing password', function () {
        auth.login('demowdio@conduit.com', '');

        expect(auth.$errorMessages.getText()).to.equal('email or password is invalid');
    });
});