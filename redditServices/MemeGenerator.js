let RedditConnection = require('./RedditConnection.js');

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

    async dailyPostLoop(memeOfDayChannelID, client, message) {
        let alreadyPostestToday = false;
       
        while (true) {
            let Todaysdate = new Date();
            let hours = Todaysdate.getHours();
    
            if(hours == 0) {
                alreadyPostestToday = false;
            }
    
            if (hours == 18 && !alreadyPostestToday) {
                alreadyPostestToday = true;
                //Array of Memes, Poggers
                let meme = await this.getMeme();
                await client.channels.fetch(memeOfDayChannelID).then(async channel => await channel.send(meme[0]));
            }
        }
    }
}