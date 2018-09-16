const config = require('./config/config.json');

module.exports = {
	process: function(message) {
		_process(message);
	}	
}

function _process(message) {
	switch(message) {
		case 'help':
			console.log("help");
			break;
		default:
			return;
	}
}
