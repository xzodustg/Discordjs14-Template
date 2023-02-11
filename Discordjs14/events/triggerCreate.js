module.exports = {
	name: "messageCreate",

	async execute(message) {
		
		const args = message.content.split(/ +/);

	

		if (message.author.bot) return;

		let triggered = false;

		message.client.triggers.every((trigger) => {
			if (triggered) return false;

			trigger.name.every(async (name) => {
				if (triggered) return false;


				if (message.content.includes(name)) {
					try {
						trigger.execute(message, args);
					} catch (error) {
						

						console.error(error);

						message.reply({
							content: "มีบางอย่างผิดพลาดกับ trigger!",
						});
					}

					triggered = true;
					return false;
				}
			});
		});
	},
};
