const Generic = require('./Generic.page');
const { mapText } = require('../../utils/functions')

class Feed {
    constructor (selector) {
        this.container = $(selector);
    }
    get $$articles () { return this.container.$$('[data-qa-type="article-preview"]') }
}

class Home extends Generic {
    constructor () {
        super('./')
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
    }
}

module.exports = new Home();