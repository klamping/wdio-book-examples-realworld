const expect = require('chai').expect;
const home = require('../pageObjects/home.page');
const auth = require('../pageObjects/auth.page');
const { user1 } = require('../fixtures/users');
const Api = require('../../utils/Api');

describe('Homepage - User', function () {
    before(function () {
        const api = new Api('https://conduit.productionready.io/api');
        const token = browser.call(() => {
            return api.getAuthToken(user1);
        });

        // load the page
        home.load();

        // inject the auth token
        browser.execute((browserToken) => {
            window.localStorage.setItem('id_token', browserToken);
        }, token);

        // reload the page
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
        it('should show most recent articles from people you follow', function () {
            console.log('homepage-user.js :53', home.currentFeed);
            expect(home.currentFeed.$$articles).to.have.lengthOf.above(0)
        })
    })
})