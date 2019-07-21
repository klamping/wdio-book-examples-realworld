const expect = require('chai').expect;
const auth = require('../pageObjects/auth.page');
const Home = require('../pageObjects/Home.page');
const home = new Home();
const { user1 } = require('../fixtures/users');

describe('Homepage - User', function () {
    before(function () {
        browser.loginViaApi(user1);

        home.loadAsUser();
    })
    it('should load properly', function () {
        // get the title of the homepage and check that it's correct
        expect(browser.getTitle()).to.equal('Conduit');

        // check that top nav/footer exist
        expect(home.$siteHeader.isExisting(), 'Site Header').to.be.true;
        expect(home.$siteFooter.isExisting(), 'Site Footer').to.be.true;
        expect(home.$siteNav.isExisting(), 'Site Nav').to.be.true;

        expect(home.siteNavLinksText).to.deep.equal(['Home', 'New Article', 'Settings', user1.username]);
    })

    it('should show both the global and personal feed tabs', function () {
        expect(home.feedTabsText).to.deep.equal(['Your Feed', 'Global Feed']);
    })

    it('should default to showing the global feed', function () {
        // get all tabs with an 'active' class, check that only one returns with correct text
        expect(home.activeFeedTabText).to.deep.equal(['Global Feed']);
    })

    it('should let you switch between global and personal feeds', function () {
        // // click on 'Your feed' tab
        home.clickTab('Your Feed');
        // // validate 'active' tabs are correct
        expect(home.activeFeedTabText).to.deep.equal(['Your Feed']);
        // click 'Global' tab
        home.clickTab('Global Feed');
        // validate again
        expect(home.activeFeedTabText).to.deep.equal(['Global Feed']);
    })

    describe('Personal Feed', function () {
        before(function () {
            // ensure we're on the active feed tab
            if (home.activeFeedTabText !== 'Your Feed') {
                home.clickTab('Your Feed');
            }
        })
        it('should show articles just from people you follow', function () {
            expect(home.currentFeed.$$articles).to.have.length(1)
        })
        it('should show most recent article first', function () {
            const firstArticleDetails = home.currentFeed.articles[0].getDetails();
            expect(firstArticleDetails).to.have.property('author', 'demowdioA');
            expect(firstArticleDetails).to.have.property('date', 'July 8, 2019');
            expect(firstArticleDetails).to.have.property('title', 'Test Article');
            expect(firstArticleDetails).to.have.property('description', 'Testing some things');
        })
    })
})