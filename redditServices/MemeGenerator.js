let RedditConnection = require('./RedditConnection.js');

module.exports = class MemeGenerator {

    constructor(){
        this.redditConnection = new RedditConnection();

        //The Connection used to access all of the functions via the RedditAPI
        this.conn = this.redditConnection.getConnection();
    }

    async getMeme(){
        let memeURL = [];

        //Getting the Subreddit for memes
        return this.conn.getSubreddit('memes').getHot().then(Listing => {
            for (let i = 0; i < Listing.length; i++) {
                if (!Listing[i].stickied) {
                    //console.log(Listing[i]);
                    memeURL.push((Listing[i].url));
               }
            }
            return memeURL;
        });
    }

}