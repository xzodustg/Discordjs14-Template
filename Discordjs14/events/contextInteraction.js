module.exports = {
	name: "interactionCreate",

	execute: async (interaction) => {
		
		const { client } = interaction;

		// ตรวจสอบว่าการโต้ตอบเป็นการโต้ตอบตามบริบทหรือไม่ (เพื่อป้องกันข้อผิดพลาดแปลก ๆ )

		if (!interaction.isContextMenuCommand()) return;

		/**********************************************************************/

		// ตรวจสอบว่าเป้าหมายการโต้ตอบคือผู้ใช้หรือไม่

		if (interaction.isUserContextMenuCommand()) {
			const command = client.contextCommands.get(
				"USER " + interaction.commandName
			);

			// พยายามดำเนินการโต้ตอบ

			try {
				await command.execute(interaction);
				return;
			} catch (err) {
				console.error(err);
				await interaction.reply({
					content: "มีปัญหาขณะดำเนินการคำสั่งบริบทนั้น!",
					ephemeral: true,
				});
				return;
			}
		}
		// ตรวจสอบว่าเป้าหมายการโต้ตอบคือผู้ใช้หรือไม่
		else if (interaction.isMessageContextMenuCommand()) {
			const command = client.contextCommands.get(
				"MESSAGE " + interaction.commandName
			);

			//พยายามดำเนินการโต้ตอบ

			try {
				await command.execute(interaction);
				return;
			} catch (err) {
				console.error(err);
				await interaction.reply({
					content: "มีปัญหาขณะดำเนินการคำสั่งบริบทนั้น!",
					ephemeral: true,
				});
				return;
			}
		}

		else {
			return console.log(
				"มีบางอย่างแปลก ๆ เกิดขึ้นในเมนูบริบท ได้รับเมนูบริบทประเภทที่ไม่รู้จัก"
			);
		}
	},
};
