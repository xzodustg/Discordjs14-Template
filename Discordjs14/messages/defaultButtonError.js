module.exports = {
	async execute(interaction) {
		await interaction.reply({
			content: "เกิดปัญหาขณะเรียกปุ่มนี้!",
			ephemeral: true,
		});
		return;
	},
};
