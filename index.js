let MemeGenerator = require('./redditServices/MemeGenerator.js');

// require the discord.js module
const Discord = require('discord.js');
// dotenv for storing the token
require('dotenv').config();

const token = process.env.TOKEN;

// create a new Discord client
const client = new Discord.Client();

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

client.on('message', async message => {
	if (message.content === '!postMemeOfDayHere') {

        let memeOfDayChannelID = message.channel.id;
        console.log(memeOfDayChannelID);

        testing(memeOfDayChannelID);
    }
});

async function testing(memeOfDayChannelID){
    let alreadyPostestToday = false;
    let plusOne = 0;

    while (true) {
        let Todaysdate = new Date();
        let hours = Todaysdate.getHours();
        let dayOfMonth = Todaysdate.getDate();
        let month = Todaysdate.getMonth() + 1;
        
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        // if(plusOne < 2){
        //     yesterday.setDate(yesterday.getDate + 2);
        // }

        if(yesterday.getDate() == Todaysdate.getDate() && (yesterday.getMonth() + 1) == (Todaysdate.getMonth() + 1)) {
            alreadyPostestToday = false;
            console.log('HERE');
        }

        if (hours == 15 && !alreadyPostestToday) {
            alreadyPostestToday = true;
            console.log('HERE2');
            // plusOne++;
            let memeGen = new MemeGenerator();
            //Array of Memes, Poggers
            let meme = await memeGen.getMeme();
            await client.channels.fetch(memeOfDayChannelID).then(async channel => await channel.send(meme[0]));
        }
    }
}

// login to Discord with your app's token
client.login(token);