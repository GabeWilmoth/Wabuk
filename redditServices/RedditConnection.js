require('dotenv').config();
// require global logger from winston
var logger = require('./logger/Logger.js');

module.exports = class RedditConnection {

    constructor() {
        //require snoowrap (A wrapper around the reddit API)
        this.snoowrap = require('snoowrap');
    }
    
    getConnection(){
        //Connection info for snoowrap
        const r = new this.snoowrap({
            userAgent: process.env.userAgentREDDIT,
            clientId: process.env.clientIdREDDIT,
            clientSecret: process.env.clientSecretREDDIT,
            username: process.env.usernameREDDIT,
            password: process.env.passwordREDDIT
        });

        return r;
    }
}