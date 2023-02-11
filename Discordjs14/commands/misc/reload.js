const fs = require("fs");

module.exports = {
	name: "reload",
	description: "โหลดคำสั่งใหม่",
	args: true,
	ownerOnly: true,

	execute(message, args) {

		const commandName = args[0].toLowerCase();

		const command =
			message.client.commands.get(commandName) ||
			message.client.commands.find(
				(cmd) => cmd.aliases && cmd.aliases.includes(commandName)
			);

		
		if (!command) {
			return message.channel.send({
				content: `ไม่พบคำสั่งตามที่คุณต้องการ \`${commandName}\`, ${message.author}!`,
			});
		}

		const commandFolders = fs.readdirSync("./commands");

		const folderName = commandFolders.find((folder) =>
			fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`)
		);


		delete require.cache[
			require.resolve(`../${folderName}/${command.name}.js`)
		];


		try {

			const newCommand = require(`../${folderName}/${command.name}.js`);

			
			message.client.commands.set(newCommand.name, newCommand);

			
			message.channel.send({
				content: `คำสั่ง \`${newCommand.name}\` โหลดแล้ว!`,
			});
		} catch (error) {
			
			console.error(error);
			message.channel.send({
				content: `มีบางอย่างผิดพลาดในการโหลดคำสั่ง \`${command.name}\`:\n\`${error.message}\``,
			});
		}
	},
};
