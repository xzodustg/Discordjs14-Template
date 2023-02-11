module.exports = {
	async execute(interaction) {
		await interaction.reply({
			content: "เกิดปัญหาขณะเรียก SelectMenu!",
			ephemeral: true,
		});
		return;
	},
};
