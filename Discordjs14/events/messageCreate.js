
// ประกาศค่าคงที่ที่จะใช้

const { Collection, ChannelType } = require("discord.js");
const { prefix, owner } = require("../config.json");


const escapeRegex = (string) => {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

module.exports = {
	name: "messageCreate",

	async execute(message) {
	

		const { client, guild, channel, content, author } = message;

		if (
			message.content == `<@${client.user.id}>` ||
			message.content == `<@!${client.user.id}>`
		) {
			require("../messages/onMention").execute(message);
			return;
		}

		const checkPrefix = prefix.toLowerCase();



		const prefixRegex = new RegExp(
			`^(<@!?${client.user.id}>|${escapeRegex(checkPrefix)})\\s*`
		);



		if (!prefixRegex.test(content.toLowerCase())) return;


		const [matchedPrefix] = content.toLowerCase().match(prefixRegex);

	

		const args = content.slice(matchedPrefix.length).trim().split(/ +/);

	

		const commandName = args.shift().toLowerCase();

	

		if (!message.content.startsWith(matchedPrefix) || message.author.bot)
			return;

		const command =
			client.commands.get(commandName) ||
			client.commands.find(
				(cmd) => cmd.aliases && cmd.aliases.includes(commandName)
			);

	

		if (!command) return;

	

		if (command.ownerOnly && message.author.id !== owner) {
			return message.reply({ content: "คำสั่งนี้ใช้ได้เฉพาะแอดมิน" });
		}

	

		if (command.guildOnly && message.channel.type === ChannelType.DM) {
			return message.reply({
				content: "ไม่สามารถส่งข้อความหาได้",
			});
		}



		if (command.permissions && message.channel.type !== ChannelType.DM) {
			const authorPerms = message.channel.permissionsFor(message.author);
			if (!authorPerms || !authorPerms.has(command.permissions)) {
				return message.reply({ content: "ไม่สามารถทำสิ่งนี้ได้!" });
			}
		}



		if (command.args && !args.length) {
			let reply = `คุณไม่สามารถโต้ตอบ ${message.author}!`;

			if (command.usage) {
				reply += `\nการใช้งานที่เหมาะสมจะเป็น: \`${prefix}${command.name} ${command.usage}\``;
			}

			return message.channel.send({ content: reply });
		}

	

		const { cooldowns } = client;

		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply({
					content: `โปรดรอ ${timeLeft.toFixed(
						1
					)} วินาทีก่อนที่จะใช้คำสั่ง \`${command.name}\``,
				});
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		try {
			command.execute(message, args);
		} catch (error) {
			console.error(error);
			message.reply({
				content: "มีบางอย่างผิดพลาดขณะใช้คำสั่งนี้!",
			});
		}
	},
};
