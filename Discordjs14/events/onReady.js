module.exports = {
	name: "ready",
	once: true,

	execute(client) {
		console.log(`ล็อคอินตัว : ${client.user.tag} แล้ว.`);
	},
};
