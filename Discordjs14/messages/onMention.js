const { prefix } = require("../config.json");

module.exports = {
	async execute(message) {
		return message.channel.send(
			`สวัสดี ${message.author}! คำสั่งของฉัน คือ \`${prefix}\`, คำสั่งช่วยเหลือ คือ \`${prefix}help\``
		);
	},
};
