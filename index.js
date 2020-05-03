// require the discord.js module
const Discord = require('discord.js');
// dotenv for storing the token
require('dotenv').config();
// require snoowrap (A wrapper around the reddit API)
var snoowrap = require('snoowrap');

const token = process.env.TOKEN;

// create a new Discord client
const client = new Discord.Client();



let memeURL;
// Alternatively, just pass in a username and password for script-type apps.
const r = new snoowrap({
    userAgent: process.env.userAgentREDDIT,
    clientId: process.env.clientIdREDDIT,
    clientSecret: process.env.clientSecretREDDIT,
    username: process.env.usernameREDDIT,
    password: process.env.passwordREDDIT
  });

//Getting the Subreddit for memes
r.getSubreddit('memes').getHot().then(Listing =>{
    console.log(Listing[2].url);
    memeURL = Listing[2].url;
});



// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content === '!ping') {
        // send back "Pong." to the channel the message was sent in
        message.channel.send('Pong.');
    }
});

client.on('message', message => {
	if (message.content === '!meme') {
        // send back a meme to the channel the message was sent in
        message.channel.send(memeURL);
    }
});

// login to Discord with your app's token
client.login(token);