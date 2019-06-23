const expect = require('chai').expect;
const auth = require('../pageObjects/auth.page');
const editor = require('../pageObjects/editor.page');
const article = require('../pageObjects/article.page');
const { user1 } = require('../fixtures/users');

describe('Post Editor', function () {
    before(function () {
        auth.load();
        auth.login(user1.email, user1.password);
        editor.load();
    })
    it('should load page properly', function () {
        expect(browser.getUrl()).to.equal(editor.fullUrl.href);
        expect(editor.$title.isExisting(), 'Title').to.be.true;
        expect(editor.$description.isExisting(), 'Description').to.be.true;
        expect(editor.$body.isExisting(), 'Body').to.be.true;
        expect(editor.$tags.isExisting(), 'Tags').to.be.true;
        expect(editor.$publish.isExisting(), 'Publish').to.be.true;
    });

    it('should let you publish a new post', function () {
        const articleDetails = {
            title: chance.sentence({ words: 3 }),
            description: chance.sentence({ words: 7 }),
            body: chance.paragraph({ sentences: 2 }),
            tags: [chance.word(), chance.word()]
        };

        editor.submitArticle(articleDetails);

        article.waitForLoad();

        expect(article.$title.getText(), 'Title').to.equal(articleDetails.title);
        expect(article.$body.getText(), 'Body').to.equal(articleDetails.body);
        expect(article.tags.sort(), 'Tags').to.deep.equal(articleDetails.tags.sort());

        // to avoid making a ton of articles, let's just click the delete button to clean ourselves up
        // We'll talk about a better way to clean later on
        article.$delete.click()
    });
})