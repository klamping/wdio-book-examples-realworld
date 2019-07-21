const Generic = require('./Generic.page');
const Feed = require('./Feed.component');
const { mapText } = require('../../utils/functions')

class Home extends Generic {
    constructor (url) {
        url = url || './';
        super(url)
    }
    load() {
        super.load();
        this.currentFeed.waitForLoad();
    }
    loadAsUser() {
        this.load();
        browser.waitUntil(() => this.$$siteNavLinks.length === 4);
    }
    get $feedsContainer () { return $('[data-qa-id="feed-tabs"]') }
    get $$feedTabs () { return this.$feedsContainer.$$('[data-qa-type="feed-tab"]') }
    get feedTabsText () { return this.$$feedTabs.map(mapText); }
    get activeFeedTabText () { return this.$feedsContainer.$$('[data-qa-type="feed-tab"] .active').map(mapText) }
    get currentFeed () { return new Feed('[data-qa-type="article-list"]') }

    clickTab (tabText) {
        const tabToClick = this.$$feedTabs.find($tab => $tab.getText() === tabText);
        tabToClick.click();
        this.currentFeed.waitForLoad();
    }
}

module.exports = Home;