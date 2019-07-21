const Home = require('./Home.page');

class TagPage extends Home {
    constructor(tagName) {
        super('./tag/' + tagName);
    }
}

module.exports = TagPage;