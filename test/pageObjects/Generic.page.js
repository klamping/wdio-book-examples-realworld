const { URL } = require('url');
const { mapText } = require('../../utils/functions')

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
    get $siteHeader () { return $('[data-qa-id="site-header"]'); }
    get $siteNav () { return $('[data-qa-id="site-nav"]'); }
    get $$siteNavLinks () { return this.$siteNav.$$('a'); }
    get siteNavLinksText () {
        return this.$$siteNavLinks.map(mapText);
    }
    get $siteFooter () { return $('[data-qa-id="site-footer"]'); }
}

module.exports = Generic;