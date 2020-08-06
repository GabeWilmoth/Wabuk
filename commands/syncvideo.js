// require global logger from winston
var logger = require('../logger/Logger.js');

module.exports = {
	name: 'syncvideo',
	description: 'Sync Video Command',
	execute(message, args) {
		message.channel.send('Sync.');

		//RsyncVideo youtubeLink
		//or (if they populate a youtube link we will bring the room up with that video loaded... If they don't provide a link we will bring a blank room up)
		//RsyncVideo 

		/* TODO:
		* Accept requests with arugments
		* Send Request to iframe in HTML
		* 	Figure out interactivity with youtube videos within an Iframe
		* 
		* Figure out syncing between multiple users concurrently
		*/

	},
};