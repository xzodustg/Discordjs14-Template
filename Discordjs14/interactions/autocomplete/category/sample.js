module.exports = {
	name: "sample",

	async execute(interaction) {
		// เตรียมคำขอ

		const focusedValue = interaction.options.getFocused();

		// แยกตัวเลือกออกจาก Array ตัวเลือกของคุณโดยอัตโนมัติ

		const choices = ["your", "choices"];

		// ตัวเลือกการกรองตามการป้อนข้อมูลของผู้ใช้

		const filtered = choices.filter((choice) =>
			choice.startsWith(focusedValue)
		);

		// ตอบสนอง
		await interaction.respond(
			filtered.map((choice) => ({ name: choice, value: choice }))
		);

		return;
	},
};
