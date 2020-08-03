// require global logger from winston
var logger = require('./logger/Logger.js');

module.exports = {
	name: 'syncvideo',
	description: 'Sync Video Command',
	execute(message, args) {
		message.channel.send('Sync.');
	},
};