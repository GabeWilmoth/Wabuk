let MemeGenerator = require('./redditServices/MemeGenerator.js');

// require the discord.js module
const Discord = require('discord.js');
// dotenv for storing the token
require('dotenv').config();

const token = process.env.TOKEN;

// create a new Discord client
const client = new Discord.Client();

// requiring cron package to schedule events
var cron = require("cron");

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content === 'Rping') {
        // send back "Pong." to the channel the message was sent in
        message.channel.send('Pong.');
    }
});

client.on('message', message => {
    if(message.content === 'RpostMemeOfDayHere') {
        let memeOfDayChannelID = message.channel.id;

        console.log(memeOfDayChannelID);

        var memeGen = new MemeGenerator();

        // Cron Job to run every day at 12:00 aka 12pm aka noon.
        let scheduledMessage = new cron.CronJob('0 00 12 * * *', () => {
            memeGen.dailyMeme(memeOfDayChannelID, client, message)
        });

        scheduledMessage.start();
    }
});

// login to Discord with your app's token
client.login(token).then(retVal => {
    // (client.guilds.resolve('696215256518754406').members.fetch().then(totalUsers => {
    //     console.log(totalUsers.get('398289694686969866'));
    // }));
});