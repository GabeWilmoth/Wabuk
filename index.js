// require the discord.js module
const Discord = require('discord.js');
// dotenv for storing the token
require('dotenv').config();
// require global logger from winston
var logger = require('./logger/Logger.js');
// require filesystem for file related processes
const fs = require('fs');
// require cron for time based jobs
var cron = require('cron');

const token = process.env.TOKEN;
const prefix = process.env.PREFIX;
// create a new Discord client
const client = new Discord.Client();

// Map to see if meme command is used more than once in the server
let channelIdMemeMap = new Map();

//Dynamic Command's
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    logger.info(`JSON of possible commands: ${JSON.stringify(command)}`);
	client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    logger.info("The Client is Ready");
});

// let testCron =  new cron.CronJob('0 41 00 * * *', () => {
//     let test = client.users.cache;
//     let jsonTest = test.toJSON;

//     console.log(jsonTest);

//     for (const [key, value] of test.entries()) {
//         console.log(key, value.lastMessage);
//     }
// });

// testCron.start();

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

	try {
        if(command === "meme" && !channelIdMemeMap.has(message.channel.id)) {
            client.commands.get(command).execute(message, args);
            channelIdMemeMap.set(message.channel.id, null);
        } else if(command != "meme") {
            client.commands.get(command).execute(message, args);
        } else {
            message.reply(`The command: ${prefix + command} has already been used in the server.`);
            logger.info(`The command: ${command} has already been used in the server: ${message.channel.guild.name}`)
        }
	} catch (error) {
        logger.error(`There was an error trying to execute that command! ${error}`);
		message.reply('There was an error trying to execute that command!');
    }
});

// login to Discord with your app's token
client.login(token).then(retVal => {
    // (client.guilds.resolve('696215256518754406').members.fetch().then(totalUsers => {
    //     console.log(totalUsers.get('398289694686969866'));
    // }));
});