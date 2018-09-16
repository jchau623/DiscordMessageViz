/* NODE DEPENDENCIES */
const Discord = require('discord.js');
const Debounce = require('debounce');

/* LOCAL DEPENDENCIES */
const config = require('./config/config.json');
const handlePrefix = require('./handlePrefix');

/* LOCAL GLOBALS */
const client = new Discord.Client();
let aQueuedUpMessages = [];

/* CLIENT EVENT HANDLERS*/
client.on('ready', () => {
	console.log('Ready!');
});

client.login(config.token)
	.then(function() {
		/*
			Login to amazon rds instance
		*/
	})
	.catch(function(error) {
		/*r
			Log error to server
		*/
	});

client.on('message', oMessage  => {
	if (client.user.id !== oMessage.author.id) {
		if (oMessage.content.substr(0) === `${config.prefix}`) {
			handlePrefix.process(oMessage.content.substr(1));
		} else {
			aQueuedUpMessages.push(oMessage);
			_debouncedProcessMessage();
		}
	}
});

/* FUNCTION DEFINITIONS */
let processMessage = function() {
	let channelMap = {};
	aQueuedUpMessages.forEach(oMsg => {
		if (!channelMap[oMsg.channel.id]) channelMap[oMsg.channel.id] = [];
		channelMap[oMsg.channel.id].push(oMsg);
	});
	aQueuedUpMessages = [];
	
	// Temp fn definition for now to test debounce, combine messages for each channel and send
	Object.keys(channelMap).forEach(sChannelKey => {
		let sMsg = "";
		channelMap[sChannelKey].forEach(oMsg => {
			sMsg += "\n" + oMsg.content;
		});
		channelMap[sChannelKey][0].channel.send(sMsg);
	});
}

let _debouncedProcessMessage = Debounce(processMessage, 1000);