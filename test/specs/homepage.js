const expect = require('chai').expect;
const Home = require('../pageObjects/Home.page');
const home = new Home();

describe('Homepage - Anonymous', function () {
    before(function () {
        // load the page
        home.load();
    })
    it('should load properly', function () {
        // get the title of the homepage and check that it's correct
        expect(browser.getTitle()).to.equal('Conduit');

        // check that top nav/footer exist
        expect(home.$siteHeader.isExisting(), 'Site Header').to.be.true;
        expect(home.$siteFooter.isExisting(), 'Site Footer').to.be.true;
        expect(home.$siteNav.isExisting(), 'Site Nav').to.be.true;

        expect(home.siteNavLinksText).to.deep.equal(['Home', 'Sign in', 'Sign up']);
    })

    it('should only show the global feed tab', function () {
        expect(home.feedTabsText).to.deep.equal(['Global Feed']);
    })
})