let MemeGenerator = require('../redditServices/MemeGenerator.js');
var cron = require("cron");
// require global logger from winston
var logger = require('../logger/Logger.js');

module.exports = {
	name: 'meme',
	description: 'MemeOfDay',
	execute(message, args) {

        //TODO: Maybe allow users to specify how many memes they want posted a day and at what times? (Taking in times would take a lot of formatting or forcing strict formatting on users)

		let memeOfDayChannelID = message.channel.id;

        logger.info(`Meme Command used in channel: ${message.channel.name} channel id: ${memeOfDayChannelID}`);

        var memeGen = new MemeGenerator();

        // Cron Job to run every day at 12:00 aka 12pm aka noon.
        let scheduledMessage = new cron.CronJob('0 00 12 * * *', () => {
            memeGen.dailyMeme(memeOfDayChannelID, message.client, message)
        });

        // Cron Job to run every day at 19:00 aka 7pm.
        let scheduledMessage2 = new cron.CronJob('0 00 19 * * *', () => {
            memeGen.dailyMeme(memeOfDayChannelID, message.client, message)
        });

        scheduledMessage.start();
        scheduledMessage2.start();

        // Get messages testing for future modderation stuff
        // message.channel.messages.fetch({ limit: 10 })
        //     .then(messagesTest => {
        //         for (const [key, value] of messagesTest.entries()) {
        //             console.log(key, value.author.username, value.createdAt);
        //         }
        //     }).catch(console.error);

        //Deleting the Rmeme command the user sent. 
        message.delete()
        .then(msg => logger.info(`Deleted message from ${msg.author.username}`))
        .catch(error => {
            logger.error(`Attempted deleting message and encountered error: ${error}`);
            if(error.message === 'Missing Permissions') {
                message.reply("I'm attempting to delete 'Rmeme' however, I'm Missing Permissions. Please Grant Permissions or remove these messages :thumbsup_tone3:");
            }
        });
	},
};