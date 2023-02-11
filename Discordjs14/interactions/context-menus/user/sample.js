module.exports = {
	data: {
		name: "sample",
		type: 2, // 2 คือ Context Menu ผู้ใช้
	},

	async execute(interaction) {
		await interaction.reply({
			content: "นี่คือข้อความตอบกลับของ Context Menu!",
		});
		return;
	},
};
