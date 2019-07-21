class ArticlePreview {
    constructor (element) {
        this.container = element;
    }

    get $author () { return this.container.$('[data-qa-type="author-name"]') }
    get $date () { return this.container.$('[data-qa-type="article-date"]') }
    get $title () { return this.container.$('[data-qa-type="preview-title"]') }
    get $description () { return this.container.$('[data-qa-type="preview-description"]') }
    get $readMoreLink () { return this.container.$('[data-qa-type="preview-link"]') }
    get $favorite () { return this.container.$('[data-qa-type="article-favorite"]') }
    get $tags () { return this.container.$('[data-qa-type="tag-list"]') }

    getDetails() {
        this.container.scrollIntoView(true);
        return {
            author: this.$author.getText().trim(),
            date: this.$date.getText().trim(),
            title: this.$title.getText().trim(),
            description: this.$description.getText().trim()
        }
    }
}

module.exports = ArticlePreview;