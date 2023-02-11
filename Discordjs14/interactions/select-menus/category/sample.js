module.exports = {
	id: "sample",

	async execute(interaction) {
		await interaction.reply({
			content: "นี่คือข้อความตอบกลับของ SelectMenu!",
		});
		return;
	},
};
