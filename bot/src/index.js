const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config/config.json');
const handlePrefix = require('./handlePrefix');

client.on('ready', () => {
	console.log('Ready!');
});

client.login(config.token);

client.on('message', message  => {
	if (client.user.id !== message.author.id) {
		message.channel.send(message.content);
		if (message.content.substr(0) === `${config.prefix}`) {
			handlePrefix.process(message.content.substr(1));
		} else {
			// process message here
		}
	}
});
