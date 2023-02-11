module.exports = {
	name: "interactionCreate",

	async execute(interaction) {
	
		const { client } = interaction;

	

		if (!interaction.isAnySelectMenu()) return;

		const command = client.selectCommands.get(interaction.customId);


		if (!command) {
			await require("../messages/defaultSelectError").execute(interaction);
			return;
		}


		try {
			await command.execute(interaction);
			return;
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: "มีบางอย่างผิดพลาดของ select menu option!",
				ephemeral: true,
			});
			return;
		}
	},
};
