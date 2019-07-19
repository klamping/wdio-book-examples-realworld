const axios = require('axios');

class Api {
    constructor (baseURL) {
        this.api = axios.create({
            baseURL,
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        })
    }

    getAuthToken ({email, password}) {
        return this.api
            .post('/users/login', { user: {email, password} })
            .then(res => res.data.user.token);
    }
}

module.exports = Api;