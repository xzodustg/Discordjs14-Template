const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
	// ข้อมูลที่จำเป็นในการลงทะเบียนคำสั่งสแลชไปยัง Discord

	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription(
			"แสดงรายการคำสั่งทั้งหมดของบอทหรือข้อมูลเกี่ยวกับคำสั่งเฉพาะ"
		)
		.addStringOption((option) =>
			option
				.setName("command")
				.setDescription("คำสั่งเฉพาะเพื่อดูข้อมูลของ")
		),

	async execute(interaction) {

		let name = interaction.options.getString("command");

		const helpEmbed = new EmbedBuilder().setColor("Random");

		if (name) {
			name = name.toLowerCase();

			// หากมีการร้องขอคำสั่งเดียว ให้ส่งความช่วยเหลือจากคำสั่งนี้เท่านั้น

			helpEmbed.setTitle(`Help for \`${name}\` command`);

			if (interaction.client.slashCommands.has(name)) {
				const command = interaction.client.slashCommands.get(name);

				if (command.data.description)
					helpEmbed.setDescription(
						command.data.description + "\n\n**Parameters:**"
					);
			} else {
				helpEmbed
					.setDescription(`No slash command with the name \`${name}\` found.`)
					.setColor("Red");
			}
		} else {
			// แสดงรายการคำสั่งทั้งหมด

			helpEmbed
				.setTitle("List of all my slash commands")
				.setDescription(
					"`" +
						interaction.client.slashCommands
							.map((command) => command.data.name)
							.join("`, `") +
						"`"
				);
		}

		// ตอบกลับข้อความ

		await interaction.reply({
			embeds: [helpEmbed],
		});
	},
};
