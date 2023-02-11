module.exports = {
	name: "interactionCreate",

	async execute(interaction) {
		
		const { client } = interaction;


		if (!interaction.isChatInputCommand()) return;

		const command = client.slashCommands.get(interaction.commandName);
	

		if (!command) return;

		

		try {
			await command.execute(interaction);
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: "มีบางอย่างผิดพลาดกับ SlashCommands!",
				ephemeral: true,
			});
		}
	},
};
