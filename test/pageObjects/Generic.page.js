const { URL } = require('url');

class Generic {
    constructor (url) {
        this.url = url;

        // store the fullUrl by combining specific page url with WDIO base url
        // using NodeJS URL utility
        this.fullUrl = new URL(url, browser.options.baseUrl);
    }
    load() {
        browser.url(this.url);
    }
}

module.exports = Generic;