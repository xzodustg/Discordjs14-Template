// เรียกใช้ไฟล์
const { prefix } = require("./../../config.json");

const { EmbedBuilder, ChannelType } = require("discord.js");

module.exports = {
	name: "help",
	description: "แสดงรายการคำสั่งทั้งหมดของบอทหรือข้อมูลเกี่ยวกับคำสั่งเฉพาะ.",
	aliases: ["commands"],
	usage: "[command name]",
	cooldown: 5,

	execute(message, args) {
		const { commands } = message.client;


		if (!args.length) {
		
			let helpEmbed = new EmbedBuilder()
				.setColor("Random")
				.setTitle("คำสั่งทั้งหมดของฉัน")
				.setDescription(
					"`" + commands.map((command) => command.name).join("`, `") + "`"
				)

				.addFields([
					{
						name: "Usage",
						value: `\nคุณสามารถใช้ \`${prefix}help [command name]\` เพื่อเปิดดูหน้าต่างคำสั่งเฉพาะ!`,
					},
				]);


			return message.author
				.send({ embeds: [helpEmbed] })

				.then(() => {
					if (message.channel.type === ChannelType.DM) return;


					message.reply({
						content: "ฉันส่งคำสั่งทั้งหมดให้ทางข้อความแล้ว!",
					});
				})
				.catch((error) => {

					console.error(
						`ไม่สามารถส่งข้อความหา ${message.author.tag}.\n`,
						error
					);

					message.reply({ content: "ฉันไม่สามารถส่งหาคุณได้" });
				});
		}


		const name = args[0].toLowerCase();

		const command =
			commands.get(name) ||
			commands.find((c) => c.aliases && c.aliases.includes(name));


		if (!command) {
			return message.reply({ content: "ไม่พบคำสั่งที่คุณต้องการ!" });
		}

		let commandEmbed = new EmbedBuilder()
			.setColor("Random")
			.setTitle("Command Help");

		if (command.description)
			commandEmbed.setDescription(`${command.description}`);

		if (command.aliases)
			commandEmbed.addFields([
				{
					name: "Aliases",
					value: `\`${command.aliases.join(", ")}\``,
					inline: true,
				},
				{
					name: "Cooldown",
					value: `${command.cooldown || 3} second(s)`,
					inline: true,
				},
			]);
		if (command.usage)
			commandEmbed.addFields([
				{
					name: "Usage",
					value: `\`${prefix}${command.name} ${command.usage}\``,
					inline: true,
				},
			]);

		message.channel.send({ embeds: [commandEmbed] });
	},
};
