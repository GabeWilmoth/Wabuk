// require the discord.js module
const Discord = require('discord.js');
// dotenv for storing the token
require('dotenv').config();
// require global logger from winston
var logger = require('./logger/Logger.js');

const token = process.env.TOKEN;
const prefix = process.env.PREFIX;
// create a new Discord client
const client = new Discord.Client();

//Dynamic Command's
const fs = require('fs');
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

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
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