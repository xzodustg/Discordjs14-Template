module.exports = {
	data: {
		name: "sample",
		type: 3, // 3 คือโหมด Context Menu ข้อความ
	},

	async execute(interaction) {
		await interaction.reply({
			content: "นี่คือข้อความตอบกลับของ ContextMenu!",
		});
		return;
	},
};
