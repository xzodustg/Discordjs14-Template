const { InteractionType, ComponentType } = require("discord-api-types/v10");

module.exports = {
	name: "interactionCreate",

	async execute(interaction) {
		
		const { client } = interaction;

		// ตรวจสอบว่าการโต้ตอบเป็นการโต้ตอบของปุ่มหรือไม่ (เพื่อป้องกันบั๊กแปลกๆ)
		
		if (!interaction.isButton()) return;

		const command = client.buttonCommands.get(interaction.customId);

		// หากการโต้ตอบไม่ใช่คำสั่งในนี้ ให้ส่งคืนข้อความแสดงข้อผิดพลาด

		if (!command) {
			await require("../messages/defaultButtonError").execute(interaction);
			return;
		}

		// พยายามดำเนินการโต้ตอบ ข้ามเออเร่อ

		try {
			await command.execute(interaction);
			return;
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: "มีข้อผิดพลาดบางอย่างใน Button Int!",
				ephemeral: true,
			});
			return;
		}
	},
};
