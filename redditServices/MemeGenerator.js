let RedditConnection = require('./RedditConnection.js');
// require global logger from winston
var logger = require('../logger/Logger.js');

module.exports = class MemeGenerator {

    constructor() {
        this.redditConnection = new RedditConnection();

        //The Connection used to access all of the functions via the RedditAPI
        this.conn = this.redditConnection.getConnection();
    }

    async getMeme() {
        let memeURL = [];
        //Getting the Subreddit for memes
        return this.conn.getSubreddit('memes').getHot().then(Listing => {
            for (let i = 0; i < Listing.length; i++) {
                if (!Listing[i].stickied) {
                    memeURL.push((Listing[i].url));
               }
            }
            return memeURL;
        });
    }

    async dailyMeme(memeOfDayChannelID, client, message) {
        //Array of Memes, Poggers
        let meme = await this.getMeme();
        await client.channels.fetch(memeOfDayChannelID).then(async channel => await channel.send(meme[0]).then(sentMessage => logger.info("Sent message: " + sentMessage.content + " to channel: " + memeOfDayChannelID + " at: " + new Date().toLocaleString())).catch(error => logger.error("error sending meme message " + error)));
    }
}