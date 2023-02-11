module.exports = {
	async execute(interaction) {
		await interaction.reply({
			content: "เกิดปัญหาขณะเรียก modal!",
			ephemeral: true,
		});
		return;
	},
};
