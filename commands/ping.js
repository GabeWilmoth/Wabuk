// require global logger from winston
var logger = require('../logger/Logger.js');

module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
		message.channel.send('Pong.');
	},
};