module.exports = {
	name: "interactionCreate",

	async execute(interaction) {
	
		const { client } = interaction;

		// ตรวจสอบว่าการโต้ตอบเป็นการโต้ตอบแบบเติมข้อความอัตโนมัติหรือไม่ (เพื่อป้องกันข้อผิดพลาดแปลกๆ)

		if (!interaction.isAutocomplete()) return;

		// ตรวจสอบว่าคำขอมีอยู่ใน code ของเราหรือไม่

		const request = client.autocompleteInteractions.get(
			interaction.commandName
		);

		// หากการโต้ตอบไม่ใช่จะ Return

		if (!request) return;

		// พยายามดำเนินการโต้ตอบ เพื่อข้ามเออเร่อได้

		try {
			await request.execute(interaction);
		} catch (err) {
			console.error(err);
		}

		return;
	},
};
