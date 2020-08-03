// require the discord.js module
const Discord = require('discord.js');
// dotenv for storing the token
require('dotenv').config();

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
    console.log(command);
	client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

	try {
        console.log("HERE");
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

// login to Discord with your app's token
client.login(token).then(retVal => {
    // (client.guilds.resolve('696215256518754406').members.fetch().then(totalUsers => {
    //     console.log(totalUsers.get('398289694686969866'));
    // }));
});