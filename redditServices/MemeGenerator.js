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
        await client.channels.fetch(memeOfDayChannelID).then(async channel => {
            await channel.send(meme[0]).then(async sentMessage => {
                logger.info(`Sent message: ${sentMessage.content} to channel: ${memeOfDayChannelID}`);

                // Trying to await reactions to the message in order to possibly fetch a new meme post.
                const filter = (reaction, user) => {
                    return ['👍', '👎'].includes(reaction.emoji.name);
                };

                sentMessage.awaitReactions(filter, {time: 60000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();
                        if (reaction.emoji.name === '👍') {
                            sentMessage.reply('you reacted with a thumbs up.');
                        }
                        else {
                            sentMessage.reply('you reacted with a thumbs down.');
                        }
                    })
                    .catch(collected => {
                        console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
                        sentMessage.reply('you didn\'t react with neither a thumbs up, nor a thumbs down.');
                    });

            }).catch(error => logger.error(`error sending meme message ${error}`))
        });
    }
}