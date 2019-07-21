const ArticlePreview = require('./ArticlePreview.component');

class Feed {
    constructor (selector) {
        this.container = $(selector);
    }
    get $$articles () { return this.container.$$('[data-qa-type="article-preview"]') }
    get articles () { return this.$$articles.map(article => new ArticlePreview(article)); }
    get $articleLoadingIndicator () { return $('[data-qa-id="article-loading-indicator"]') }
    waitForLoad () {
        this.$articleLoadingIndicator.waitForExist(null, true);
    }
}

module.exports = Feed;