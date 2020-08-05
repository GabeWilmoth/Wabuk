let MemeGenerator = require('../redditServices/MemeGenerator.js');
var cron = require("cron");
// require global logger from winston
var logger = require('../logger/Logger.js');

module.exports = {
	name: 'meme',
	description: 'MemeOfDay',
	execute(message, args) {
		let memeOfDayChannelID = message.channel.id;

        logger.info(`Meme Command used in channel: ${message.channel.name} channel id: ${memeOfDayChannelID}`);

        var memeGen = new MemeGenerator();

        // Cron Job to run every day at 12:00 aka 12pm aka noon.
        let scheduledMessage = new cron.CronJob('0 00 12 * * *', () => {
            memeGen.dailyMeme(memeOfDayChannelID, message.client, message)
        });

        scheduledMessage.start();

        message.delete().then(msg => logger.info(`Deleted message from ${msg.author.username}`))
        .catch(error => logger.error(`Attempted deleting message and encountered error: ${error}`));
        //TODO : Might want to add in a reply to the channel / message if an error is occured asking for permisions for the bot.
	},
};